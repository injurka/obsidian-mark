**Макрос компилятора** используемые только внутри `<script setup>`. Не нужно импортировать и он будет компилироваться при обработке `<script setup>`.

Используется для определения пропсов, которые компонент получает от родительского компонента. Он работает внутри `<script setup>` и позволяет использовать TypeScript для типизации пропсов.

Родительская компонента:
```ts
<script setup lang="ts">
import { ref } from 'vue';
import ChildComponent from './ChildComponent.vue';

const parentMessage = ref('Hello from parent!');
</script>

<template>
  <ChildComponent :message="parentMessage" />
</template>
```

Дочерняя компонента:
```ts
<script setup lang="ts">

// TS
defineProps<{message: string}>();

// JS
defineProps({
  message: {
    type: String,
    required: true,
  },
});

</script>

<template>
  <div>{{ message }}</div>
</template>
```

В этом примере `defineProps` используется в дочерней компоненте для определения пропса `message`, который ожидается от родительской компоненты. Пропс объявлен как обязательный (`required: true`), поэтому Vue будет выдавать предупреждение, если родительская компонента не передаст этот пропс.

Также, в дочерней компоненте, пропсы деструктурируются для использования в шаблоне. Это позволяет использовать пропсы без префикса `props.` в шаблоне.

## Generics
```ts
<script setup lang="ts" generic="T extends string | number, U extends Item">
import type { Item } from './types'

defineProps<{
  id: T
  list: U[]
}>()
</script>
```