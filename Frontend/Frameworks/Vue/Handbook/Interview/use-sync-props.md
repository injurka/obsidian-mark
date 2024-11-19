## Composition API

> child.vue
```ts
<script setup lang="ts">
/**
 * @description
 * Нужно реалзиовать фукнкцию useSyncProps которая должна возвращать
 * значение с которым можно будет работать как с обычной реактивной переменной
 *
 * Можно добавлять парметры для функции useSyncProps
 */

const dialog = useSyncProps()
</script>

<template>
  <div>
    Текущее состояние:
    <span>{{ String(dialog) }}</span>
  </div>
  <button @click="dialog = !dialog">
    Поменять состояние
  </button>
</template>
```

>parent.vue
```ts
<script setup lang="ts">
import Child from './child.vue'

const value = ref(false)
</script>

<template>
  <Child v-model="value" />
</template>
```

> [!INFO]- Ответ
> child.vue
> 
> ```ts
> < script setup lang="ts">
> const props = defineProps<{ modelValue: boolean }>()
> const emit = defineEmits<{ 'update:modelValue': [void] }>()
> 
> function useSyncProps< T>(props: unknown, key: string, emit: unknown): WritableComputedRef< T> {
>   return computed({
>     get() {
>       return props[key]
>     },
>     set(value) {
>       emit(`update: ${ key }`, value)
>     },
>   })
> }
> 
> const dialog = useSyncProps< boolean>(props, 'modelValue', emit)
> </ script>
> 
> < template>
>   < div>
>     Текущее состояние:
>     </ span>{{ String(dialog) }}</span>
>   </ div>
>   < button @click="dialog = !dialog">
>     Поменять состояние
>   </ button>
> </ template>
> ```
> parent.vue
> ```ts
> < script setup lang="ts">
> import Child from './child.vue'
> 
> const value = ref(false)
> </ script>
> 
> < template>
>   < Child v-model="value" />
> </ template>
> ```
