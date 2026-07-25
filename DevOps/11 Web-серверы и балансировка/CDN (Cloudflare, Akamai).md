# CDN (Content Delivery Network): Cloudflare, Akamai

## 📖 DevOps-история (Боль и решение)
**Боль:** Сервер находится во Франкфурте. Пользователи из Австралии и Бразилии жалуются на медленную загрузку сайта (TTFB > 1-2 секунды). Вдобавок, при маркетинговой рассылке трафик вырастает в 10 раз, и сервер падает под нагрузкой из-за отдачи тяжелых картинок.
**Решение:** Внедрение CDN (Cloudflare/Akamai). Статика кэшируется на граничных серверах (edge) по всему миру. Запросы из Сиднея обслуживаются нодой в Сиднее за 20 мс, а на origin-сервер летит только 5% от изначального трафика.

## 📊 Архитектура

```mermaid
flowchart LR
    User1[Пользователь (Австралия)] -->|Запрос статики| CDN_AU[CDN Edge (Сидней)]
    User2[Пользователь (Европа)] -->|Запрос статики| CDN_EU[CDN Edge (Франкфурт)]
    
    CDN_AU -->|Cache Miss / Динамика| Origin[Origin Server]
    CDN_EU -->|Cache Miss / Динамика| Origin
    
    subgraph CDN [CDN Network]
        CDN_AU
        CDN_EU
    end
    
    style Origin fill:#f96,stroke:#333,stroke-width:2px
```

## 💻 Примеры

### Cloudflare Terraform Example (Настройка кэширования)
```hcl
resource "cloudflare_page_rule" "cache_static" {
  zone_id = var.cloudflare_zone_id
  target  = "*.example.com/assets/*"
  status  = "active"

  actions {
    cache_level = "cache_everything"
    edge_cache_ttl {
      ttl = 86400 # Кэшировать на день на edge
    }
  }
}
```

### Настройка заголовков на Origin (Nginx)
```nginx
location /static/ {
    # Сообщаем CDN, что файл можно кэшировать
    add_header Cache-Control "public, max-age=31536000, immutable";
}
```

## 🛠 Day 2 Operations (Советы)
* **Purge API:** Настройте автоматическую инвалидацию кэша (cache purge) в CI/CD пайплайне при деплое новых версий статики (если не используете версионирование в URL).
* **Cache Hit Ratio:** Мониторьте метрику Cache Hit Ratio. Если она падает ниже 80% для статики, проверьте заголовки Cache-Control на origin и настройки CDN.
* **Geo-routing:** Используйте Workers/Edge Functions для базовой логики на периферии (например, редиректы по гео-локации), чтобы разгрузить origin.
* **TLS:** Настройте Strict SSL между CDN и Origin (Full Strict в Cloudflare) для безопасности транзитного трафика.

## ⚠️ Антипаттерны
* **Кэширование динамики по ошибке:** Случайная настройка `Cache Everything` на весь сайт приведет к тому, что один пользователь увидит сессию/корзину другого.
* **Отсутствие версионирования ассетов:** Использование одного и того же имени файла (`app.js`) при обновлениях приводит к тому, что клиенты получают старую версию из-за агрессивного кэширования. Правильно: `app.v1.2.3.js`.
* **Излишний Purge:** Полная очистка кэша (Purge All) на каждый коммит создает "cache stampede" - шторм запросов на origin сервер после сброса кэша.
