# ConfigMap и Secrets

## 📖 История одной боли (Pain & Solution)

**Боль:** В эпоху монолитов конфигурационные файлы (пароли к БД, URL API, ключи) лежали прямо в коде или запекались в Docker-образы. При смене пароля или URL базы данных приходилось пересобирать весь образ и заново деплоить приложение. Хуже того, секреты регулярно утекали в публичные репозитории.
**Решение:** Kubernetes предлагает два нативных ресурса: `ConfigMap` (для несекретных данных) и `Secret` (для конфиденциальных). Они отвязывают конфигурацию от контейнера. Приложение получает настройки либо в виде переменных окружения (Env Vars), либо как файлы, смонтированные в файловую систему (Volumes), без необходимости пересборки образа.

## 🗺️ Архитектура и Принцип работы

```mermaid
flowchart LR
    subgraph K8s Cluster
        CM[ConfigMap\n'app-config']
        Sec[Secret\n'db-creds']
        Pod[Pod\n'MyApp']
    end
    
    CM -.->|1. Mount as Volume\n(/etc/config/)| Pod
    CM -.->|2. Map to Env Vars| Pod
    Sec -.->|1. Mount as Volume\n(/etc/secrets/)| Pod
    Sec -.->|2. Map to Env Vars| Pod
    
    API[kube-apiserver] --> CM
    API --> Sec
    API -.->|Watch for updates| kubelet[Kubelet]
    kubelet -.->|Live reload\n(only for volumes)| Pod
```

## 🛠️ Примеры (YAML / Bash)

**Создание ConfigMap и Secret из командной строки:**
```bash
# ConfigMap из литералов
kubectl create configmap app-config --from-literal=LOG_LEVEL=debug --from-literal=APP_COLOR=blue

# Secret из файла (базовое шифрование base64 под капотом)
kubectl create secret generic db-credentials --from-literal=username=admin --from-literal=password=supersecret
```

**Подключение в Pod:**
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-app
spec:
  containers:
  - name: my-app-container
    image: my-app-image:1.0
    # Подключение как переменные окружения
    env:
      - name: LOG_LEVEL
        valueFrom:
          configMapKeyRef:
            name: app-config
            key: LOG_LEVEL
      - name: DB_PASSWORD
        valueFrom:
          secretKeyRef:
            name: db-credentials
            key: password
    # Подключение как файлы (Volume)
    volumeMounts:
      - name: config-volume
        mountPath: /etc/config
        readOnly: true
  volumes:
    - name: config-volume
      configMap:
        name: app-config
```

## 🌅 Day 2 Operations (Советы)

*   **Управление секретами (GitOps):** Нативные `Secrets` хранятся в etcd в виде простого base64 (это не шифрование!). Для Day 2 используйте решения вроде **External Secrets Operator** (интеграция с AWS Secrets Manager, HashiCorp Vault) или **Sealed Secrets** (шифрование секретов для безопасного хранения в Git).
*   **Автоматический рестарт подов (Reloader):** Если ConfigMap смонтирован как Volume, kubelet автоматически обновит файл в поде при изменении ConfigMap. Однако, само приложение может не уметь перечитывать файлы "на лету" (hot reload). Используйте контроллеры вроде [Reloader от Stakater](https://github.com/stakater/Reloader), которые автоматически перезапускают Deployment при изменении привязанных ConfigMap/Secret.
*   **Шифрование в состоянии покоя (Encryption at REST):** Включите шифрование данных etcd на уровне API-сервера (`--encryption-provider-config`), чтобы даже при краже дисков etcd злоумышленники не получили ваши пароли.

## ⚠️ Антипаттерны

*   **Хранение больших файлов:** ConfigMap и Secret ограничены размером в 1 MB. Не пытайтесь хранить в них огромные дампы баз данных или бинарники.
*   **Чрезмерное использование Env Vars:** Переменные окружения читаются только при старте пода. Изменение ConfigMap не обновит env-переменные в уже работающем поде (нужен рестарт). Для динамичных конфигов используйте монтирование через Volumes.
*   **"Утечка" секретов в логи:** Передача секретов через переменные окружения опасна тем, что многие фреймворки при падении (crash) сбрасывают весь environment (stack trace) в логи, раскрывая пароли.
*   **Один гигантский ConfigMap на всё:** Разбивайте конфигурацию на логические части. Изменение одной переменной в гигантском ConfigMap вызовет обновление конфигов у множества не связанных друг с другом подов, повышая риск глобального сбоя.
