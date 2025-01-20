
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
