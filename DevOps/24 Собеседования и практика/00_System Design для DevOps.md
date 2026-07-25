# System Design для DevOps

## 📖 DevOps-история: Боль и Решение
**Боль:** Наступила "Черная пятница". Маркетинг запустил рассылку, и трафик вырос в 10 раз. Монолитное приложение начало отвечать с задержкой в 30 секунд. База данных легла под натиском SELECT-запросов (CPU 100%), а единственный Load Balancer перестал справляться с соединениями. Итог: даунтайм 4 часа, потерянная выручка.
**Решение:** Проведен редизайн архитектуры. Статика вынесена на CDN. Чтения базы вынесены на Read-реплики. Для сессий и горячих данных внедрен Redis (кэширование). Приложение разбито на микросервисы в Kubernetes с настроенным Horizontal Pod Autoscaler (HPA). Внедрен WAF для защиты от DDoS.

## 🗺️ Архитектура (Mermaid)
```mermaid
flowchart TD
    User((Пользователь)) -->|DNS| CDN[CDN / WAF (Cloudflare)]
    CDN -->|Статика| S3[(S3 Bucket)]
    CDN -->|Динамика| ALB[Application Load Balancer]
    
    ALB --> K8s[Kubernetes Cluster]
    
    subgraph K8s [Kubernetes Cluster]
        Ingress[Ingress Controller]
        API[API Gateway / BFF]
        App1[App Service A]
        App2[App Service B]
        
        Ingress --> API
        API --> App1
        API --> App2
    end
    
    App1 --> Redis[(Redis Cache)]
    App1 --> DB_M[(PostgreSQL Primary\nWrites)]
    App2 --> DB_R[(PostgreSQL Replica\nReads)]
    
    DB_M -.->|Async Replication| DB_R
```

## 💻 Примеры

### Автомасштабирование (HPA в Kubernetes)
```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: api-service-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: api-service
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

### Кэширование на уровне Nginx
```nginx
# В /etc/nginx/nginx.conf
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=my_cache:10m max_size=1g inactive=60m use_temp_path=off;

server {
    location /api/catalog/ {
        proxy_pass http://backend;
        proxy_cache my_cache;
        proxy_cache_valid 200 302 10m; # Кэшируем успешные ответы на 10 минут
        proxy_cache_valid 404 1m;
        add_header X-Proxy-Cache $upstream_cache_status;
    }
}
```

## 🛠️ Day 2 Operations (Советы по эксплуатации)
- **Capacity Planning & Load Testing:** Регулярно проводите нагрузочное тестирование (например, с помощью k6 или JMeter), чтобы знать пределы вашей системы *до* реальных пиков.
- **Graceful Degradation:** Проектируйте систему так, чтобы при отказе некритичных компонентов (например, сервис рекомендаций) основной флоу (покупка) продолжал работать.
- **SLI / SLO / SLA:** Внедрите метрики для измерения успешности работы системы с точки зрения бизнеса (например, процент успешных транзакций за 1 секунду).

## 🚫 Антипаттерны
- **SPOF (Single Point of Failure):** Архитектура, зависящая от одной нерезервированной ВМ или одного экземпляра БД.
- **Отсутствие Rate Limiting:** Позволять одному IP-адресу или клиенту утилизировать все ресурсы бэкенда.
- **"Слепой" автомасштабинг:** Настройка HPA без квот (Requests/Limits), из-за чего поды вытесняют друг друга (OOMKilled) или кластер бесконечно масштабируется, сжигая бюджет.
- **Синхронные коммуникации везде:** Ожидание ответа от 5 разных сервисов по HTTP в цепочке. (Решение: использовать асинхронные очереди, такие как Kafka или RabbitMQ).
