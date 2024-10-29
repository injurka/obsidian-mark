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