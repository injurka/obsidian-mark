# Kubernetes Ingress

## История (Боль и Решение)
**Боль:** Когда у вас микросервисная архитектура и десятки веб-приложений, использование `Service` типа `LoadBalancer` для каждого сервиса быстро становится дорогим удовольствием (в облаке каждый балансировщик стоит денег) и сложным в управлении. А `NodePort` не позволяет нормально настроить SSL и маршрутизацию по путям (paths).
**Решение:** **Ingress** и **Ingress Controller**. Ingress работает на 7-м уровне модели OSI (HTTP/HTTPS). Он предоставляет единую точку входа в кластер, выступая как умный обратный прокси, который маршрутизирует трафик на разные сервисы в зависимости от доменного имени или пути URL.

## Архитектура

```mermaid
flowchart TD
    User([Пользователь]) -->|HTTPS| CloudLB[Cloud Load Balancer]
    CloudLB --> IC[Ingress Controller\n(e.g., NGINX)]
    
    subgraph Kubernetes Cluster
        IC -- "Host: api.example.com" --> SvcAPI(Service: API)
        IC -- "Host: shop.example.com\nPath: /cart" --> SvcCart(Service: Cart)
        
        SvcAPI --> PodAPI[API Pods]
        SvcCart --> PodCart[Cart Pods]
    end
```

## Компоненты
1. **Ingress (Ресурс):** Набор правил маршрутизации (YAML).
2. **Ingress Controller:** Само приложение (например, ingress-nginx, Traefik, HAProxy), которое читает правила и применяет их в своей конфигурации. Без контроллера ресурс Ingress ничего не делает.

## Примеры (YAML / Bash)

### Ingress Rule
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: main-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
spec:
  ingressClassName: nginx
  tls:
  - hosts:
    - api.example.com
    secretName: api-tls-cert
  rules:
  - host: api.example.com
    http:
      paths:
      - path: /v1
        pathType: Prefix
        backend:
          service:
            name: api-v1-service
            port:
              number: 80
```

### Применение
```bash
# Установка ingress-nginx контроллера (если нет)
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm install my-nginx ingress-nginx/ingress-nginx

# Применение правила
kubectl apply -f ingress.yaml
kubectl get ingress
```

## Day 2 Operations
- **Управление SSL/TLS:** Используйте `cert-manager` для автоматической выписки и обновления сертификатов Let's Encrypt через аннотации в Ingress ресурсе.
- **Rate Limiting & WAF:** Ingress Controllers (особенно NGINX) поддерживают аннотации для ограничения количества запросов (rate limiting) и интеграцию с WAF (например, ModSecurity) для защиты от атак.
- **Gateway API:** Обратите внимание на [Gateway API](https://gateway-api.sigs.k8s.io/) — это эволюция Ingress. Он предоставляет более ролевую (DevOps vs Developer) и гибкую модель работы с сетью. Рассмотрите переход на него для новых кластеров.

## Антипаттерны 🚫
- **Перегрузка Ingress аннотациями:** Если ваш Ingress ресурс состоит из 50 строк аннотаций со сложной логикой NGINX Lua скриптов, вы делаете что-то не так. Логика приложения должна быть в приложении или в API Gateway/Service Mesh.
- **Отсутствие IngressClass:** С Kubernetes 1.18+ важно указывать `ingressClassName`, особенно если в кластере работает несколько разных контроллеров (например, внутренний и внешний Ingress).
- **Игнорирование тайм-аутов:** По умолчанию контроллеры могут иметь большие тайм-ауты (например, 60 секунд). Для некоторых API это слишком долго и приводит к зависшим соединениям. Настраивайте `proxy-read-timeout` под ваши нужды.
