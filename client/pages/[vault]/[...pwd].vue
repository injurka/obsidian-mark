<script setup lang="ts">
import { ContentViewer, ContentViewerFooter, useContentViewerStore } from '~/components/modules/content-viewer'

interface RouteParams {
  pwd: string[]
  vault: string
}

const route = useRoute()
const store = useContentViewerStore()

const params = computed(() => {
  const routeParams = route.params as any
  return {
    vault: routeParams.vault,
    pwd: Array.isArray(routeParams.pwd) ? routeParams.pwd : [routeParams.pwd].filter(Boolean),
  } as RouteParams
})

const { staticBaseUrl } = useRuntimeConfig().public

const { data: contentData, refresh: contentRefresh, status: contentStatus } = useAsyncData(`content-${params.value.vault}-${params.value.pwd}`, () => {
  return $fetch<string>(
    `${staticBaseUrl}/content/${params.value.vault}/${params.value.pwd.join('/')}.md`,
    { method: 'get', responseType: 'text' },
  )
})

const imageBasePath = computed(() => (`${staticBaseUrl}/content/${params.value.vault}/_/`))

watch(
  () => params.value.pwd,
  () => {
    contentRefresh()
  },
)

definePageMeta({
  layout: 'nav-content',
  pageTransition: {
    name: 'fade',
    mode: 'out-in',
  },
})
</script>

<template>
  <div class="content-wrapper">
    <div v-if="contentStatus === 'pending'" class="loader">
      <v-progress-circular indeterminate size="32" />
    </div>

    <ClientOnly v-else-if="contentData">
      <ContentViewer
        :content="contentData"
        :image-base-path="imageBasePath"
      />
      <ContentViewerFooter
        :vault="params.vault"
        :current-item-path="params.pwd.join('/')"
        :items="store.navItems"
      />
    </ClientOnly>

    <div v-else>
      <v-alert
        text="Выберите интересующею вас тему."
        title="Ничего не выбрано."
        type="info"
        variant="tonal"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.content-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
}

.loader {
  margin-top: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
  flex-grow: 0;
  font-size: 4rem;
  color: var(--fg-accent-color);
}
</style>
