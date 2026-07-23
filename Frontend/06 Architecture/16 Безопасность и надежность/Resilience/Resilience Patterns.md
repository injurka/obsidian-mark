# Resilience Patterns (Паттерны устойчивости)

## Суть и решаемая боль
Приложения часто разрабатываются в тепличных условиях локальной машины (localhost), где пинг равен нулю, а сеть никогда не рвется. В реальном мире мобильные сети обрываются, бэкенды тормозят под нагрузкой, а CDN отдают 502 ошибки. Боль заключается в том, что "наивный" код падает при первом же чихе сети.

**Resilience Patterns** — это набор архитектурных подходов, которые делают приложение "упругим". Вместо того чтобы хрупко ломаться, приложение пружинит: оно умеет ждать, повторять попытки, отдавать закэшированные данные и отключать неисправные куски логики, выживая в хаосе.

## Как это работает на практике

На фронтенде применяется несколько ключевых паттернов:

1. **Retry (Повторные попытки):** "Сеть моргнула? Попробую еще раз."
2. **Circuit Breaker (Предохранитель):** "Бэкенд мертв. Перестану спамить его запросами, покажу Fallback."
3. **Timeout:** "Бэкенд думает уже 10 секунд. Отменю запрос, чтобы не вешать UI."
4. **Fallback / Graceful Degradation:** "Нет данных? Покажу кэш или скрою этот блок."
5. **Bulkhead (Переборки):** "Изолирую ошибки в Error Boundaries, чтобы не потопить весь UI."

```mermaid
graph TD
    Request[HTTP Request] --> Timeout{Timeout 5s?}
    Timeout -->|Да| Cancel[Отмена запроса]
    Timeout -->|Нет| Response[Response]
    
    Response --> IsError{Is 5xx Error?}
    IsError -->|Нет| Success[Показать данные]
    
    IsError -->|Да| Retry{Retry count < 3?}
    Retry -->|Да| Wait[Wait (Exponential Backoff)] --> Request
    Retry -->|Нет| CircuitBreaker[Open Circuit Breaker]
    
    CircuitBreaker --> Fallback[Показать Fallback UI / Cache]
```

## Примеры кода

В современном фронтенде эти паттерны редко пишут руками. Они встроены в библиотеки для Data Fetching (например, React Query, SWR, Apollo).

**Антипаттерн (Наивный fetch):**
```javascript
// Ждет ответа вечно. Если 500 - сразу кидает ошибку.
const data = await fetch('/api/stats').then(r => r.json());
```

**Правильное решение (Использование инструмента с встроенным Resilience - React Query):**
```tsx
import { useQuery } from '@tanstack/react-query';

const StatsWidget = () => {
  const { data, isError } = useQuery({
    queryKey: ['stats'],
    queryFn: fetchStats,
    retry: 3, // Паттерн: Retry (3 попытки)
    retryDelay: attempt => Math.min(1000 * 2 ** attempt, 30000), // Паттерн: Exponential Backoff
    staleTime: 60000, // Паттерн: Cache as Fallback
  });

  // Паттерн: Fallback UI
  if (isError) return <div className="widget-error">Статистика временно недоступна</div>;
  if (!data) return <Spinner />;
  
  return <div>{data.total}</div>;
}
```

## Неочевидные нюансы и трейдоффы
- **Exponential Backoff & Jitter:** Если ваш бэкенд упал от высокой нагрузки, а 10 000 клиентов одновременно начнут делать жесткий Retry каждую секунду, они добьют бэкенд (DDoS). Ретраи должны быть с увеличивающейся задержкой (Exponential Backoff: 1с, 2с, 4с, 8с) и небольшим случайным разбросом (Jitter), чтобы запросы не приходили волнами.
- **Что можно ретраить?** Можно безопасно ретраить только **идемпотентные** запросы (`GET`, `PUT`, `DELETE`). Ретраить упавший `POST` (например, оплату или отправку сообщения) без ключа идемпотентности — прямой путь к задвоению транзакций.
- **Оверхед на тестирование:** Проверять устойчивость тяжело. Нужно использовать инструменты вроде MSW (Mock Service Worker), чтобы искусственно возвращать 500 ошибки и таймауты, наблюдая за поведением Fallback UI.
