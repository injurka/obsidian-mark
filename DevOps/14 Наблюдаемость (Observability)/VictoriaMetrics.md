# VictoriaMetrics

## 📖 DevOps-история
**Боль:** Prometheus отлично работает до тех пор, пока количество метрик не перевалит за определенный порог, или пока не потребуется хранить метрики месяцами (Long-term storage). Prometheus начинает потреблять огромные объемы RAM (особенно при высокой кардинальности), падать по OOM, а его кластеризация (Thanos/Cortex) сложна в настройке и поддержке.
**Решение:** VictoriaMetrics — написанная на Go Time Series Database (TSDB), совместимая с PromQL. Работает как drop-in замена Prometheus, но потребляет в разы меньше оперативной памяти и дискового пространства благодаря агрессивному сжатию. Одиночная нода (Single-node) вытягивает то, для чего раньше строили кластера.

## 🏗 Архитектура

```mermaid
flowchart LR
    subgraph Targets
        A[Node Exporter]
        B[App /metrics]
    end

    subgraph VictoriaMetrics (Single-node)
        VM[(VictoriaMetrics\nTSDB)]
    end

    subgraph Consumers
        G[Grafana]
        AL[Alertmanager]
    end

    A -->|Scrape| VM
    B -->|Scrape| VM
    VM -->|PromQL| G
    VM -->|Alerting Rules| AL
```
*(Для кластерной версии `vmagent` скрейпит данные и пушит их в `vminsert`, которые раскидывают их по `vmstorage`, а `vmselect` отвечает за чтение).*

## 💻 Примеры

### Запуск Single-node через Docker Compose (`docker-compose.yml`)
```yaml
version: '3'
services:
  victoriametrics:
    image: victoriametrics/victoria-metrics:v1.93.0
    ports:
      - "8428:8428"
    volumes:
      - vmdata:/victoria-metrics-data
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    command:
      - '-storageDataPath=/victoria-metrics-data'
      - '-retentionPeriod=12w' # Хранить 12 недель
      - '-promscrape.config=/etc/prometheus/prometheus.yml' # Поддержка конфига прометеуса
      - '-dedup.minScrapeInterval=1m' # Дедупликация

volumes:
  vmdata:
```

## 🛠 Day 2 Operations
- **Миграция с Prometheus:** Используйте утилиту `vmctl` для бесшовной миграции исторических данных из Prometheus (или InfluxDB) в VictoriaMetrics.
- **Дедупликация:** При High Availability скрейпинге (например, два vmagent скрейпят одни и те же таргеты) обязательно включайте флаг `-dedup.minScrapeInterval`. Это заставит VM оставлять только одну точку данных за интервал.
- **Кэширование:** Следите за метриками `vm_cache_entries` и `vm_cache_miss_total`. При нехватке RAM VM будет сбрасывать кэши, что замедлит выполнение PromQL запросов. Дайте процессу достаточно памяти.

## 🚫 Антипаттерны
- **Использование Cluster версии без необходимости:** Установка кластерной версии (vminsert, vmselect, vmstorage) при нагрузке менее 1 миллиона семплов в секунду. Single-node версия справляется с огромными нагрузками, проще в бэкапах и эксплуатации. Кластер нужен только для поистине гигантских масштабов или жестких требований к отказоустойчивости хранения (HA).
- **Высокая кардинальность (High Cardinality):** Использование уникальных ID пользователей или сессий в лейблах метрик (например, `request_latency{user_id="12345"}`). Хотя VM справляется с этим лучше Prometheus, это все равно убьет производительность базы. Для таких данных нужны логи или трейсы.
- **Отказ от `vmagent` на edge-нодах:** Скрейпинг тысяч таргетов напрямую ядром базы в нестабильных сетях. Лучше использовать `vmagent` локально (или в каждом ДЦ), чтобы он собирал метрики, буферизировал их на диске при проблемах со связью и пушил в центральную VM.
