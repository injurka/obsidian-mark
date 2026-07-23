# Управление состоянием (State Management)

В Nuxt есть несколько подходов для управления глобальным состоянием: встроенный `useState` и внешние библиотеки, такие как Pinia.

## Встроенный useState

`useState` - это реактивный, SSR-совместимый глобальный стейт.
В отличие от обычного `ref` во Vue, `useState` гарантирует, что состояние будет синхронизировано между сервером и клиентом (предотвращая ошибки гидратации).

Пример использования:
```vue
<script setup>
const counter = useState('counter', () => 0)
const increment = () => counter.value++
</script>

<template>
  <div>
    Счетчик: {{ counter }}
    <button @click="increment">+</button>
  </div>
</template>
```

Глобальное использование через Composables (в папке `composables/states.ts`):
```ts
export const useCounter = () => useState<number>('counter', () => 0)
```

## Pinia

Для сложных приложений рекомендуется использовать Pinia - официальный стейт-менеджер для Vue, который отлично интегрируется с Nuxt через модуль `@pinia/nuxt`.

Установка:
```bash
npm install pinia @pinia/nuxt
```

Добавление в `nuxt.config.ts`:
```ts
export default defineNuxtConfig({
  modules: ['@pinia/nuxt']
})
```

Пример хранилища (Store) в `stores/user.ts`:
```ts
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: '',
    isLoggedIn: false
  }),
  actions: {
    login(name: string) {
      this.name = name
      this.isLoggedIn = true
    }
  }
})
```
