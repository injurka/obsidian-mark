# Отладка в Chrome/Firefox DevTools

Инструменты разработчика для анализа, профилирования и отладки веб-приложений.

## Основные вкладки
- **Elements / Inspector:** Инспекция DOM и CSS.
- **Console:** Выполнение JS и логирование.
- **Sources / Debugger:** Точки останова (Breakpoints), Call Stack, Scope.
- **Network:** Сетевые запросы, тайминги, заголовки.
- **Performance:** Профилирование FPS, CPU и рендеринга.
- **Memory:** Снимки кучи (Heap Snapshots), поиск утечек памяти.

---

## Алгоритм поиска проблемы (Troubleshooting)

```mermaid
graph TD
    A["Где-то баг!"] --> B{"В чем проблема?"}
    
    B -- Ошибка в JS --> C["Вкладка Console"]
    C --> D["Посмотреть Stack Trace"]
    D --> E["Вкладка Sources (поставить Breakpoint)"]
    
    B -- Верстка поехала --> F["Вкладка Elements"]
    F --> G["Проверить CSS (Computed, Styles)"]
    
    B -- Данные не пришли --> H["Вкладка Network"]
    H --> I["Найти запрос (Fetch/XHR)"]
    I --> J["Проверить Payload и Response"]
    
    B -- Сайт тормозит --> K["Вкладка Performance"]
    K --> L["Сделать запись (Record)"]
    L --> M["Найти долгие таски (Long Tasks)"]
```
