# Маршрутизация (Routing)

Nuxt использует файловую маршрутизацию на основе `vue-router`. Создание файлов в директории `pages/` автоматически генерирует маршруты.

## Основы файловой маршрутизации

Любой Vue-файл внутри `pages/` становится маршрутом:
- `pages/index.vue` -> `/`
- `pages/about.vue` -> `/about`

Для работы страниц необходимо добавить компонент `<NuxtPage />` в корневой файл `app.vue`.

## Динамические маршруты

Динамические параметры указываются в квадратных скобках `[]` в названии файла или папки.
- `pages/users/[id].vue` -> `/users/123`

Доступ к параметру внутри компонента:
```vue
<script setup>
const route = useRoute()
console.log(route.params.id) // "123"
</script>
```

Для "catch-all" маршрутов (перехват всех путей) используется `[...slug].vue`.

## Навигация

Для перехода между страницами без перезагрузки браузера используется компонент `<NuxtLink>`:
```vue
<NuxtLink to="/about">О нас</NuxtLink>
```

Программная навигация:
```vue
<script setup>
const router = useRouter()
router.push('/dashboard')
</script>
```

## Route Middleware (Промежуточное ПО)

Middleware позволяет выполнять код перед переходом на маршрут (например, для проверки авторизации).
Располагаются в папке `middleware/`.

Пример `middleware/auth.ts`:
```ts
export default defineNuxtRouteMiddleware((to, from) => {
  const isAuthenticated = false // логика проверки
  if (!isAuthenticated) {
    return navigateTo('/login')
  }
})
```

Применение в компоненте страницы:
```vue
<script setup>
definePageMeta({
  middleware: 'auth'
})
</script>
```
