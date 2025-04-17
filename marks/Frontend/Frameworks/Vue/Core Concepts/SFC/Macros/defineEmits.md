**Макрос компилятора** используемые только внутри `<script setup>`. Не нужно импортировать и он будет компилироваться при обработке `<script setup>`.

Используется для определения событий, которые компонент может вызывать. Это особенно полезно при использовании `script setup` синтаксиса, который позволяет вам определить компонент без использования `props`, `emits` и других объявлений.

## Пример

```ts
<script setup lang="ts">
import { ref } from 'vue'

// Создаем ссылку на состояние
const count = ref<number>(0)

// Определяем события, которые компонент может вызывать
const emit = defineEmits<{
  (e: 'increment'): void;
  (e: 'decrement'): void;
  (e: 'reset'): void;
}>();

// Функции для изменения состояния
function increment() {
  count.value++
  emits('increment')
}

function decrement() {
  count.value--
  emits('decrement')
}

function reset() {
  count.value = 0
  emits('reset')
}
</script>

<template>
  <button @click="increment">Increment</button>
  <button @click="decrement">Decrement</button>
  <button @click="reset">Reset</button>
  <p>Count: {{ count }}</p>
</template>
```

Мы определяем события `increment`, `decrement` и `reset`, которые компонент может вызывать. Затем мы создаем функции для изменения состояния и вызываем соответствующие события при изменении состояния. Вызов `emits('decrement')` в функции `decrement` служит для того, чтобы сообщить родительскому компоненту о том, что событие `decrement` было вызвано внутри этого компонента.

```ts
<script setup lang="ts">
import ChildComponent from './ChildComponent.vue'

import { ref } from 'vue'

const count = ref<number>(0)

function increment() {
  count.value++
}

function decrement() {
  count.value--
}

function reset() {
  count.value = 0
}
</script>

<template>
  <div>
    <child-component 
	    @increment="increment" 
	    @decrement="decrement" 
	    @reset="reset" 
	/>
    <p>Count: {{ count }}</p>
  </div>
</template>
```

---

## С типизацией

```ts
<script setup lang="ts">
// runtime
const emit = defineEmits(['change', 'update'])

// options based
const emit = defineEmits({
  change: (id: number) => {
    // return `true` or `false` to indicate
    // validation pass / fail
  },
  update: (value: string) => {
    // return `true` or `false` to indicate
    // validation pass / fail
  }
})

// type-based
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()

// 3.3+: alternative, more succinct syntax
const emit = defineEmits<{
  change: [id: number]
  update: [value: string]
}>()
</script>
```

---

## Types in script setup

```ts
<script setup lang="ts">
// runtime
const emit = defineEmits(['change', 'update'])

// options based
const emit = defineEmits({
  change: (id: number) => {
    // return `true` or `false` to indicate
    // validation pass / fail
  },
  update: (value: string) => {
    // return `true` or `false` to indicate
    // validation pass / fail
  }
})

// type-based
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()

// 3.3+: alternative, more succinct syntax
const emit = defineEmits<{
  change: [id: number]
  update: [value: string]
}>()
</script>
```