<script lang="ts" setup>
definePageMeta({
  layout: 'nav-content',
  pageTransition: {
    name: 'fade',
    mode: 'out-in',
  },
})
</script>

<template>
  <v-alert
    text="Выберите интересующею вас тему."
    title="Ничего не выбрано."
    type="info"
    variant="tonal"
    height="150"
  />
</template>

<style lang="scss" scoped>

</style>
