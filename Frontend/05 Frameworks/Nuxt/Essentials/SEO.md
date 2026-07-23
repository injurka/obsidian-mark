# SEO и Метатеги

Nuxt предоставляет встроенные инструменты для управления метаданными `<head>`, что критически важно для SEO и социального шаринга (Open Graph, Twitter Cards).

## Компонент Head и useHead

Composable `useHead` позволяет задавать метатеги, скрипты и стили. Он реактивный и отлично работает как при SSR, так и на клиенте.

```vue
<script setup>
useHead({
  title: 'Моя страница',
  titleTemplate: '%s - Мой сайт',
  meta: [
    { name: 'description', content: 'Описание страницы для поисковиков' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ]
})
</script>
```

## useSeoMeta

Специализированный хук `useSeoMeta` делает работу с плоскими метатегами более удобной и типизированной, особенно для Open Graph.

```vue
<script setup>
useSeoMeta({
  title: 'Главная страница',
  description: 'Это главная страница моего приложения',
  ogTitle: 'Главная страница - Мой сайт',
  ogDescription: 'Это главная страница моего приложения',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})
</script>
```

## Динамический SEO

Часто SEO-данные зависят от полученных данных API (например, статья в блоге):

```vue
<script setup>
const { data: post } = await useFetch(`/api/posts/${route.params.id}`)

useSeoMeta({
  title: post.value?.title,
  description: post.value?.excerpt
})
</script>
```

## Конфигурация по умолчанию

В `nuxt.config.ts` можно задать метатеги, которые будут применяться ко всем страницам по умолчанию, если они не переопределены локально в компонентах.

```ts
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  }
})
```
