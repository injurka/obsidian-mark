# DaemonSet

## 📖 История из окопов (Боль и Решение)

**Боль:** 
Ваш кластер вырос до 50 узлов. Появилась задача: на каждый узел нужно установить агента сбора логов (например, Fluentbit или Promtail) и сетевой плагин (CNI). Если использовать обычный `Deployment`, планировщик Kubernetes (kube-scheduler) может запустить три реплики агента на одном узле, а остальные оставить без мониторинга. Как гарантировать, что критически важный служебный под будет запущен **строго в единственном экземпляре на каждой ноде**?

**Решение:** 
Использовать **DaemonSet**. Эта абстракция обходит стандартные механизмы балансировки и гарантирует, что копия вашего пода будет запущена на всех (или на определённых по селекторам) узлах кластера. Когда в кластер добавляется новая нода, DaemonSet автоматически разворачивает на ней под. Когда нода удаляется — под корректно уничтожается (garbage collected).

---

## 🏗 Архитектура и логика работы

```mermaid
graph TD
    API[Kubernetes API Server] --> DS[DaemonSet Controller]
    DS --> Node1[Node 1]
    DS --> Node2[Node 2]
    DS --> Node3[Node 3 (Новая)]
    
    subgraph Node 1
        P1[Pod: Log Agent]
    end
    
    subgraph Node 2
        P2[Pod: Log Agent]
    end
    
    subgraph Node 3
        P3[Pod: Log Agent<br/>*Автоматически создан*]
    end
    
    style DS fill:#326ce5,stroke:#fff,stroke-width:2px,color:#fff
    style P3 stroke:#27ae60,stroke-width:2px,stroke-dasharray: 5 5
```

---

## 💻 Примеры

### Манифест DaemonSet (Promtail для логов)
```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: promtail
  namespace: monitoring
  labels:
    app: promtail
spec:
  selector:
    matchLabels:
      app: promtail
  template:
    metadata:
      labels:
        app: promtail
    spec:
      # Важно: часто требуется доступ к файловой системе хоста (HostPath)
      # или network namespace хоста (hostNetwork: true)
      tolerations:
      # Позволяет запускать под даже на мастер-нодах (control-plane)
      - key: node-role.kubernetes.io/control-plane
        operator: Exists
        effect: NoSchedule
      containers:
      - name: promtail
        image: grafana/promtail:2.8.3
        volumeMounts:
        - name: varlog
          mountPath: /var/log
        - name: varlibdockercontainers
          mountPath: /var/lib/docker/containers
          readOnly: true
      volumes:
      - name: varlog
        hostPath:
          path: /var/log
      - name: varlibdockercontainers
        hostPath:
          path: /var/lib/docker/containers
```

### Полезные команды (Bash)
```bash
# Посмотреть все DaemonSet в кластере
kubectl get ds -A

# Узнать, почему DaemonSet не раскатился на 100% узлов
# Ищем "Nodes without pods" и "Pods missed"
kubectl describe ds/promtail -n monitoring

# Принудительно перезапустить все поды DaemonSet (rollout)
kubectl rollout restart daemonset/promtail -n monitoring
```

---

## 🛠 Day 2 Operations (Советы по эксплуатации)

1. **Используйте Node Affinity / Node Selectors:**
   Не всегда агента нужно ставить абсолютно на все узлы. Например, если у вас есть пулы узлов с GPU для ML-задач, используйте `nodeSelector` или `nodeAffinity` в спецификации DaemonSet, чтобы развернуть GPU-мониторинг только там.
2. **Настройка Tolerations:**
   По умолчанию DaemonSet не запускает поды на узлах с `Taints` (например, на Control Plane). Если агент логов или сети должен быть везде, не забудьте прописать соответствующие `tolerations`.
3. **Обновления с осторожностью:**
   По умолчанию используется стратегия обновления `RollingUpdate`. Контролируйте параметр `maxUnavailable` (например, `1` или `10%`), чтобы при обновлении сетевого плагина или CSI драйвера не поломать половину кластера разом.

---

## 🛑 Антипаттерны (Как делать не надо)

* ❌ **Запуск бизнес-логики в DaemonSet:** DaemonSet предназначен для инфраструктурных задач (сеть, хранилище, логи, безопасность). Для бэкенда API, кэшей и баз данных используйте Deployment или StatefulSet.
* ❌ **Игнорирование Resource Limits:** Если DaemonSet (например, тяжелый агент безопасности) не имеет лимитов (`resources.limits`), он может "съесть" CPU/RAM на ноде, что приведет к OOMKills системных компонентов (kubelet) и падению самой ноды (Node NotReady).
* ❌ **Слепое использование `hostNetwork: true`:** Использование сети хоста без реальной надобности повышает риски безопасности и может привести к конфликтам портов на узле. Используйте только для сетевых плагинов (CNI) или специфичных ингресс-контроллеров.
