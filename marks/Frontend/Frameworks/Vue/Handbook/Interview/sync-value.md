## Composition API
```ts
<script setup lang="ts">
/**
 * @description
 * ? Исправить получение актуального значения в функции getValue
 *
 * ! Запрещено удалять this.$refs.value?.textContent
 */

const value = ref(0)
const derivedValue = ref(0)

const refElement = ref()

function getValue() {
  return +refElement.value?.textContent
}

function increment() {
  value.value += 1

  derivedValue.value = getValue()
}
</script>

<template>
  <button @click="increment">
    increment
  </button>
  <div>
    Текущее значение: <span ref="refElement">{{ value }}</span>
  </div>
  <div>
    Производное значение:
    <span>{{ derivedValue }}</span>
  </div>
</template>
```

> [!INFO]- Ответ
> >
> ```ts
> < setup lang="ts">
> /**
>  * @description
>  * ? Исправить получение актуального значения в функции getValue
>  *
>  * ! Запрещено удалять this.$refs.value?.textContent
>  */
> 
> const value = ref(0)
> const derivedValue = ref(0)
> 
> const refElement = ref()
> 
> function getValue() {
>   return +refElement.value?.textContent
> }
> function increment() {
>   value.value += 1
> 
>   nextTick(() => {
>     derivedValue.value = getValue()
>   })
> }
> </ script>
> 
> < template>
>   < button @click="increment">
>     increment
>   </ button>
>   < div>
>     Текущее значение: <span ref="refElement">{{ value }}</span>
>   </ div>
>   < div>
>     Производное значение:
>     <span>{{ derivedValue }}</span>
>   </ div>
> </ template>
> ```
