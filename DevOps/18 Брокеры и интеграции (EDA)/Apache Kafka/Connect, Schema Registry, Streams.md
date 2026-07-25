# Kafka Connect, Schema Registry, Kafka Streams

## 📖 История из жизни (Боль и Решение)

**Боль:** В компании была монолитная база данных PostgreSQL, из которой аналитики (в Data Warehouse) и поисковый движок (Elasticsearch) хотели постоянно забирать свежие данные. Мы написали самописные cron-скрипты, которые каждые 5 минут делали тяжелые запросы вида `SELECT * FROM users WHERE updated_at > X`. Скрипты сильно грузили базу, часто падали, а когда разработчики меняли схему БД (переименовывали колонку или меняли тип данных), скрипты ломались, и Elasticsearch заполнялся мусором.

**Решение:** Мы построили надежный потоковый пайплайн вокруг экосистемы Kafka:
1. **Kafka Connect (Source):** Использовали плагин Debezium, который подключился к Write-Ahead Log (WAL) PostgreSQL. Теперь каждое изменение в БД (CDC - Change Data Capture) моментально стримится в Kafka без нагрузки на саму базу.
2. **Schema Registry:** Все события Debezium сериализуются в бинарный формат Avro. Schema Registry хранит схемы данных и гарантирует, что новые изменения (например, удаление обязательного поля) обратно совместимы. Поломки пресекаются на уровне продюсера.
3. **Kafka Streams:** Легковесное Java-приложение читает сырые события CDC из Kafka, очищает их от персональных данных (маскирует пароли/email для GDPR), обогащает и пишет результат в новый топик.
4. **Kafka Connect (Sink):** Автоматически берет очищенные данные из нового топика и складывает в Elasticsearch. Никакого самописного кода для интеграции.

## 📊 Архитектурная схема (Mermaid)

```mermaid
graph LR
    DB[(PostgreSQL)] -->|CDC (WAL)| KC_SRC[Kafka Connect<br>Source: Debezium]
    KC_SRC -->|Avro Events| T_RAW[Topic: 'db-raw-events']
    
    SR((Schema<br>Registry)) -.->|Validate & Fetch Schema| KC_SRC
    SR -.->|Fetch Schema| K_STR
    
    T_RAW --> K_STR[Kafka Streams App<br>Data Masking & Enrichment]
    K_STR -->|JSON/Avro| T_CLEAN[Topic: 'db-clean-events']
    
    T_CLEAN --> KC_SINK[Kafka Connect<br>Sink: Elasticsearch]
    KC_SINK --> ES[(Elasticsearch)]
```

## 💻 Примеры

### Настройка Kafka Connect (REST API / JSON)
Создание Source коннектора Debezium для PostgreSQL через стандартный REST API Kafka Connect.
```bash
curl -X POST http://kafka-connect:8083/connectors \
  -H "Content-Type: application/json" \
  -d '{
    "name": "inventory-postgres-connector",
    "config": {
      "connector.class": "io.debezium.connector.postgresql.PostgresConnector",
      "database.hostname": "postgres-host",
      "database.port": "5432",
      "database.user": "postgres",
      "database.password": "postgres",
      "database.dbname" : "inventory",
      "database.server.name": "dbserver1",
      "table.include.list": "public.customers",
      "plugin.name": "pgoutput"
    }
}'
```

### Защита контрактов с помощью Schema Registry (Avro)
Пример Avro-схемы для события. Schema Registry гарантирует, что если Consumer ожидает эту схему, Producer не сможет послать несовместимые данные (например, отправить строку вместо числа в поле `id`).
```json
{
  "type": "record",
  "name": "Customer",
  "namespace": "com.company.events",
  "fields": [
    { "name": "id", "type": "int" },
    { "name": "first_name", "type": "string" },
    { "name": "email", "type": "string" },
    { "name": "age", "type": ["null", "int"], "default": null } 
  ]
}
```

### Обработка в реальном времени с Kafka Streams (Java)
Пример простой топологии: потоковое чтение из топика, фильтрация и запись в другой топик.
```java
StreamsBuilder builder = new StreamsBuilder();
KStream<String, String> source = builder.stream("raw-logs-topic");

// Оставляем только ошибки и переводим в верхний регистр
source.filter((key, value) -> value.contains("ERROR"))
      .mapValues(value -> value.toUpperCase())
      .to("error-alerts-topic");

KafkaStreams streams = new KafkaStreams(builder.build(), props);
streams.start();
```

## 🛠 Day 2 Operations (Советы по эксплуатации)

1. **Управление коннекторами (GitOps):** Не создавайте коннекторы руками через `curl` в production. Используйте инструменты для декларативного управления (например, утилиту `kcctl`, Terraform-провайдеры или Kafka Connect Kubernetes Operator), храня конфигурации коннекторов в Git.
2. **Мониторинг задач (Tasks) в Kafka Connect:** Следите не только за статусом самого коннектора, но и за статусом его Task-ов. Коннектор может быть в статусе `RUNNING`, но его задачи могут упасть (`FAILED`) из-за ошибки в данных, и передача данных остановится.
3. **Бэкап топика Schema Registry:** Потеря внутреннего топика `_schemas`, в котором Schema Registry хранит историю схем, приведет к катастрофе. Вы потеряете маппинг ID схем на их структуру и не сможете десериализовать старые сообщения в других топиках. Всегда резервируйте этот топик.
4. **State Stores в Kafka Streams:** Убедитесь, что для Kafka Streams-приложений правильно настроены диски (желательно SSD) и RocksDB. Такие операции как агрегации и join'ы сохраняют локальный стейт (State Store) на диск инстанса, который может занимать много места.

## 🚫 Антипаттерны

- **Написание кастомных консьюмеров для простой перекладки данных:** Использование самописного приложения для чтения из Kafka и тупой записи в S3, Redis или PostgreSQL вместо использования готового Kafka Connect Sink. Готовые коннекторы из коробки решают сложнейшие проблемы отказоустойчивости, коммита оффсетов, распределения задач (Tasks) и дед-леттер очередей.
- **Игнорирование правил совместимости в Schema Registry:** Отключение проверок или использование режима `Compatibility: NONE`. Это убивает всю ценность Schema Registry, так как позволяет разработчикам публиковать любые ломающие изменения в схемах, что рано или поздно "взорвет" всех консьюмеров. Стандарт — `FORWARD` или `BACKWARD` совместимость.
- **Использование Kafka Connect для сложной бизнес-логики:** Kafka Connect имеет механизм Single Message Transforms (SMTs), но он предназначен только для простейших операций (переименование полей, роутинг, добавление timestamp). Если вам нужна сложная логика, join'ы нескольких потоков, агрегации или вызовы внешних API — вынесите это в отдельное приложение на базе Kafka Streams или ksqlDB.
