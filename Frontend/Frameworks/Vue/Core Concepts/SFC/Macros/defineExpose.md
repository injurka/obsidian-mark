**Макрос компилятора** используемые только внутри `<script setup>`. Не нужно импортировать и он будет компилироваться при обработке `<script setup>`.

Используется для определения какие свойства или методы компонента должны быть доступны в родительском компоненте или в контексте Vue. Вот пример использования `defineExpose` с `<script setup>`:

## Примеры

Родительский компонент:

<template>
  <ChildComponent ref="childComponentRef" />
</template>
```ts
<script setup lang="ts">
import { ref, onMounted, Ref } from 'vue';
import ChildComponent from './ChildComponent.vue';

// Определяем тип для дочернего компонента
type ChildComponentRef = InstanceType<typeof ChildComponent>;

// Определяем тип для экспортированного свойства
type ExposedProperty = {
  exposedProperty: string;
};

const childComponentRef = ref<ChildComponentRef & ExposedProperty>(null);

onMounted(() => {
  // Доступ к экспортированному свойству дочернего компонента
  if (childComponentRef.value) {
    console.log(childComponentRef.value.exposedProperty);
  }
});
</script>

<template>
  <ChildComponent ref="childComponentRef" />
</template>
```

Дочерний компонент:

```ts
<script setup lang="ts">
import { ref, defineExpose } from 'vue';

const exposedProperty = ref('Hello from child component');

// Экспорт свойства
defineExpose({
  exposedProperty
});
</script>

<template>
  <!-- Содержимое дочернего компонента -->
</template>
```