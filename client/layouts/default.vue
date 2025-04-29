<script lang="ts" setup>

</script>

<template>
  <VLayout>
    <VMain>
      <div class="main-content">
        <slot />
      </div>
    </VMain>
  </VLayout>
</template>

<style scoped lang="scss">
.main-content {
  height: 100vh;
}
</style>
