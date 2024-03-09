Когда вы изменяете реактивное состояние в Vue, полученные обновления DOM не применяются синхронно. Вместо этого Vue буферизует их до «следующего тика», чтобы гарантировать, что каждый компонент обновляется только один раз, независимо от того, сколько изменений состояния вы сделали.

`nextTick()`можно использовать сразу после изменения состояния, чтобы дождаться завершения обновлений DOM. Вы можете либо передать обратный вызов в качестве аргумента, либо дождаться возвращенного обещания.

### Пример

```ts
<script setup>
import { ref, nextTick } from 'vue'

const count = ref(0)

async function increment() {
  count.value++

  // DOM not yet updated
  console.log(document.getElementById('counter').textContent) // 0

  await nextTick()
  // DOM is now updated
  console.log(document.getElementById('counter').textContent) // 1
}
</script>

<template>
  <button id="counter" @click="increment">{{ count }}</button>
</template>
```