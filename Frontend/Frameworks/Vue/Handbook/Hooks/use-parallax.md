```ts
<script setup lang="ts">
const container = ref(null)
const { tilt, roll } = useParallax(container)
const SCALE_CONTSTANT = 25
</script>

<template>
  <div class="wrapper">
    <div
      ref="container"
      class="card"
      :style="{
        transform: `
        rotateX(${roll * SCALE_CONTSTANT}deg)
        rotateY(${tilt * SCALE_CONTSTANT}deg)
      `,
      }"
    />
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1d1d1d;
}
.card {
  height: 480px;
  width: 640px;
  border-radius: 18px;
  background-color: #f0f0f0;
  border: 1px solid #dadada;
}
</style>
```