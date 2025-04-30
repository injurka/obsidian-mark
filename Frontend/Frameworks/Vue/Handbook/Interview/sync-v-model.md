## Composition API

> child.vue
```ts
<script setup lang="ts">
/**
 * @description
 * Нужно добавить реактивное связывание с родительской компонентой
 * которая передает `first-name` и `last-name`
 */
</script>

<template>
  <input
    placeholder="first-name"
    type="text"
  >
  <input
    placeholder="last-name"
    type="text"
  >
</template>
```

> parent.vue
```ts
<script setup lang="ts">
import Child from './child.vue'

const first = ref('first-name')
const last = ref('last-name')
</script>

<template>
  <Child
    v-model:first-name="first"
    v-model:last-name="last"
  />
</template>
```

> [!INFO]- Ответ
> child.vue
> ```ts
> < script setup lang="ts">
> //
> // defineProps + defineEmits
> //
> defineProps<{
>   firstName: string
>   lastName: string
> }>()
> 
> defineEmits<{
>   'update:firstName': [void]
>   'update:lastName': [void]
> }>()
> 
> //
> // Vue 3.4 defineModel
> //
> const firstName = defineModel('firstName')
> const lastName = defineModel('lastName')
> </ script>
> 
> < template>
>   <!--  -->
>   <!-- defineProps + defineEmits -->
>   <!--  -->
>   < input
>     type="text"
>     :value="firstName"
>     @input="$emit('update:firstName', $event.target.value)"
>   >
>   < input
>     type="text"
>     :value="lastName"
>     @input="$emit('update:lastName', $event.target.value)"
>   >
>   <!--  -->
>   <!-- Vue 3.4 defineModel -->
>   <!--  -->
>   < input
>     v-model="firstName"
>     type="text"
>   >
>   < input
>     v-model="lastName"
>     type="text"
>   >
> </.template>
> ```
> parent.vue
> ```ts
> < script setup lang="ts">
> import Child from './child.vue'
> 
> const first = ref('first-name')
> const last = ref('last-name')
> </ script>
> 
> < template>
>   < Child
>     v-model:first-name="first"
>     v-model:last-name="last"
>   />
> </ template>
> ```
