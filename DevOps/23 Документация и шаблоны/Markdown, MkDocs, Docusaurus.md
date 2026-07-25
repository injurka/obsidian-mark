# Markdown, MkDocs, Docusaurus

## DevOps-история
**Боль:** Разрозненная документация в Confluence или Google Docs, которая быстро устаревает, оторвана от исходного кода, а поиск по ней превращается в пытку.
**Решение:** Подход Docs-as-Code. Документация пишется в формате Markdown, хранится в том же Git-репозитории, что и код, и автоматически собирается в красивые сайты с помощью статических генераторов вроде MkDocs (обычно с темой Material) или Docusaurus через CI/CD.

## Архитектура Docs-as-Code
```mermaid
graph LR
    A[Разработчик пишет .md] --> B[Commit & Push в Git]
    B --> C[CI/CD Pipeline]
    C --> D[Сборка статики (MkDocs)]
    D --> E[Деплой (S3 / GitHub Pages / Nginx)]
    E --> F[Пользователь читает доку]
```

## Примеры

**Пример конфигурации `mkdocs.yml` (MkDocs Material)**
```yaml
site_name: Наша DevOps База Знаний
theme:
  name: material
  features:
    - navigation.tabs
    - search.suggest
nav:
  - Главная: index.md
  - Инфраструктура: infrastructure.md
  - CI/CD: pipelines.md
plugins:
  - search
```

**Локальный запуск (MkDocs)**
```bash
# Установка
pip install mkdocs-material
# Инициализация
mkdocs new my-project
cd my-project
# Запуск dev-сервера с горячей перезагрузкой
mkdocs serve
```

## Day 2 operations
* **Линтеры:** Внедрите `markdownlint` в pre-commit хуки и CI для поддержания единого стиля оформления.
* **Проверка ссылок:** Настройте регулярный запуск утилит вроде `linkchecker` или плагина `mkdocs-htmlproofer-plugin` для поиска битых ссылок (404).
* **Автогенерация:** Используйте плагины для встраивания OpenAPI/Swagger, генерации документации из docstrings Python или диаграмм прямо из кода.
* **Поиск:** Для больших баз знаний интегрируйте Algolia DocSearch.

## Антипаттерны
* **Дублирование кода:** Копирование кусков кода в документацию вместо использования инклудов (plugins для включения фрагментов реального кода).
* **Раздельное хранение:** Хранение документации в репозитории, отдельном от кода сервиса (усложняет синхронизацию изменений).
* **Секреты в доке:** Случайное добавление реальных токенов, паролей или production-адресов в примеры. Используйте фиктивные данные (`<YOUR_TOKEN>`, `example.com`).
