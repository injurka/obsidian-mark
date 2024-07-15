**shallowRef** можно использовать для оптимизации реактивности вашего приложения *Vue*. Как вы уже догадались, `shallowRef` - это неглубокая версия **ref()**.

```ts
<script setup lang="ts">
import { shallowRef } from 'vue'

const state = shallowRef({
  count: 0,
})
</script>

<template>
  <span>Count: {{ state.count }}</span>
</template>
```

> Нет реакции при изменении
> 
```ts
<script setup lang="ts">
import { shallowRef, watch } from 'vue'

const state = shallowRef({
  count: 0,
})

const increment = () => {
  state.value.count = 2 // ⚠️ doesn't trigger change (watcher & UI update)
}

watch(state, (newState) => {
  console.log('new state', newState)
})
</script>

<template>
  <span>Count: {{ state.count }}</span>
  <button @click="increment">Increment count</button>
</template>
```

> ![WARNING]
> При нажатии на кнопку «Увеличить счет» счетчик в пользовательском интерфейсе не обновляется и наблюдатель не запускается.

В отличие от `ref()`, внутреннее значение неглубокой ссылки хранится и раскрывается как есть, и не будет сделано глубоко реактивным. Реактивным является только доступ к `.value`.

Реактивность корректно срабатывает, если мы передаем полностью новое значение в свойство `.value`:

```ts
<script setup lang="ts">
import { shallowRef, watch } from 'vue'

const state = shallowRef({
  count: 0,
})

const setNewValue = () => {
  state.value = { count: 2 } // triggers change
}

watch(state, (newState) => {
  console.log('new state', newState)
})
</script>

<template>
  <span>Count: {{ state.count }}</span>
  <button @click="setNewValue">Set new .value</button>
</template>
```

`shallowRef()` обычно используется для оптимизации производительности больших структур данных или интеграции с внешними системами управления состоянием.

## Источники
- #### [vue tips](https://mokkapps.de/vue-tips/optimize-performance-using-shallow-ref)
