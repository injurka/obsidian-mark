# Pinia: `defineStore`

`defineStore` — это основная функция в Pinia для создания глобальных хранилищ (сторов). Стор позволяет компонентам разделять состояние (state), вычисляемые свойства (getters) и методы (actions) в реактивной и строго типизированной манере.

`defineStore` принимает два аргумента:
1. `id` (строка) — Уникальный идентификатор стора, необходим Pinia для подключения стора к DevTools.
2. `options` (объект) или `setup` (функция).

## Два синтаксиса `defineStore`

### 1. Options Store (Схож с Vuex / Options API)

Подходит для простой и понятной структуры. Данные разделены на `state`, `getters` и `actions`.

```javascript
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  // 1. State: функция, возвращающая начальное состояние
  state: () => ({
    count: 0,
    name: 'Eduardo'
  }),
  // 2. Getters: эквивалент computed свойств (принимают state)
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  // 3. Actions: методы для изменения state (могут быть асинхронными)
  actions: {
    increment() {
      this.count++
    },
    async fetchUser() {
      // Поддерживает async/await
    }
  }
})
```

### 2. Setup Store (Composition API)

Обеспечивает большую гибкость. Подходит, если вы уже привыкли к `<script setup>` и хотите использовать `watch` или инжектировать глобальные сервисы.

```javascript
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  // state (реактивные данные)
  const count = ref(0)
  const name = ref('Eduardo')

  // getters (computed свойства)
  const doubleCount = computed(() => count.value * 2)

  // actions (функции)
  function increment() {
    count.value++
  }

  // Обязательно вернуть все, что должно быть доступно
  return { count, name, doubleCount, increment }
})
```

## Использование в компоненте

```javascript
import { useCounterStore } from '@/stores/counter'
// Вызывайте store внутри setup() или <script setup>
const store = useCounterStore()

store.increment() // Вызов action
console.log(store.doubleCount) // Чтение getter
```