<script lang="ts" setup>
import type { ContentNavItem } from '~/components/modules/content-viewer'
import { ContentViewerHeader, ContentViewerNavigation, useContentViewerStore } from '~/components/modules/content-viewer'
import { PageLoader } from '~/components/shared/page-loader'

interface RouteParams {
  vault: string
}

const router = useRouter()
const contentViewerStore = useContentViewerStore()

const menu = ref<boolean>(false)

const params = computed(() => {
  const routeParams = router.currentRoute.value.params as any
  return { vault: routeParams.vault } as RouteParams
})

const { data: navItems, refresh: navRefresh, status: navStatus } = await useAsyncData<ContentNavItem[]>(`nav-${params.value.vault}`, async () => {
  const { staticBaseUrl } = useRuntimeConfig().public
  const data = await $fetch<ContentNavItem[]>(
    `${staticBaseUrl}/content/${params.value.vault}/nav.json`,
    { method: 'get', responseType: 'json' },
  )

  contentViewerStore.$patch({ navItems: data })

  return data
})

watch(
  () => params.value.vault,
  () => navRefresh(),
)
</script>

<template>
  <VLayout>
    <VMain>
      <PageLoader v-if="navStatus === 'pending'" />

      <div v-else class="app-wrapper">
        <ContentViewerNavigation v-model:menu="menu" :items="navItems" />

        <div class="main-content-wrapper">
          <ContentViewerHeader v-model:menu="menu" />

          <div
            class="main-content"
            :class="{ 'main-content--borderless': contentViewerStore.borderlessViewEnabled }"
          >
            <slot />
          </div>
        </div>
      </div>
    </VMain>
  </VLayout>
</template>

<style lang="scss" scoped>
.app-wrapper {
  display: flex;
  flex-direction: row;
  height: 100%;
  flex: 1;
  overflow-y: auto;
  background-color: var(--bg-primary-color);
  height: 100vh;
}

.main-content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.main-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
  overflow-y: auto;

  &--borderless {
    padding: 0;
    :deep(.content-viewer) {
      width: 100%;
      max-width: none;
      margin: 0;
    }
  }
}
</style>
