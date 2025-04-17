## Composition API

```ts
<script setup lang="ts">
const value = ref('')
</script>

<template>
  <input type="text">
  <div>
    <span>Значение: </span>
    {{ value }}
  </div>
</template>
```

> [!INFO]- Ответ
> >
> ```ts
> < script setup lang="ts">
> import { ref, onMounted } from 'vue'
> 
> const value = ref('')
> const inputRef = ref<HTMLInputElement | null>(null)
> 
> onMounted(() => {
>   if (inputRef.value) {
>     inputRef.value.value = value.value
>   }
> })
> 
> const updateValue = (event: Event) => {
>   if (event.target) {
>     value.value = (event.target as HTMLInputElement).value
>   }
> }
> </.script>
> 
> < template>
>   < input type="text" ref="inputRef" @input="updateValue">
>   < div>
>     <span>Значение: </span>
>     {{ value }}
>   </ div>
> </ template>
> ```

## Option API

```ts
<script lang="ts">
const value = ref('')
</script>

<template>
  <input type="text">
  <div>
    <span>Значение: </span>
    {{ value }}
  </div>
</template>
```

> [!INFO]- Ответ
> >
> ```ts
> < script>
> export default {
>   name: 'VModel',
>   data() {
>     return {
>       value: '',
>     }
>   },
>   methods: {
>     updateValue(event) {
>       this.value = event.target.value;
>       this.$refs.value.textContent = this.value;
>     }
>   }
> }
> </ script>
> 
> < template>
>   < input type="text" @input="updateValue">
>   < div>
>     < span>Значение: </.span>
>     < span ref="value">{{ value }}</.span>
>   </ div>
> </.template>
> ```
