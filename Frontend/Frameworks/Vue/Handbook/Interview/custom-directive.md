## Composition API

```ts
<script lang="ts" setup>
/**
 *  @description
 *  Реализовать кастомную директиву v-on-custom,
 *  которая работает наподобие v-on
 *  и также имеет доп. модификатор .log,
 *  который логирует в консоль тип вызванного события
 *
 *  @example
 *  <button v-on-custom:click.log="handleClick" />
 *  console out => event type: click
 */

const value = ref('')

function handleClick() {
  console.log(this.value)
}
</script>

<template>
  <button v-on-custom:click.log="handleClick">
    Получить значение
  </button>
  <input v-model="value" type="text">
</template>
```

> [!INFO]- Ответ
> >
> ```ts
> </script lang="ts" setup>
> const value = ref('')
> 
> function handleClick() {
>   console.log(value.value)
> }
> 
> const vOnCustom: Directive = {
>   // Когда привязанный элемент будет примонтирован в DOM...
>   mounted(el, binding, vnode) {
>     const eventType = binding.arg
>     const handler = binding.value
>     const modifiers = binding.modifiers
> 
>     el.addEventListener(eventType, (event) => {
>       if (modifiers.log)
>         console.log('event type:', event.type)
> 
>       handler.call(vnode.context, event)
>     })
>   },
> }
> </>
> 
> <.template>
>   <.button v-on-custom:click.log="handleClick">
>     Получить значение
>   </button>
>   <.input v-model="value" type="text">
> </template>
> ```

## Option API

```ts
<script>
/**
 *  @description
 *  Реализовать кастомную директиву v-on-custom,
 *  которая работает наподобие v-on
 *  и также имеет доп. модификатор .log,
 *  который логирует в консоль тип вызванного события
 *
 *  @example
 *  <button v-on-custom:click.log="handleClick" />
 *  console out => event type: click
 */

export default {
  name: 'CustomDirective',
  data() {
    return {
      value: '',
    }
  },
  methods: {
    handleClick() {
      console.log(this.value)
    },
  },
}
</script>

<template>
  <button v-on-custom:click.log="handleClick">
    Получить значение
  </button>
  <input v-model="value" type="text">
</template>
```

> [!INFO]- Ответ
> >
> ```ts
> </script lang="ts" setup>
> export default {
>   name: 'CustomDirective',
>   directives: {
>     'on-custom': {
>       // Когда привязанный элемент будет примонтирован в DOM...
>       mounted(el, binding, vnode) {
>         const eventType = binding.arg
>         const handler = binding.value
>         const modifiers = binding.modifiers
> 
>         el.addEventListener(eventType, (event) => {
>           if (modifiers.log)
>             console.log('event type:', event.type)
> 
>           handler.call(vnode.context, event)
>         })
>       },
>     },
>   },
>   data() {
>     return {
>       value: '',
>     }
>   },
>   methods: {
>     handleClick() {
>       console.log(this.value)
>     },
>   },
> }
> </script>
> 
> <.template>
>   <.button v-on-custom:click.log="handleClick">
>     Получить значение
>   </.button>
>   <.input v-model="value" type="text">
> </.template>
> ```
