Вероятно, вы получили эту ошибку в промежуточном ПО или плагине, который включает код `async` / `await` в блок `try/catch`. Например:

Ошибка возникает в `middleware` или `plugins` с  `async` / `await` кодом в блоке `try/catch`

> middleware/auth.global.ts

```ts
export default defineNuxtRouteMiddleware(async (to, from) => {
  let user

  try {
    user = await fetchUser()
  } catch (error) {
    user = null
  }

  if (!user) {
    return navigateTo('/login')) // ☠️ the error happens in this line
  }
})
```

Ошибка возникает из-за того, что компилятор потерял контекст Nuxt в блоке `try/catch`. Nuxt 3 внутренне использует `unjs/unctx`, чтобы композиты, такие как `navigateTo()`, работали без прямой передачи `nuxtApp`.

*Решение* - использовать метод `runWithContext`: 

> middleware/auth.ts

```ts
export default defineNuxtRouteMiddleware(async (to, from) => {
  let user

  try {
    user = await fetchUser()
  } catch (error) {
    user = null
  }

  if (!user) {
    return nuxtApp.runWithContext(() => navigateTo('/login'))
  }
})
```

## Источники
- #### [vue tips](https://mokkapps.de/vue-tips/how-to-fix-nuxt-instance-unavailable-error-in-nuxt)
