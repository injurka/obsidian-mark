> nuxt-config.ts

```tsx
default defineNuxtConfig({
  vite: {
    build: {
      assetsInlineLimit: 4_194_304, // 4mb
    }
  }
})
```