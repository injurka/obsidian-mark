<script lang="ts" setup>
import type { ContentNavItem } from '~/components/modules/content-viewer'
import { ContentViewerHeader, ContentViewerNavigation ,useContentViewerStore} from '~/components/modules/content-viewer'
import { PageLoader } from '~/components/shared/page-loader'

interface RouteParams {
  vault: string
}

const router = useRouter()
const contentViewerStore = useContentViewerStore() 

const params = computed(() => {
  const routeParams = router.currentRoute.value.params as any
  return { vault: routeParams.vault } as RouteParams
})

const { data: navItems, refresh: navRefresh, status: navStatus } = await useAsyncData<ContentNavItem[]>(`nav-${params.value.vault}`, async () => {
  const { staticBaseUrl } = useRuntimeConfig().public
  return await $fetch<ContentNavItem[]>(
    `${staticBaseUrl}/content/${params.value.vault}/nav.json`,
    { method: 'get', responseType: 'json' },
  )
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
        <ContentViewerNavigation :items="navItems" />

        <div class="main-content-wrapper">
          <ContentViewerHeader />

          <div class="main-content" :class="{ 'main-content--borderless': contentViewerStore.borderlessViewEnabled }">
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
}

.main-content-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.main-content {
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
    :deep(.markdown-body-wrapper) {
      padding: 20px 40px;
      background-color: transparent;
    }
  }
}
</style>
