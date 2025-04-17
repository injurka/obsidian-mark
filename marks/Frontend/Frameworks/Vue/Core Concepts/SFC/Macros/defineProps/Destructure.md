
Внутри `<script setup>` мы используем макрос компилятора `defineProps()` для доступа к **props**:

```ts
<script setup lang="ts">
const props = defineProps<{ count: number }>()
</script>
```

Поскольку мы все любим деструктурировать объекты в JS, вы можете попробовать деструктурировать объект **props**:

```ts
<script setup lang="ts">
const { count } = defineProps<{ count: number }>()
</script>
```

> [!ERROR]
> При деструктуризации объекта `props` реактивность теряется.

Благодаря деструктуризации объекта `props` переменная `count` становится примитивным значением (в нашем случае типа `number`) и больше не является объектом `ref` или `reactive`.

Самое простое решение - обращаться к реквизитам как к `props.count`, чтобы сохранить реактивность:

```ts
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ count: number }>()
const doubleCount = computed(() => props.count * 2)
</script>

<template>
	Double Count: {{ doubleCount }}
</template>
```

Попробуйте сами, теперь при нажатии кнопки «Увеличить» счетчик дублей будет корректно увеличиваться:

Если вы не можете жить без деструктуризации, *Vue* предоставляет специальный **toRefs**:

```ts
<script setup lang="ts">
import { computed, toRefs } from 'vue'

const props = defineProps<{ count: number }>()

const { count } = toRefs(props)

const doubleCount = computed(() => count.value * 2)
</script>

<template>
	Double Count: {{ doubleCount }}
</template>
```

`toRefs(props)` преобразует реактивный объект (в данном примере `props`) в обычный объект, где каждое свойство результирующего объекта является `ref`, указывающим на соответствующее свойство исходного объекта. Нам нужно использовать `count.value` внутри свойства `computed`, так как оно является `ref`.

## Источники
- #### [vue tips](https://mokkapps.de/vue-tips/destructure-props-in-composition-api-without-losing-reactivity)
