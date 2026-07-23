# Service Worker: кэширование и offline-стратегии

Service Worker выступает в роли прокси-сервера между клиентским приложением и сетью.

## Стратегии кэширования
1. **Cache First (Stale-While-Revalidate):** Сначала из кэша, затем обновление из сети в фоновом режиме.
2. **Network First:** Сначала запрос в сеть, при ошибке — кэш.
3. **Cache Only:** Только из кэша (для статических ресурсов).
4. **Network Only:** Только из сети.

## Связанные темы
- [[Service Workers (Конкурентность и фоновые задачи)|Service Workers]]
- [[02. Браузерная платформа/05. Хранение и offline/Cache Storage API|Cache Storage API]]
