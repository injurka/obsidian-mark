# Серверный движок (Nitro)

Nuxt работает на базе Nitro - мощного кроссплатформенного серверного движка. Nitro предоставляет API для создания серверных маршрутов, промежуточного ПО (middleware) и плагинов.

## API Маршруты

Любой файл в папке `server/api/` автоматически становится API-эндпоинтом.
Например, файл `server/api/hello.ts` будет доступен по адресу `/api/hello`.

Пример `server/api/hello.ts`:
```ts
export default defineEventHandler((event) => {
  return {
    message: 'Привет от Nitro API!'
  }
})
```

Вызов этого API на клиенте:
```vue
<script setup>
const { data } = await useFetch('/api/hello')
</script>
```

## Обработка параметров и тела запроса

Чтение query-параметров (`/api/users?id=123`):
```ts
export default defineEventHandler((event) => {
  const query = getQuery(event)
  return `ID пользователя: ${query.id}`
})
```

Чтение тела POST-запроса:
```ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  return { received: body }
})
```

## Серверное Middleware

Файлы в `server/middleware/` выполняются на каждом запросе к серверу, прежде чем сработает API или рендеринг страницы. Полезно для логирования или проверки заголовков.

Пример `server/middleware/log.ts`:
```ts
export default defineEventHandler((event) => {
  console.log(`[Сервер] Запрос на: ${event.node.req.url}`)
})
```

## Хранилище (Storage)

Nitro предоставляет встроенное Key-Value хранилище (unstorage), доступное на сервере:
```ts
await useStorage().setItem('cache:key', data)
const cached = await useStorage().getItem('cache:key')
```
