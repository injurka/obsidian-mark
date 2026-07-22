## Composition API

```ts
<script lang="ts" setup>
/**
 * @description
 * ? Что нужно сделать, для того чтобы выводилось последоавтельно - 1 2 3
 */

const asyncFunc = (value: number) => new Promise((res, _) => res(value))

console.log(1)

asyncFunc(2).then((value) => {
  console.log(value)
})

console.log(3)
</script>
```

> [!INFO]- Ответ
> >
> ```ts
> </script lang="ts" setup>
> const asyncFunc = (value: number) => new Promise((res, _) => res(value))
> 
> console.log(1)
> 
> asyncFunc(2).then((value) => {
>   console.log(value)
> })
> 
> const value = await asyncFunc(2)
> 
> console.log(value)
> 
> console.log(3)
> </script>
> ```

## Option API

```ts
<script>
/**
 * @description
 * ? Что нужно сделать, для того чтобы выводилось последоавтельно - 1 2 3
 */

export default {
  created() {
    const asyncFunc = value => new Promise((res, _) => res(value))

    console.log(1)

    asyncFunc(2).then((value) => {
      console.log(value)
    })

    console.log(3)
  },
}
</script>
```

> [!INFO]- Ответ
> >
> ```ts
> </script>
> export default {
>   async created() {
>     const asyncFunc = value => new Promise((res, _) => res(value))
> 
>     console.log(1)
> 
>     const value = await asyncFunc(2)
> 
>     console.log(value)
> 
>     console.log(3)
>   },
> }
> </script>
> ```

---

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


---

Можно ли использовать getter в getter хранилища Pinia?

```ts
export const useCounterStore = defineStore('counter', {
  state: () => {
    count: 0
  },
  getters: {
    doubleCount() {
      return state.count * 2
    },
    doublePlusOne() {
      return this.doubleCount + 2
    }
  }
})
```

> [!INFO]- Ответ
> >
>
> Мы обязаны указывать тип возвращаемого значения при вызове getter внутри getter. Это связано с 
> ограничением TypeScript и не затрагивает геттеры, определенные через стрелочной функции, а также 
> геттеры, не использующие this 
>
> ```ts
> export const useCounterStore = defineStore('counter', {
>   state: () => {
>     count: 0
>   },
>   getters: {
>     // автоматически определяет тип как число
>     doubleCount() {
>       return state.count * 2
>     },
>     // тип возвращаемого значения **должен** быть явно задан
>     doublePlusOne(): number {
>       return this.doubleCount + 2
>     }
>   }
> })
> ```
