
У меня есть див, а внутри него слот, и он вот у меня именованый. Я хочу чтобы у меня див не рисовался если в слоте ничего нет. Как это сделать?

```ts
<script lang="ts" setup>

</script>

<template>
  <div>
    <slot />
  </div>
</template>
```

## Composition API

> [!INFO]- Ответ
> >
> ```ts
> </script lang="ts" setup>
> const slots = useSlots();
>
> const hasDefaultSlot = computed(() => {
>    return !!slots.default?.();
> });
> </script>
>
> <template>
>  <div v-if="hasDefaultSlot">
>    <slot />
>  </div>
> </template>
> ```


## Options API

> [!INFO]- Ответ
> >
> ```ts
> <script lang="ts">
> export default defineComponent({
>   computed: {
>     hasDefaultSlot() {
>       return !!this.$slots.default;
>     },
>   },
> });
> </script>
>
> <template>
>   <div v-if="hasDefaultSlot">
>     <slot />
>   </div>
> </template>
> ```


---

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


---

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
