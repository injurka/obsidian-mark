<script lang="ts" setup>
import { useChangeTheme } from '~/shared/composables/change-theme'

const app = useAppConfig()
const { theme, getHeadThemeColor } = useChangeTheme()

useHead({
  ...app,
  htmlAttrs: {
    lang: 'ru',
  },
  meta: [
    { name: 'theme-color', content: getHeadThemeColor() },
  ],
})

watch(
  () => theme.value,
  () => {
    useHead({
      ...app,
      meta: [
        { name: 'theme-color', content: getHeadThemeColor() },
      ],
    })
  },
)
</script>

<template>
  <NuxtLoadingIndicator color="var(--border-accent-color)" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
