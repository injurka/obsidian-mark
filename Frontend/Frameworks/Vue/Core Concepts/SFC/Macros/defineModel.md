## What is `v-model`
Может использоваться на компоненте для реализации двустороннего связывания.

Child.vue
```ts
<script setup>
const model = defineModel()

function update() {
  model.value++
}
</script>

<template>
  <div>parent bound v-model is: {{ model }}</div>
</template>
```

Parent.vue
```ts
<Child v-model="count" />
```

Значение, возвращаемое функцией `defineModel()`, является ссылкой. Оно может быть получено и изменено так же, как и любая другая ссылка, за исключением того, что оно действует как двунаправленная привязка между значением родителя и локальным:

- Его *.value* синхронизируется со значением, привязанным к родительскому `v-model;`
- Когда оно изменяется дочерним элементом, оно вызывает обновление родительского привязанного значения.

Это означает, что вы также можете привязать эту ссылку к собственному элементу ввода с `v-model`, что делает его простым для обертывания собственных элементов ввода, предоставляя одинаковый способ использования `v-model`:

```ts
<script setup>
const model = defineModel()
</script>

<template>
  <input v-model="model" />
</template>
```


`defineModel` - это удобный макрос. Компилятор его разворачивает в следующее:

- Свойство с именем `modelValue`, с которым синхронизируется значение локальной ссылки;
- Событие с именем `update:modelValue`, которое генерируется при изменении значения локальной ссылки.

Вот как вы можете реализовать тот же дочерний компонент, показанный выше до 3.4:

```ts
<script setup>
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="props.modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>
```

Как видите, это довольно многословный способ. Однако, понять, что происходит под капотом, полезно.

Так как `defineModel` объявляет свойство, вы можете объявить параметры базового свойства, передав их в `defineModel`:

```js
// делаем v-model обязательным
const model = defineModel({ required: true })

// предоставляем значение по умолчанию
const model = defineModel({ default: 0 })
```


> [!Внимание]
> Если у вас есть значение по умолчанию для свойства `defineModel` и вы не предоставляете это свойство от родительского компонента, это может привести к рассинхронизации между родительским и дочерним компонентами. В примере ниже родительский `myRef` не определен, но дочерний `model` равен 1:
> ```ts
> // дочерний компонент:
> const model = defineModel({ default: 1 })
> 
> // родительский компонент:
> const myRef = ref()
> ```
> 
> ```ts
> <Child v-model="myRef"></Child>
> ```

---

## `v-model` arguments

`v-model` на компоненте также может принимать аргумент:

```ts
<MyComponent v-model:title="bookTitle" />
```

В дочернем компоненте этот аргумент можно поддержать, передав строку в `defineModel()` в качестве его первого аргумента:

```ts
<!-- MyComponent.vue -->
<script setup>
const title = defineModel('title')
</script>

<template>
  <input type="text" v-model="title" />
</template>
```

Если нужны параметры свойства, они должны быть переданы после имени модели:

```ts
const title = defineModel('title', { required: true })
```

До Vue 3.4
```ts
<!-- MyComponent.vue -->
<script setup>
defineProps({
  title: {
    required: true
  }
})
defineEmits(['update:title'])
</script>Z

<template>
  <input
    type="text"
    :value="title"
    @input="$emit('update:title', $event.target.value)"
  />
</template>
```

---

## Multiple `v-model` bindings

Используя возможность указывать конкретное свойство и событие, как мы узнали ранее с помощью аргументов `v-model`, теперь мы можем создавать несколько привязок `v-model` к одному экземпляру компонента.

Каждый `v-model` будет синхронизироваться с разными свойствами, без необходимости дополнительных опций в компоненте:

```ts
<UserName
  v-model:first-name="first"
  v-model:last-name="last"
/>
```

```ts
<script setup>
const firstName = defineModel('firstName')
const lastName = defineModel('lastName')
</script>

<template>
  <input type="text" v-model="firstName" />
  <input type="text" v-model="lastName" />
</template>
```

До Vue 3.4
```ts
<script setup>
defineProps({
  firstName: String,
  lastName: String
})

defineEmits(['update:firstName', 'update:lastName'])
</script>

<template>
  <input
    type="text"
    :value="firstName"
    @input="$emit('update:firstName', $event.target.value)"
  />
  <input
    type="text"
    :value="lastName"
    @input="$emit('update:lastName', $event.target.value)"
  />
</template>
```

---

## Handling `v-model` modifiers

Когда мы изучали привязки ввода форм, мы видели, что `v-model` имеет встроенные модификаторы - `.trim`, `.number` и `.lazy`. В некоторых случаях вы также можете захотеть, чтобы `v-model` на вашем пользовательском компоненте ввода поддерживал пользовательские модификаторы.

Давайте создадим пример пользовательского модификатора `capitalize`, который делает первую букву строки, предоставленной привязкой `v-model`, заглавной:

```ts
<MyComponent v-model.capitalize="myText" />
```

Модификаторы, добавленные к компоненту `v-model`, могут быть получены в дочернем компоненте, разбивая возвращаемое значение `defineModel()`:

```ts
<script setup>
const [model, modifiers] = defineModel()

console.log(modifiers) // { capitalize: true }
</script>

<template>
  <input type="text" v-model="model" />
</template>
```

Чтобы условно изменять, как значение должно быть прочитано / записано на основе модификаторов, мы можем передать параметры `get` и `set` в `defineModel()`. Эти два параметра получают значение при получении / установке модели ref и должны возвращать преобразованное значение. Это как мы можем использовать параметр `set` для реализации модификатора `capitalize`:

```ts
<script setup>
const [model, modifiers] = defineModel({
  set(value) {
    if (modifiers.capitalize) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
    return value
  }
})
</script>

<template>
  <input type="text" v-model="model" />
</template>
```

До Vue 3.4
```ts
<script setup>
const props = defineProps({
  modelValue: String,
  modelModifiers: { default: () => ({}) }
})

const emit = defineEmits(['update:modelValue'])

function emitValue(e) {
  let value = e.target.value
  if (props.modelModifiers.capitalize) {
    value = value.charAt(0).toUpperCase() + value.slice(1)
  }
  emit('update:modelValue', value)
}
</script>

<template>
  <input type="text" :value="modelValue" @input="emitValue" />
</template>
```

### Modifiers for `v-model` with arguments

Вот еще один пример использования модификаторов с несколькими v-model с разными аргументами:

```ts
<UserName
  v-model:first-name.capitalize="first"
  v-model:last-name.capitalize="last"
/>
```

```ts
<script setup>
const firstName = defineModel('firstName')
const lastName = defineModel('lastName')
</script>

<template>
  <input type="text" v-model="firstName" />
  <input type="text" v-model="lastName" />
</template>
```

В этом примере модификатор `.capitalize` будет применяться к каждому `v-model`, чтобы преобразовать введенный текст в верхний регистр.


До Vue 3.4
```ts
<script setup>
const props = defineProps({
	firstName: String,
	lastName: String,
	firstNameModifiers: { default: () => ({}) },
	lastNameModifiers: { default: () => ({}) }
})
defineEmits(['update:firstName', 'update:lastName'])

console.log(props.firstNameModifiers) // { capitalize: true }
console.log(props.lastNameModifiers) // { uppercase: true}
</script>
```

## Detect changes  `v-model` value

### With `WritableComputedRef`

Parent.vue
```ts
<script setup lang="ts">
import ChildComponent from './child.vue'

const inputValue = shallowRef<string>('')

const message = computed({
  get: () => inputValue.value,
  set: (value) => {
    console.log('CHANGED')
    return inputValue.value = value
  },
})
</script>

<template>
  <ChildComponent v-model="message" />
  <p>Message: {{ message }}</p>
</template>
```

Child.vue
```ts
<script setup lang="ts">
const inputValue = defineModel<string>({ required: true })
</script>

<template>
  <input v-model="inputValue" type="text">
</template>
```

### With `watch`

Parent.vue
```ts
<script setup lang="ts">
import ChildComponent from './child.vue'

const message = shallowRef<string>('')

watch(
  () => message.value,
  () => console.log('CHANGED'),
)
</script>

<template>
  <ChildComponent v-model="message" />
  <p>Message: {{ message }}</p>
</template>

```

Child.vue
```ts
<script setup lang="ts">
const inputValue = defineModel<string>({ required: true })
</script>

<template>
  <input v-model="inputValue" type="text">
</template>
```
