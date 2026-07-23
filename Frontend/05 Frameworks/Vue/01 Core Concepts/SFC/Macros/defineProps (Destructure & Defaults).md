- ### [[Frontend/Frameworks/Vue/Core Concepts/SFC/Macros/defineProps/Basic|Basic]]
- ### [[Generic]]
- ### [[Defaults]]
- ### [[Destructure]]


---

Z**Макрос компилятора** используемые только внутри `<script setup>`. Не нужно импортировать и он будет компилироваться при обработке `<script setup>`.

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

---

### JS
 
```js
<script setup>
defineProps({
  // Basic type check
  //  (`null` and `undefined` values will allow any type)
  a: Number,
  // Multiple possible types
  b: [String, Number],
  // Required string
  v: {
    type: String,
    required: true,
  },
  // Number with a default value
  d: {
    type: Number,
    default: 100,
  },
  // Object with a default value
  e: {
    type: Object,
    // Object or array defaults must be returned from
    // a factory function. The function receives the raw
    // props received by the component as the argument.
    default(rawProps) {
      return { message: 'hello' };
    },
  },
  // Custom validator function
  // full props passed as 2nd argument in 3.4+
  f: {
    validator(value, props) {
      // The value must match one of these strings
      return ['success', 'warning', 'danger'].includes(value);
    },
  },
  // Function with a default value
  g: {
    type: Function,
    // Unlike object or array default, this is not a factory
    // function - this is a function to serve as a default value
    default() {
      return ['one, two'];
    },
  },
});
</script>

```

### TS

```ts
<script setup lang="ts">
interface Props {
  a?: number;
  b?: string | number;
  c: string;
  d?: number;
  e?: { message: 'string' };
  f?: 'success' | 'warning' | 'danger';
  g?: Array<string>;
}

withDefaults(
	defineProps<Props>(), 
	{ d: 100, e: { message: 'hello' }, 
	g: () => ['one', 'two'] }
);
</script>
```


---


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


---


```ts
<script setup lang="ts" generic="T extends string | number, U extends Item">
import type { Item } from './types'

defineProps<{
  id: T
  list: U[]
}>()
</script>
```
