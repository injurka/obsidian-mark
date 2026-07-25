# Стратегия деплоя: Recreate (Пересоздание)

## 📖 История и Боль
**Боль:** Команда выкатывает мажорное обновление, где схема базы данных несовместима со старой версией приложения. Если использовать Rolling Update, старые и новые поды будут работать одновременно, что приведет к повреждению данных или падению приложения.
**Решение:** Стратегия `Recreate`. Мы полностью останавливаем старую версию приложения (создавая преднамеренный даунтайм), накатываем миграции БД, и только затем запускаем новую версию. Целостность данных гарантирована.

## 📊 Схема (Mermaid)
```mermaid
graph TD
    subgraph Phase 1: Running
        LB1[Load Balancer] --> AppV1_1[App v1]
        LB1 --> AppV1_2[App v1]
    end

    subgraph Phase 2: Downtime
        LB2[Load Balancer] -->|Traffic Dropped| Null((...))
        AppV1_1_X[App v1] -.->|Terminated| Null
        AppV1_2_X[App v1] -.->|Terminated| Null
    end

    subgraph Phase 3: New Version
        LB3[Load Balancer] --> AppV2_1[App v2]
        LB3 --> AppV2_2[App v2]
    end

    Phase 1 -->|Update Triggered| Phase 2
    Phase 2 -->|Pods Ready| Phase 3
```

## 💻 Пример (Kubernetes YAML)
Настроить Recreate в Kubernetes очень просто — достаточно указать тип стратегии в Deployment.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend-app
spec:
  replicas: 3
  strategy:
    type: Recreate # Убиваем старые поды до создания новых
  selector:
    matchLabels:
      app: backend
  template:
    metadata:
      labels:
        app: backend
    spec:
      containers:
      - name: app
        image: my-backend:v2.0.0
```

## 🛠 Day 2 Operations (Эксплуатация)
1. **Оповещения об окне даунтайма:** Настройте алерты, если время недоступности сервиса превышает запланированное окно (например, новые поды зависли в `CrashLoopBackOff`).
2. **Бэкапы:** Всегда автоматизируйте создание снапшота БД непосредственно перед началом фазы Recreate, чтобы можно было откатиться, если миграция сломает данные.
3. **Обработка трафика на LB:** Настройте Load Balancer или Ingress на отдачу кастомной страницы 503 (Maintenance Mode) на время обновления.

## 🚫 Антипаттерны
- **Использование для клиентских (B2C) веб-приложений:** Если у вас интернет-магазин, даунтайм = потерянные деньги. Recreate тут не подходит.
- **Отсутствие health-чеков:** Если новые поды стартуют, но падают из-за ошибок конфигурации, система останется в даунтайме. Readiness/Liveness пробы обязательны для быстрого обнаружения проблемы.
