<script lang="ts" setup>

</script>

<template>
  <div class="loader">
    <Icon name="line-md:loading-loop" />
  </div>
</template>

<style scoped lang="scss">
.loader {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-grow: 1;
  font-size: 4rem;
  color: var(--fg-accent-color);
}
</style>
