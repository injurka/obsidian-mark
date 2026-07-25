# CoreDNS

## 📖 История одной боли (Pain & Solution)

**Боль:** В начале времён микросервисы в кластере Kubernetes обращались друг к другу по IP-адресам. Поды умирали, пересоздавались, IP-адреса менялись, и сервисы теряли друг друга. Инженеры пытались хардкодить IP, использовать внешние DNS или писать свои костыли для service discovery.
**Решение:** CoreDNS — легковесный, быстрый и гибкий DNS-сервер, который стал стандартом де-факто для service discovery в Kubernetes. Он автоматически отслеживает создание и удаление сервисов (и подов) и обновляет DNS-записи, позволяя обращаться к компонентам по предсказуемым именам (например, `my-service.my-namespace.svc.cluster.local`).

## 🗺️ Архитектура и Принцип работы

```mermaid
flowchart TD
    Pod[Pod (Client)] -->|DNS Request\n'api.default.svc.cluster.local'| CoreDNS[CoreDNS Pods\n(kube-system)]
    CoreDNS -->|Watch API| KubeAPI[kube-apiserver]
    KubeAPI -.->|Updates on Services/Endpoints| CoreDNS
    CoreDNS -->|Forward External| ExtDNS[External DNS\n(8.8.8.8, etc)]
    CoreDNS -->|Response: 10.96.x.x| Pod
```

## 🛠️ Примеры (YAML / Bash)

**Проверка DNS-разрешения внутри пода:**
```bash
# Запускаем временный под с утилитами для сети
kubectl run -it --rm --restart=Never dns-test --image=infoblox/dnstools
# Внутри пода:
> nslookup my-service.default.svc.cluster.local
> dig +short my-service.default.svc.cluster.local
```

**Кастомизация Corefile (ConfigMap):**
Допустим, вам нужно настроить перенаправление запросов для домена `company.internal` на корпоративный DNS-сервер.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: coredns
  namespace: kube-system
data:
  Corefile: |
    .:53 {
        errors
        health {
           lameduck 5s
        }
        ready
        kubernetes cluster.local in-addr.arpa ip6.arpa {
           pods insecure
           fallthrough in-addr.arpa ip6.arpa
           ttl 30
        }
        prometheus :9153
        forward . /etc/resolv.conf {
           max_concurrent 1000
        }
        cache 30
        loop
        reload
        loadbalance
    }
    company.internal:53 {
        errors
        cache 30
        forward . 10.100.0.10 10.100.0.11
    }
```

## 🌅 Day 2 Operations (Советы)

*   **Мониторинг:** Обязательно собирайте метрики с Prometheus endpoint (`:9153`). Следите за `coredns_dns_request_duration_seconds` и `coredns_dns_responses_total` (особенно за ошибками NXDOMAIN и SERVFAIL).
*   **Масштабирование:** CoreDNS должен масштабироваться вместе с кластером. Используйте `cluster-proportional-autoscaler`, чтобы количество реплик CoreDNS зависело от количества узлов/ядер в кластере.
*   **NodeLocal DNSCache:** Для больших кластеров разверните NodeLocal DNS. Это DaemonSet, который кэширует DNS-запросы локально на каждой ноде, снижая нагрузку на CoreDNS и уменьшая задержки (conntrack race conditions).

## ⚠️ Антипаттерны

*   **Низкий ndots (или слишком высокий):** В `resolv.conf` пода параметр `ndots:5` (по умолчанию) означает, что при поиске `google.com` сначала будут перебраны все внутренние суффиксы кластера (`google.com.default.svc.cluster.local`, и т.д.). Это создает огромный поток мусорных DNS-запросов. Если сервису нужно много ходить наружу, настройте `dnsConfig` в спецификации пода и уменьшите `ndots`.
*   **Прямое редактирование CoreDNS Deployment:** Всегда вносите изменения через кастомизацию манифестов (Helm/Kustomize) или правку `ConfigMap`. Прямые изменения в Deployment будут затерты при обновлении кластера.
*   **Игнорирование кэширования:** Отключение плагина `cache` в Corefile ради "мгновенного обновления" приведет к тому, что API Kubernetes и сам CoreDNS упадут под нагрузкой.
