== Project Prompt ==
Generated: 2025-04-18T12:52:26.785Z
Source Directory: /home/evai/Documents/obsidian/obsidian-mark/client
Included Files: 32
Total Size: 55.14 KB
Format: structured
====================

=== Project File Structure ===
├── components
│ ├── modules
│ │ └── content-viewer
│ │ ├── models
│ │ │ └── index.ts
│ │ ├── store
│ │ │ ├── content-viewer.store.ts
│ │ │ └── index.ts
│ │ ├── ui
│ │ │ ├── content-header.vue
│ │ │ ├── content-viewer.vue
│ │ │ ├── index.ts
│ │ │ └── navigation-sidebar.vue
│ │ └── index.ts
│ └── shared
│ ├── markdown-content
│ │ ├── lib
│ │ │ ├── create-markdown-renderer.ts
│ │ │ └── index.ts
│ │ ├── ui
│ │ │ ├── index.ts
│ │ │ └── markdown-content.vue
│ │ └── index.ts
│ └── page-loader
│ ├── ui
│ │ ├── index.ts
│ │ └── page-loader.vue
│ └── index.ts
├── layouts
│ ├── default.vue
│ └── nav-content.vue
├── pages
│ ├── [vault]
│ │ ├── [...pwd].vue
│ │ └── index.vue
│ └── index.vue
├── scripts
│ ├── auto.ts
│ ├── cli.ts
│ └── migrate.ts
├── server
│ └── tsconfig.json
├── shared
│ └── composables
│ └── change-theme.ts
├── app.config.ts
├── app.vue
├── eslint.config.ts
├── nuxt.config.ts
├── package.json
└── tsconfig.json
============================

=== File List ===

- app.config.ts (1.73 KB)
- app.vue (0.60 KB)
- components/modules/content-viewer/index.ts (0.07 KB)
- components/modules/content-viewer/models/index.ts (0.25 KB)
- components/modules/content-viewer/store/content-viewer.store.ts (0.97 KB)
- components/modules/content-viewer/store/index.ts (0.04 KB)
- components/modules/content-viewer/ui/content-header.vue (3.28 KB)
- components/modules/content-viewer/ui/content-viewer.vue (0.56 KB)
- components/modules/content-viewer/ui/index.ts (0.23 KB)
- components/modules/content-viewer/ui/navigation-sidebar.vue (9.19 KB)
- components/shared/markdown-content/index.ts (0.02 KB)
- components/shared/markdown-content/lib/create-markdown-renderer.ts (1.94 KB)
- components/shared/markdown-content/lib/index.ts (0.04 KB)
- components/shared/markdown-content/ui/index.ts (0.08 KB)
- components/shared/markdown-content/ui/markdown-content.vue (7.55 KB)
- components/shared/page-loader/index.ts (0.02 KB)
- components/shared/page-loader/ui/index.ts (0.06 KB)
- components/shared/page-loader/ui/page-loader.vue (0.33 KB)
- eslint.config.ts (0.34 KB)
- layouts/default.vue (0.24 KB)
- layouts/nav-content.vue (1.98 KB)
- nuxt.config.ts (1.45 KB)
- package.json (1.68 KB)
- pages/[vault]/[...pwd].vue (1.77 KB)
- pages/[vault]/index.vue (0.38 KB)
- pages/index.vue (3.90 KB)
- scripts/auto.ts (1.30 KB)
- scripts/cli.ts (0.04 KB)
- scripts/migrate.ts (14.20 KB)
- server/tsconfig.json (0.05 KB)
- shared/composables/change-theme.ts (0.76 KB)
- # tsconfig.json (0.09 KB)

=== File Contents ===

--- File: app.config.ts ---

export default defineAppConfig({
titleTemplate: 'WanderingMark',
name: 'WanderingMark',
link: [
{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
{ rel: 'shortcut_icon', href: '/favicon.png' },
{ rel: 'apple-touch-icon', sizes: '180x180', href: '/logo.png' },
{ rel: 'icon', type: 'image/png', sizes: '32x32', href: '/logo.png' },
{ rel: 'icon', type: 'image/png', sizes: '16x16', href: '/logo.png' },
],
meta: [
{ name: 'viewport', content: 'viewport-fit=cover, initial-scale=1, maximum-scale=1, user-scalable=no' },
{ name: 'title', content: 'chinisik' },
{ hid: 'description', name: 'description', content: 'chinisik' },
{ property: 'og:title', content: 'WanderingMark' },
{ property: 'og:description', content: 'Место для возносения до уровня ТанСана! Познай мир чтобы уверено сказать - нихао ни женгуо рен ма!' },
{ property: 'twitter:title', content: 'WanderingMark' },
{ property: 'twitter:description', content: 'Место для возносения до уровня ТанСана! Познай мир чтобы уверено сказать - нихао ни женгуо рен ма!' },
{ property: 'twitter:image', content: 'https://wandering-mark.vercel.app/open-graph.png' },
{ property: 'og:url', content: 'https://wandering-mark.vercel.app' },
{ property: 'og:image', content: 'https://wandering-mark.vercel.app/open-graph.png' },
{ property: 'og:image:width', content: '400' },
{ property: 'og:image:height', content: '400' },
{ name: 'twitter:card', content: 'summary' },
{ name: 'og:locale', content: 'ru_RU' },
{ name: 'twitter:locale', content: 'ru' },
],
})

--- File: app.vue ---

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

--- File: components/modules/content-viewer/index.ts ---

export _ from './models'
export _ from './ui'
export \* from './store'

--- File: components/modules/content-viewer/models/index.ts ---

enum ContentNavItemType {
File = 'file',
Directory = 'directory',
}

interface ContentNavItem {
sysname: string
title: string
type: ContentNavItemType
children?: ContentNavItem[]
}

export { ContentNavItemType }
export type { ContentNavItem }

--- File: components/modules/content-viewer/store/content-viewer.store.ts ---

import { defineStore } from 'pinia'
import { useCookie } from '#app'

const COOKIE_BORDERLESS_VIEW = 'ui_borderlessViewEnabled'
const COOKIE_COLORED_FOLDERS = 'ui_coloredFoldersEnabled'
const COOKIE_SHOW_ICONS = 'ui_showIconsEnabled'

/\*\*

- Хранилище для управления настройками отображения контента и навигации.
- Настройки сохраняются в cookie.
  \*/
  export const useContentViewerStore = defineStore('contentViewer', () => {
  const borderlessViewEnabled = useCookie<boolean>(COOKIE_BORDERLESS_VIEW, {
  default: () => true,
  })

const coloredFoldersEnabled = useCookie<boolean>(COOKIE_COLORED_FOLDERS, {
default: () => false,
})

const showIconsEnabled = useCookie<boolean>(COOKIE_SHOW_ICONS, {
default: () => true,
})

return {
borderlessViewEnabled,
coloredFoldersEnabled,
showIconsEnabled,
}
})

export type ContentViewerStore = ReturnType<typeof useContentViewerStore>

--- File: components/modules/content-viewer/store/index.ts ---

export \* from './content-viewer.store'

--- File: components/modules/content-viewer/ui/content-header.vue ---

<script lang="ts" setup>
import type { VBreadcrumbs } from 'vuetify/components'
import { ThemesVariant, useChangeTheme } from '~/shared/composables/change-theme'
import { useContentViewerStore } from '../store'

type VBreadcrumbsItems = NonNullable<InstanceType<typeof VBreadcrumbs>['$props']['items']>

const route = useRoute()
const { setTheme, theme } = useChangeTheme()
const contentViewerStore = useContentViewerStore()

const controlledTheme = computed({
  get: () => theme.value,
  set: (value: ThemesVariant) => setTheme(value),
})

const themePreset = computed(() => {
  switch (controlledTheme.value) {
    case ThemesVariant.Light:
      return {
        current: ThemesVariant.Light,
        next: ThemesVariant.Dark,
        icon: 'mdi-weather-sunny',
      }
    case ThemesVariant.Dark:
      return {
        current: ThemesVariant.Dark,
        next: ThemesVariant.Rainy,
        icon: 'mdi-weather-night',
      }
    case ThemesVariant.Rainy:
      return {
        current: ThemesVariant.Rainy,
        next: ThemesVariant.Light,
        icon: 'mdi-weather-pouring',
      }
    default:
      return {
        current: ThemesVariant.Light,
        next: ThemesVariant.Dark,
        icon: 'mdi-weather-sunny',
      }
  }
})

const breadcrumbItems = computed<VBreadcrumbsItems>(() => {
  const vault = route.params.vault as string
  const pwd = (Array.isArray(route.params.pwd) ? route.params.pwd : [route.params.pwd].filter(Boolean)) as string[]

  const items = [] as VBreadcrumbsItems

  let currentPath = `/${vault}`
  pwd.forEach((segment, index) => {
    currentPath += `/${segment}`
    items.push({
      title: segment,
      to: currentPath,
      disabled: index === pwd.length - 1,
    })
  })

  return items
})
</script>

<template>
  <div class="content-header">
    <VBreadcrumbs :items="breadcrumbItems" density="compact" class="content-breadcrumbs">
      <template #divider>
        <v-icon icon="mdi-chevron-right" />
      </template>
    </VBreadcrumbs>
    <VMenu location="bottom end" persistent :close-on-content-click="false">
      <template #activator="{ props }">
        <VBtn
          style="font-size: 0.8rem;"
          v-bind="props"
           icon="mdi-tune-variant"
           variant="text"
            density="compact"
            title="Настройки отображения"
        />
      </template>
      <VList density="compact">
        <VListItem>
          <VCheckbox
          v-model="contentViewerStore.borderlessViewEnabled"
          label="Отображение без границ"
           hide-details density="compact" />
        </VListItem>
      </VList>
    </VMenu>
    <VBtn
      style="font-size: 0.8rem; margin-left: 12px;"
      :icon="themePreset.icon"
      variant="text"
      density="compact"
      title="Визуальное оформление"
      @click="controlledTheme = themePreset.next"
    />
  </div>
</template>

<style lang="scss" scoped>
.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px 0px 10px;
  border-bottom: 1px solid var(--border-secondary-color);
  flex-shrink: 0;
  background-color: var(--bg-primary-color);
  min-height: 46px;
}
.content-breadcrumbs {
  padding: 8px 0;
  flex-grow: 1;
  :deep(.v-breadcrumbs-item) {
    font-size: 0.8rem;
  }
}
</style>

--- File: components/modules/content-viewer/ui/content-viewer.vue ---

<script setup lang="ts">
import { MarkdownContent } from '~/components/shared/markdown-content'

interface Props {
  content: string
  imageBasePath?: string
}
defineProps<Props>()
</script>

<template>
  <div class="content-viewer">
    <MarkdownContent
      class="markdown-body-wrapper"
      :content="content"
      :image-base-path="imageBasePath"
    />
  </div>
</template>

<style lang="scss">
.content-viewer {
  margin: 0 auto;
  width: 1200px;
  max-width: 100%;
}

.markdown-body-wrapper {
  padding: 20px;
  background-color: var(--bg-primary-color);
}
</style>

--- File: components/modules/content-viewer/ui/index.ts ---

import ContentViewerHeader from './content-header.vue'
import ContentViewer from './content-viewer.vue'
import ContentViewerNavigation from './navigation-sidebar.vue'

export { ContentViewer, ContentViewerHeader, ContentViewerNavigation }

--- File: components/modules/content-viewer/ui/navigation-sidebar.vue ---

<script lang="ts" setup>
import type { ContentNavItem } from '~/components/modules/content-viewer'
import { ContentNavItemType } from '~/components/modules/content-viewer'
import { useContentViewerStore } from '../store'

interface Props {
  items: ContentNavItem[] | null
}

const props = defineProps<Props>()

interface NavTreeItem extends ContentNavItem {
  path: string[]
}

interface RouteParams {
  vault: string
}

const router = useRouter()
const contentViewerStore = useContentViewerStore()

const params = computed(() => {
  const routeParams = router.currentRoute.value.params as any
  return { vault: routeParams.vault } as RouteParams
})

const sidebarWidth = ref(300)
const resizing = ref(false)
const searchQuery = ref('')

async function selectItem(item: ContentNavItem, pathSegments: string[]) {
  if (item.type === ContentNavItemType.File) {
    await navigateTo(`/${params.value.vault}/${pathSegments.join('/')}`)
  }
}

function startResize(e: MouseEvent) {
  e.preventDefault()
  resizing.value = true
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', stopResize)
}

function handleMouseMove(e: MouseEvent) {
  if (!resizing.value)
    return
  sidebarWidth.value = Math.max(200, Math.min(500, e.clientX))
}

function stopResize() {
  resizing.value = false
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', stopResize)
}

function filter(value: string, search: string) {
  // eslint-disable-next-line unicorn/prefer-includes
  return value.toLowerCase().indexOf(search.toLowerCase()) > -1
}

function renderNavTree(items: ContentNavItem[] | undefined, parentPath: string[] = []): NavTreeItem[] {
  if (!items?.length)
    return []

  return items.map((item) => {
    const currentPath = [...parentPath, item.sysname]
    const isDirectory = item.type === ContentNavItemType.Directory

    if (item.sysname === '_')
      return null

    return {
      ...item,
      path: currentPath,
      children: isDirectory ? renderNavTree(item.children, currentPath) : undefined,
    }
  }).filter(Boolean) as NavTreeItem[]
}

const navTree = computed(() => renderNavTree(props.items ?? []))
</script>

<template>
  <div class="navigation-sidebar-wrapper">
    <div
      class="navigation-sidebar"
      :style="{ width: `${sidebarWidth}px` }"
      :class="{ 'show-icons': contentViewerStore.showIconsEnabled }"
    >
      <div class="sidebar-header">
        <VBtn
          icon="mdi-arrow-left"
          variant="text"
          density="compact"
          title="Вернуться к выбору хранилища"
          style="font-size: 0.8rem; height: 30px;"
          @click="navigateTo('/')"
        />
        <VTextField
          v-model="searchQuery"
          placeholder="Поиск..."
          density="compact"
          variant="solo-filled"
          hide-details
          rounded
          flat
          bg-color="var(--bg-secondary-color)"
          class="search-input"
        />
        <VMenu location="bottom end" :close-on-content-click="false">
          <template #activator="{ props: propsMenu }">
            <VBtn
              style="font-size: 0.8rem;"
              v-bind="propsMenu"
              icon="mdi-cog"
              variant="text"
              density="compact"
              title="Настройки сайдбара"
            />
          </template>
          <VList density="compact">
            <VListItem>
              <VCheckbox v-model="contentViewerStore.coloredFoldersEnabled" label="Цветные папки" hide-details density="compact" />
            </VListItem>
            <VListItem>
              <VCheckbox v-model="contentViewerStore.showIconsEnabled" label="Отображать иконки" hide-details density="compact" />
            </VListItem>
          </VList>
        </VMenu>
      </div>

      <div class="sidebar-content">
        <v-treeview
          :items="navTree"
          item-value="sysname"
          item-title="title"
          :lines="false"
          density="compact"
          :activatable="false"
          open-on-click
          :return-object="false"
          expand-icon="mdi-chevron-down"
          collapse-icon="mdi-chevron-up"
          select-strategy="classic"
          class="compact-treeview"
          :class="{ colored: contentViewerStore.coloredFoldersEnabled }"
          bg-color="transparent"
          fluid
          :custom-filter="filter"
          :search="searchQuery"
        >
          <template v-if="contentViewerStore.showIconsEnabled" #prepend="{ item, isOpen }">
            <v-icon v-if="item.type === ContentNavItemType.Directory" :icon="isOpen ? 'mdi-folder-open' : 'mdi-folder'" />
            <v-icon v-else icon="mdi-language-markdown" />
          </template>
          <template #title="{ item }">
            <span
              class="tree-item-title"
              @click.stop="selectItem(item, item.path)"
            >{{ item.title }}</span>
          </template>
        </v-treeview>
      </div>
    </div>
    <div
      class="resizer"
      :class="{ resizing }"
      @mousedown="startResize"
    />

  </div>
</template>

<style lang="scss" scoped>
.navigation-sidebar-wrapper {
  display: flex;
}

.navigation-sidebar {
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-right: 1px solid var(--border-secondary-color);
  background-color: var(--bg-secondary-color);
  z-index: 10;
}
.sidebar-content {
  padding: 4px;
  overflow-y: auto;
  flex-grow: 1;
}
.sidebar-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 4px;
  gap: 4px;
}
.resizer {
  width: 5px;
  height: 100%;
  background-color: var(--bg-tertiary-color);
  cursor: col-resize;
  transition: background-color 0.2s;

  &:hover,
  &.resizing {
    background-color: var(--bg-accent-color);
  }
}
.compact-treeview {
  padding: 0;

  .tree-item-title {
    font-size: 0.8rem;
    letter-spacing: 0;
  }

  &.colored {
    :deep() {
      > .v-list-group:nth-of-type(6n + 1) {
        --folder-color: #1976d2e8;
        background-color: #1976d207;
        border: 1px solid #e0e0e0;
        padding: 4px;
        margin: 4px;
      }
      > .v-list-group:nth-of-type(6n + 2) {
        --folder-color: #d32f2f;
        background-color: #d32f2f07;
        border: 1px solid #e0e0e0;
        padding: 4px;
        margin: 4px;
        .mdi-folder {
          display: none;
        }
      }
      > .v-list-group:nth-of-type(6n + 3) {
        --folder-color: #388e3ce3;
        background-color: #388e3c07;
        border: 1px solid #e0e0e0;
        padding: 4px;
        margin: 4px;
      }
      > .v-list-group:nth-of-type(6n + 4) {
        --folder-color: #fbc12dc5;
        background-color: #fbc02d07;
        border: 1px solid #e0e0e0;
        padding: 4px;
        margin: 4px;
      }
      > .v-list-group:nth-of-type(6n + 5) {
        --folder-color: #7b1fa2dc;
        background-color: #7b1fa207;
        border: 1px solid #e0e0e0;
        padding: 4px;
        margin: 4px;
      }
      > .v-list-group:nth-of-type(6n + 6) {
        --folder-color: #5d4037d7;
        background-color: #5d403707;
        border: 1px solid #e0e0e0;
        padding: 4px;
        margin: 4px;
      }

      .v-list-group .v-list-item .tree-item-title {
        color: var(--folder-color, inherit);
      }
      .v-list-group .v-list-item__prepend > .mdi {
        color: var(--folder-color, inherit);
      }
      .v-list-group .v-list-item--active .tree-item-title {
        color: var(--folder-color, inherit) !important;
      }
      .v-list-group .v-list-item--active .v-list-item__prepend > .mdi {
        color: var(--folder-color, inherit) !important;
      }
    }
  }

  :deep() {
    --indent-padding: 0px !important;
    --v-list-item-prepend-size: 16px;
    --v-list-item-prepend-margin-end: 8px;
    > .v-list-group {
      .v-list-item {
        padding: 0;
      }
    }

    .v-list-item {
      min-height: 30px;
      padding-top: 2px;
      padding-bottom: 2px;
      padding-inline-start: 4px;
    }
    .v-list-group__items .v-list-item {
      .v-treeview-item__toggle {
        font-size: 0.9rem;
        width: 20px;
        height: 20px;
        margin-right: 2px;
      }
    }
    .v-treeview-item--active {
      background-color: var(--bg-tertiary-color);
      border-radius: 4px;
      padding-inline-start: 4px !important;
    }
    .v-icon {
      font-size: 1rem;
    }
    .v-list-group {
      color: inherit;
      position: relative;
    }
    .v-list-group.v-list-group--open {
      color: inherit;
      overflow: hidden;
      &::before {
        position: absolute;
        content: '';
        border-left: 1px solid var(--folder-color, var(--border-primary-color));
        top: 0;
        margin-left: calc(var(--indent-padding) + 13px) !important;
        margin-top: 30px;
        height: calc(100% - 35px);
        opacity: 0.5;
      }
    }

    .v-list-item__content {
      color: inherit;
      display: flex;
      align-items: center;
    }
    .navigation-sidebar:not(.show-icons) .v-list-group__items .v-list-item {
      padding-inline-start: calc(
        4px + var(--v-list-item-prepend-size) + var(--v-list-item-prepend-margin-end)
      ) !important;
    }
  }
}
</style>

--- File: components/shared/markdown-content/index.ts ---

export \* from './ui'

--- File: components/shared/markdown-content/lib/create-markdown-renderer.ts ---

import MarkdownIt from 'markdown-it'
import MarkdownItAttrs from 'markdown-it-attrs'
import MarkdownItCollapsible from 'markdown-it-collapsible'
import MarkdownItContainer from 'markdown-it-container'
// @ts-expect-error no dts
import MarkdownItObsidianCallouts from 'markdown-it-obsidian-callouts'

interface WikiImageOptions {
baseURL?: string
defaultAlt?: string
}

export function markdownItWikiImages(md: MarkdownIt, options: WikiImageOptions = {}) {
const {
baseURL = '/personal/img/',
defaultAlt = '',
} = options

md.inline.ruler.before('emphasis', 'wiki_image', (state, silent) => {
const pos = state.pos
const max = state.posMax
const ch = state.src.charCodeAt(pos)

    if (ch !== 0x21/* ! */)
      return false
    if (state.src.charCodeAt(pos + 1) !== 0x5B/* [ */)
      return false
    if (state.src.charCodeAt(pos + 2) !== 0x5B/* [ */)
      return false

    let end = pos + 3
    while (end < max && state.src.charCodeAt(end) !== 0x5D/* ] */) {
      end++
    }
    if (end >= max)
      return false
    if (state.src.charCodeAt(end + 1) !== 0x5D/* ] */)
      return false

    if (silent)
      return true

    const filename = state.src.slice(pos + 3, end).trim()
    const imgSrc = `${baseURL}${filename}`

    const token = state.push('html_inline', '', 0)
    token.content = `<img src="${imgSrc}" alt="${defaultAlt}" />`

    state.pos = end + 2

    return true

})
}

interface CreateMarkdownRendererParams {
imageBasePath?: string
}

export function createMarkdownRenderer(params: CreateMarkdownRendererParams) {
const { imageBasePath = '/personal/img/' } = params

const md = new MarkdownIt({
html: true,
breaks: true,
linkify: true,
typographer: true,
})

md
.use(markdownItWikiImages, {
baseURL: imageBasePath,
defaultAlt: '',
})
.use(MarkdownItObsidianCallouts)
.use(MarkdownItAttrs)
.use(MarkdownItCollapsible)
.use(MarkdownItContainer)

return md
}

--- File: components/shared/markdown-content/lib/index.ts ---

export \* from './create-markdown-renderer'

--- File: components/shared/markdown-content/ui/index.ts ---

import MarkdownContent from './markdown-content.vue'

export { MarkdownContent }

--- File: components/shared/markdown-content/ui/markdown-content.vue ---

<script setup lang="ts">
// import ImageViewer from '@luohc92/vue3-image-viewer'
import { nextTick, onMounted, ref, watch } from 'vue'
import { createMarkdownRenderer } from '../lib'
// import '@luohc92/vue3-image-viewer/dist/style.css'

interface Props {
  content: string
  imageBasePath?: string
}

const props = defineProps<Props>()
const renderedContent = ref<string>('')
const md = createMarkdownRenderer({ imageBasePath: props.imageBasePath })

const currentImages = ref<string[]>([])

watch(
  () => props.content,
  (newContent) => {
    renderedContent.value = md.render(newContent || '')
  },
  { immediate: true },
)

function openImageViewer() {
  // document.documentElement.style.overflow = 'hidden'
  // ImageViewer({
  //   images: currentImages.value,
  //   showThumbnail: true,
  //   showDownload: true,
  //   handlePosition: 'bottom',
  //   onClose: () => {
  //     document.documentElement.style.overflow = 'auto'
  //   },
  //   maskBgColor: 'rgba(0,0,0,0.7)',
  // })
}

onMounted(() => {
  nextTick(() => {
    const callouts = document.querySelectorAll('.callout')

    callouts.forEach((callout) => {
      const imagesInCallout = callout.querySelectorAll<HTMLImageElement>('.callout-content img')

      if (imagesInCallout.length > 0) {
        const imageUrls: string[] = Array.from(imagesInCallout).map(img => img.src)

        Array.from(imagesInCallout).forEach((img) => {
          img.addEventListener('click', (event) => {
            event.stopPropagation()
            const clickedImageUrl = (img as HTMLImageElement).src

            const reorderedImages = [
              clickedImageUrl,
              ...imageUrls.filter(url => url !== clickedImageUrl),
            ]

            currentImages.value = reorderedImages
            openImageViewer()
          })
          img.style.cursor = 'pointer'
        })
      }
    })
  })
})
</script>

<template>
  <div class="markdown-body" v-html="renderedContent" />
</template>

<style lang="scss">
.markdown-body {
  padding: 0;
  background-color: transparent;
  color: var(--fg-primary-color);

  em {
    color: var(--fg-accent-color);
  }

  ul {
    list-style-type: disc;

    ::marker {
      color: var(--bg-overlay-secondary-color);
    }
  }

  pre {
    background: var(--bg-tertiary-color);
    color: var(--fg-primary-color);
    font-style: italic;
    padding-left: 16px;
    margin-top: 32px;
    margin-bottom: 8px;
    opacity: 0.5;
    border-radius: 4px;

    code {
      white-space: wrap;
      word-wrap: break-word;
      line-height: normal;
      display: flex;
      padding: 8px 0;
    }
  }

  blockquote {
    border-left: 2px solid var(--border-accent-color);

    ol {
      margin-left: 32px;
      color: var(--fg-secondary-color);
      font-size: 0.9rem;
    }
  }

  details {
    p {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(370px, 2fr));
      gap: 10px;

      br {
        display: none;
      }

      img {
        object-fit: cover;
        max-width: 600px;
        min-height: 200px;
        height: 100%;
        width: 100%;
        border-radius: 8px;
        overflow: hidden;
        cursor: pointer;
      }

      @include mobile() {
        display: flex;
        flex-wrap: wrap;
      }
    }
  }
}

:root {
  --line-height-tight: 1;
  --callout-border-width: 0px;
  --callout-border-opacity: 0.25;
  --callout-padding: 6px 6px 6px 12px;
  --callout-radius: 4px;
  --callout-title-color: inherit;
  --callout-title-padding: 0;
  --callout-title-size: inherit;
  --callout-title-weight: 500;
  --callout-content-padding: 0;
  --callout-content-background: transparent;
  --callout-blend-mode: var(darken);
  --callout-info: 8, 109, 221;
  --callout-todo: 8, 109, 221;
  --callout-default: 8, 109, 221;
  --callout-bug: 233, 49, 71;
  --callout-error: 233, 49, 71;
  --callout-fail: 233, 49, 71;
  --callout-success: 8, 185, 78;
  --callout-example: 120, 82, 238;
  --callout-important: 0, 191, 188;
  --callout-summary: 0, 191, 188;
  --callout-tip: 0, 191, 188;
  --callout-question: 236, 117, 0;
  --callout-warning: 236, 117, 0;
  --callout-quote: 158, 158, 158;
  --callout-collapse-icon: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMiIgZD0ibTkgMThsNi02bC02LTYiLz48L3N2Zz4=');
}

.theme-light {
  --callout-blend-mode: var(darken);
}

.theme-dark {
  --callout-blend-mode: var(lighten);
}

html[data-theme='light'] #app {
  --callout-blend-mode: var(darken);
}

html[data-theme='dark'] #app {
  --callout-blend-mode: var(lighten);
}

/**
 * Obsidian callout about
 *
 * The following style is exactly the same as in obsidian
 */
.callout {
  overflow: hidden;
  border-style: solid;
  border-color: rgba(var(--callout-color), var(--callout-border-opacity));
  border-width: var(--callout-border-width);
  border-radius: var(--callout-radius);
  margin-bottom: 16px;
  mix-blend-mode: var(--callout-blend-mode);
  background-color: rgba(var(--callout-color), 0.1);
  padding: var(--callout-padding);
  --callout-color: var(--callout-default);
  --callout-icon: lucide-pencil;
}

.callout .callout-title {
  padding: var(--callout-title-padding);
  display: flex;
  justify-content: space-between;
  gap: 4px;
  font-size: var(--callout-title-size);
  color: rgb(var(--callout-color));
  line-height: var(--line-height-tight);
  align-items: center;
}

details.callout .callout-title {
  margin: 0;
  cursor: pointer;
  font-size: 0.85rem;
}

.callout .callout-title .callout-title-icon {
  display: none;
}

.callout .callout-title .callout-title-inner {
  --font-weight: var(--callout-title-weight);
  font-weight: var(--font-weight);
  color: var(--callout-title-color);
}

.callout .callout-title .callout-fold {
  background-color: rgb(var(--callout-color));
  mask-image: var(--callout-collapse-icon);
  mask-size: 100%;
  -webkit-mask-image: var(--callout-collapse-icon);
  -webkit-mask-size: 100%;
  height: 24px;
  width: 24px;
  transition: 100ms ease-in-out;
}

details[close].callout > .callout-title > .callout-fold {
  transform: rotate(-90deg);
}

details[open].callout > .callout-title > .callout-fold {
  transform: rotate(90deg);
}

.callout .callout-content {
  overflow-x: auto;
  padding: var(--callout-content-padding);
  background-color: var(--callout-content-background);
}

.callout[data-callout='todo'] {
  --callout-color: var(--callout-todo);
  --callout-icon: lucide-check-circle-2;
}

.callout[data-callout='success'],
.callout[data-callout='check'],
.callout[data-callout='done'] {
  --callout-color: var(--callout-success);
  --callout-icon: lucide-check;
}

.callout[data-callout='warning'],
.callout[data-callout='caution'],
.callout[data-callout='attention'] {
  --callout-color: var(--callout-warning);
  --callout-icon: lucide-alert-triangle;
}

.callout[data-callout='danger'],
.callout[data-callout='error'] {
  --callout-color: var(--callout-error);
  --callout-icon: lucide-zap;
}

.callout[data-callout='tip'],
.callout[data-callout='hint'] {
  --callout-color: var(--callout-tip);
  --callout-icon: lucide-flame;
}

.callout[data-callout='example'] {
  --callout-color: var(--callout-example);
  --callout-icon: lucide-list;
}

.callout[data-callout='abstract'],
.callout[data-callout='summary'],
.callout[data-callout='tldr'] {
  --callout-color: var(--callout-summary);
  --callout-icon: lucide-clipboard-list;
}

.callout[data-callout='quote'],
.callout[data-callout='cite'] {
  --callout-color: var(--callout-quote);
  --callout-icon: quote-glyph;
}
</style>

--- File: components/shared/page-loader/index.ts ---

export \* from './ui'

--- File: components/shared/page-loader/ui/index.ts ---

import PageLoader from './page-loader.vue'

export { PageLoader }

--- File: components/shared/page-loader/ui/page-loader.vue ---

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

--- File: eslint.config.ts ---

import antfu from '@antfu/eslint-config'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
antfu({
formatters: true,
ignores: [
'**/.nuxt/**',
'**/.output/**',
'**/.vitestcache/**',
'**/e2e-**/**',
'**/content/**',
'**/public/**',
'**/node_modules/**',
],
}),
)

--- File: layouts/default.vue ---

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
  height: 100%;
}
</style>

--- File: layouts/nav-content.vue ---

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

--- File: nuxt.config.ts ---

import process from 'node:process'

export default defineNuxtConfig({
ssr: true,

imports: {
autoImport: true,
dirs: [
'./shared/composables',
],
},

components: {
//
},

nitro: {
esbuild: {
options: {
target: 'esnext',
},
},
},

devServer: {
port: 5173,
},

modules: [
'@nuxt/eslint',
'@nuxt/fonts',
'@nuxtjs/color-mode',
'vuetify-nuxt-module',
'@pinia/nuxt',
],

colorMode: {
preference: 'light',
fallback: 'light',
hid: 'nuxt-color-mode-script',
globalName: '**NUXT_COLOR_MODE**',
componentName: 'ColorScheme',
classPrefix: '',
classSuffix: '-mode',
storageKey: 'nuxt-color-mode',
dataValue: 'theme',
},

fonts: {
priority: ['google', 'local'],
providers: {
fontshare: false,
adobe: false,
bunny: false,
fontsource: false,
googleicons: false,
},
devtools: true,
},

eslint: {
config: {
standalone: false,
},
},

css: [
'/assets/scss/global.scss',
'/assets/scss/normalize.scss',
],

runtimeConfig: {
public: {
staticBaseUrl: 'http://localhost:5173',
},
},

vite: {
css: {
preprocessorOptions: {
scss: {
additionalData: `             @import '~/assets/scss/_setup.scss';
          `,
api: 'modern-compiler',
},
},
},
},

devtools: { enabled: true },
compatibilityDate: '2024-11-01',
})

--- File: package.json ---

{
"name": "nuxt-app",
"type": "module",
"private": true,
"scripts": {
"dev": "nuxt dev",
"build": "nuxt build && bun run md-migrate",
"start": "nuxt start",
"preview": "nuxt preview",
"generate": "nuxt generate",
"prepare": "nuxt prepare",
"md-migrate": "bun run ./scripts/auto.ts",
"analyze": "nuxt analyze",
"--------------------------------------------------------------------------------": "",
"lint": "eslint .",
"lint:fix": "eslint . --fix",
"typecheck": "vue-tsc --noEmit",
"----------------------------------------------------------------------------------": "",
"postinstall": "simple-git-hooks && nuxt prepare"
},
"dependencies": {
"@luohc92/vue3-image-viewer": "1.0.4",
"markdown-it": "14.1.0",
"markdown-it-attrs": "4.3.1",
"markdown-it-collapsible": "2.0.2",
"markdown-it-container": "4.0.0",
"markdown-it-obsidian-callouts": "0.3.2"
},
"devDependencies": {
"@antfu/eslint-config": "4.12.0",
"@mdi/font": "7.4.47",
"@nuxt/eslint": "1.3.0",
"@pinia/nuxt": "0.9.0",
"pinia": "2.3.0",
"@nuxt/fonts": "0.11.1",
"@nuxtjs/color-mode": "3.5.2",
"@types/markdown-it": "14.1.2",
"@types/markdown-it-attrs": "4.1.3",
"@types/markdown-it-container": "2.0.10",
"eslint": "9.24.0",
"eslint-plugin-format": "1.0.1",
"nuxt": "3.13.2",
"sass": "1.77.8",
"simple-git-hooks": "2.12.1",
"vue-tsc": "2.2.8",
"vuetify": "3.8.2",
"vuetify-nuxt-module": "0.18.6"
},
"simple-git-hooks": {
"pre-commit": "bunx lint-staged && bun run typecheck",
"post-commit": "git status",
"post-merge": "bun i"
},
"lint-staged": {
"\*": "eslint --fix"
}
}

--- File: pages/[vault]/[...pwd].vue ---

<script setup lang="ts">
import { ContentViewer } from '~/components/modules/content-viewer'

interface RouteParams {
  pwd: string[]
  vault: string
}

const route = useRoute()

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
      <Icon name="line-md:loading-loop" />
    </div>

    <ContentViewer
      v-else-if="contentData"
      :content="contentData"
    />

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
  height: 100%;
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

--- File: pages/[vault]/index.vue ---

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

--- File: pages/index.vue ---

<script setup lang="ts">
interface NavItem {
  sysname: string
  title: string
  description: string
  icon: string
}

const { staticBaseUrl } = useRuntimeConfig().public

const { data: navData } = await useAsyncData<NavItem[]>(`nav-root`, async () => {
  return await $fetch<NavItem[]>(
    `${staticBaseUrl}/content/nav.json`,
    { method: 'get', responseType: 'json' },
  )
})

const hoveredItem = ref<string | null>(null)

function setHoveredItem(sysname: string | null) {
  hoveredItem.value = sysname
}

async function handleSelectItem(item: NavItem) {
  await navigateTo(`/${item.sysname}`)
}
</script>

<template>
  <div class="gradient-background">
    <v-container class="vault-container py-12">
      <v-row justify="center">
        <v-col cols="12" class="text-center">
          <h1 class="vault-title text-white text-h2 font-weight-bold">
            Доступные хранилища
          </h1>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          v-for="item in navData"
          :key="item.sysname"
          cols="12" sm="6" md="4" lg="4"
        >
          <v-card
            class="vault-card"
            :class="{ 'vault-card--hovered': hoveredItem === item.sysname }"
            elevation="4"
            rounded="lg"
            @mouseenter="setHoveredItem(item.sysname)"
            @mouseleave="setHoveredItem(null)"
            @click="handleSelectItem(item)"
          >
            <div class="vault-card-accent" />

            <v-card-item>
              <v-img
                class="vault-card__icon mb-4"
                width="100"
                height="100"
                :src="item.icon"
              />

              <v-card-title class="vault-card__title text-h5 font-weight-bold">
                {{ item.title }}
              </v-card-title>

              <v-card-text class="vault-card__description text-body-1 pt-2 pb-0">
                {{ item.description }}
              </v-card-text>
            </v-card-item>

            <v-card-actions class="justify-end vault-card__actions">
              <v-btn
                variant="text"
                color="primary"
                icon
                class="vault-card__arrow"
              >
                <v-icon icon="mdi-arrow-right" />
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

  </div>
</template>

<style scoped lang="scss">
.gradient-background {
  background: linear-gradient(135deg, #535e85 0%, #76569c 100%);
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
}

.vault-container {
  position: relative;
  z-index: 1;
  max-width: 1400px;
}

.vault-title {
  margin-bottom: 2rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.vault-card {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  height: 100%;
  background-color: rgba(236, 236, 236, 0.9) !important;
  cursor: pointer;

  &-accent {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 6px;
    background: linear-gradient(90deg, #6e8efb, #a777e3);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  &--hovered {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15) !important;

    .vault-card-accent {
      transform: scaleX(1);
    }

    .vault-card__arrow {
      transform: translateX(0);
      opacity: 1;
    }
  }

  &__title {
    color: #333;
    margin-top: 0.5rem;
  }

  &__description {
    color: #666;
    line-height: 1.5;
  }

  &__arrow {
    transform: translateX(20px);
    opacity: 0;
    transition: all 0.3s ease;
  }

  &__actions {
    padding-top: 0;
  }
}

@media (max-width: 600px) {
  .vault-title {
    font-size: 1.8rem !important;
  }

  .vault-card--hovered {
    transform: none;
  }

  .vault-card__arrow {
    opacity: 1;
    transform: none;
  }
}
</style>

--- File: scripts/auto.ts ---

import fs from 'node:fs/promises'
import path from 'node:path'
import { main } from './migrate'

const sourcePath = '../marks'
const exportPath = './public/content'

const navigationStructure = [
{
sysname: 'TypeScript',
title: 'TypeScript',
description: 'Стрероидный брат JavaScript со строгими типами для безопасной и эффективной разработки.',
icon: '/images/ts.png',
},
// {
// "sysname": "unreal-engine",
// "title": "Unreal Engine 5",
// "description": "Познай мощь реального времени для 3D-графики и погрязни в его бескрайности.",
// "icon": "/images/ue.png"
// },
{
sysname: 'Cha',
title: 'Травушка муравушка',
description: 'Всё о китайском чае: от истории и видов до секретов заваривания и чайной церемонии.',
icon: '/images/tea.png',
},
]

async function auto() {
await main(sourcePath.concat('/Frontend/TypeScript'), exportPath.concat('/TypeScript'))
await main(sourcePath.concat('/Personal Note/茶 Cha'), exportPath.concat('/Cha'))

await fs.writeFile(path.resolve(exportPath, 'nav.json'), JSON.stringify(navigationStructure, null, 2))
}

auto()

--- File: scripts/cli.ts ---

import { main } from './migrate'

main()

--- File: scripts/migrate.ts ---

import type { Dirent } from 'node:fs' // Импортируем тип Dirent для readdir
import fs from 'node:fs/promises' // Используем промисы из fs
import path from 'node:path'

// --- Типы данных ---
enum ContentNavItemType {
File = 'file',
Directory = 'directory',
}

interface ContentNavItem {
sysname: string
title: string
type: ContentNavItemType
children?: ContentNavItem[] // Дети могут быть только у директорий
}

// --- Константы ---
const NAV*FILENAME: string = 'nav.json'
const IMAGE_DEST_FOLDER: string = '*' // Папка для изображений в корне назначения

// --- Регулярные выражения ---
const FRONT_MATTER_REGEX: RegExp = /^---\s*([\s\S]*?)\s*---/
const SYSNAME_REGEX: RegExp = /^\s*sysname:\s*"?([^"\s]+)"?\s*$/m

// --- Расширения изображений (можно дополнить) ---
const IMAGE_EXTENSIONS: Set<string> = new Set([
'.png',
'.jpg',
'.jpeg',
'.gif',
'.svg',
'.webp',
'.bmp',
'.tiff',
])

/\*\*

- Проверяет, является ли расширение файла расширением изображения.
- @param extension - Расширение файла (например, '.png').
- @returns true, если это изображение, иначе false.
  \*/
  function isImageExtension(extension: string): boolean {
  return IMAGE_EXTENSIONS.has(extension.toLowerCase())
  }

/\*\*

- Извлекает sysname из YAML front matter файла.
- @param filePath - Путь к файлу.
- @returns Промис, который разрешается значением sysname или null, если его нет.
  \*/
  async function extractSysnameFromFrontMatter(filePath: string): Promise<string | null> {
  let fileHandle: fs.FileHandle | undefined
  try {
  // Читаем только начало файла, чтобы не загружать большие файлы целиком
  fileHandle = await fs.open(filePath, 'r')
  const buffer = Buffer.alloc(1024) // Читаем первый килобайт
  const { bytesRead } = await fileHandle.read(buffer, 0, 1024, 0)

      if (bytesRead === 0) {
        return null
      }

      const contentStart: string = buffer.toString('utf8', 0, bytesRead)
      const frontMatterMatch = contentStart.match(FRONT_MATTER_REGEX)

      if (frontMatterMatch?.[1]) { // Используем optional chaining
        const yamlContent = frontMatterMatch[1]
        const sysnameMatch = yamlContent.match(SYSNAME_REGEX)
        if (sysnameMatch?.[1]) { // Используем optional chaining
          return sysnameMatch[1] // Возвращаем найденное значение sysname
        }
      }

  }
  catch (error: any) { // Явно указываем тип ошибки (можно использовать unknown и проверять)
  // Игнорируем ошибки чтения файла (например, нет прав), front matter не будет извлечен
  console.warn(`Не удалось прочитать front matter из файла ${filePath}: ${error.message}`)
  }
  finally {
  // Гарантированно закрываем файл, если он был открыт
  await fileHandle?.close()
  }
  return null // Front matter или sysname не найдены
  }

/\*\*

- Рекурсивно сканирует директорию, строит дерево JSON и копирует/перемещает файлы/папки.
- @param sourceCurrentPath - Текущий путь сканирования в исходной директории.
- @param destBasePath - Базовый путь для экспорта (корень папки назначения).
- @param relativePath - Относительный путь от корня исходной директории (используется для построения пути назначения).
- @param imageDestPath - Абсолютный путь к папке для изображений (`destBasePath` + `IMAGE_DEST_FOLDER`).
- @returns Промис, разрешающийся массивом ContentNavItem для текущего уровня.
  \*/
  async function processDirectoryRecursive(
  sourceCurrentPath: string,
  destBasePath: string,
  relativePath: string,
  imageDestPath: string, // Передаем путь к папке с изображениями
  ): Promise<ContentNavItem[]> {
  const childrenNavItems: ContentNavItem[] = []
  try {
  const entries: Dirent[] = await fs.readdir(sourceCurrentPath, { withFileTypes: true })

      for (const entry of entries) {
        const entryName = entry.name
        const sourceFullPath = path.join(sourceCurrentPath, entryName)
        const extension = path.extname(entryName)

        // --- Правила игнорирования ---
        if (entryName.startsWith('.'))
          continue // Скрытые файлы/папки
        if (entry.isDirectory() && entryName === '-')
          continue // Папка '-' (если это специальное правило)

        // --- Обработка изображений ---
        if (entry.isFile() && isImageExtension(extension)) {
          const targetImagePath = path.join(imageDestPath, entryName)
          try {
            await fs.copyFile(sourceFullPath, targetImagePath)
            console.log(`🖼️ Изображение скопировано: ${entryName} -> ${IMAGE_DEST_FOLDER}/`)
          }
          catch (copyError: any) {
            console.error(`Ошибка копирования изображения ${entryName}:`, copyError.message)
          }
          continue // Переходим к следующему элементу, не добавляем в nav.json
        }

        // --- Определение типа и базовых имен ---
        const type = entry.isDirectory() ? ContentNavItemType.Directory : ContentNavItemType.File
        // Title - имя файла без расширения
        const title = path.basename(entryName, extension)

        let sysname = entryName // По умолчанию sysname = имя файла/папки
        let targetName = entryName // Имя файла/папки в директории назначения по умолчанию
        let currentChildren: ContentNavItem[] | undefined

        // --- Обработка файлов (извлечение sysname, определение targetName) ---
        if (type === ContentNavItemType.File && extension.toLowerCase() === '.md') {
          const frontMatterSysname = await extractSysnameFromFrontMatter(sourceFullPath)
          if (frontMatterSysname) {
            sysname = frontMatterSysname // Используем sysname из front matter
            targetName = `${sysname}${extension}` // Новое имя файла = sysname + .md
          }
          else {
            // Если front matter нет, sysname становится именем файла без расширения
            sysname = title
            // targetName остается оригинальным entryName
          }
        }
        else if (type === ContentNavItemType.File) {
          // Для других файлов (не .md и не изображений) используем имя без расширения как sysname
          sysname = title
          // targetName остается оригинальным entryName
        }
        // Для директорий sysname и targetName остаются оригинальным именем папки

        // --- Определение пути назначения для НЕ-изображений ---
        const destRelativePath = path.join(relativePath, targetName)
        const destFullPath = path.join(destBasePath, destRelativePath)

        // --- Создание/Копирование ---
        if (type === ContentNavItemType.Directory) {
          // Создаем папку назначения
          await fs.mkdir(destFullPath, { recursive: true })
          // Рекурсивно обрабатываем вложенную папку
          currentChildren = await processDirectoryRecursive(
            sourceFullPath,
            destBasePath,
            destRelativePath, // Передаем обновленный относительный путь
            imageDestPath, // Пробрасываем путь к папке изображений
          )
        }
        else {
          // Копируем файл (не изображение и не .md без frontmatter с тем же именем)
          await fs.copyFile(sourceFullPath, destFullPath)
        }

        // --- Создание объекта для nav.json ---
        const navItem: ContentNavItem = {
          sysname,
          title,
          type,
        }
        if (currentChildren && currentChildren.length > 0) { // Добавляем children только если они не пустые
          navItem.children = currentChildren
        }

        childrenNavItems.push(navItem)
      }

  }
  catch (error: any) {
  console.error(`Ошибка обработки директории ${sourceCurrentPath}:`, error.message)
  }

// Сортировка: папки -> файлы, по алфавиту title
childrenNavItems.sort((a, b) => {
if (a.type !== b.type) {
return a.type === ContentNavItemType.Directory ? -1 : 1
}
// Используем localeCompare для корректной сортировки строк
return a.title.localeCompare(b.title)
})

return childrenNavItems
}

// --- Основная функция ---
export async function main(\_sourceDir?: string, \_exportDir?: string): Promise<void> {
// process.argv содержит: [0: node, 1: script.js, 2: arg1, 3: arg2, ...]
const sourceDir: string | undefined = \_sourceDir ?? process.argv[2]
const exportDir: string | undefined = \_exportDir ?? process.argv[3]

if (!sourceDir || !exportDir) {
console.error('Ошибка: Необходимо указать два аргумента:')
console.error('1. Путь к исходной директории')
console.error('2. Путь к директории для экспорта')
console.error('Пример: node dist/script.js /path/to/source /path/to/export')
process.exit(1)
}

// Преобразуем пути в абсолютные для надежности
const absoluteSourceDir = path.resolve(sourceDir)
const absoluteExportDir = path.resolve(exportDir)
const absoluteImageDestPath = path.join(absoluteExportDir, IMAGE_DEST_FOLDER)

// Очистка и создание директории назначения
console.log(`Очистка и подготовка директории назначения: ${absoluteExportDir}`)
await fs.rm(absoluteExportDir, { recursive: true, force: true }) // Удаляем, если существует
await fs.mkdir(absoluteExportDir, { recursive: true }) // Создаем заново
await fs.mkdir(absoluteImageDestPath, { recursive: true }) // Создаем папку для изображений '\_'

try {
// Проверка исходной директории
try {
const sourceStats = await fs.stat(absoluteSourceDir)
if (!sourceStats.isDirectory()) {
throw new Error(`Исходный путь "${absoluteSourceDir}" не является директорией.`)
}
}
catch (statError: any) {
if (statError.code === 'ENOENT') {
throw new Error(`Исходная директория "${absoluteSourceDir}" не найдена.`)
}
throw statError // Перебрасываем другие ошибки stat
}

    console.log(`Начинаю обработку директории: ${absoluteSourceDir}`)
    console.log(`Экспорт в: ${absoluteExportDir}`)
    console.log(`Изображения будут скопированы в: ${absoluteImageDestPath}`)

    // Запускаем рекурсивную обработку и построение JSON
    const navigationStructure: ContentNavItem[] = await processDirectoryRecursive(
      absoluteSourceDir,
      absoluteExportDir,
      '', // Начинаем с пустого относительного пути
      absoluteImageDestPath,
    )

    // Запись файла nav.json
    const navFilePath = path.join(absoluteExportDir, NAV_FILENAME)
    await fs.writeFile(navFilePath, JSON.stringify(navigationStructure, null, 2))

    console.log(`\nОбработка завершена.`)
    console.log(`Структура файлов скопирована в ${absoluteExportDir}`)
    console.log(`Изображения помещены в ${absoluteImageDestPath}`)
    console.log(`Файл навигации сохранен: ${navFilePath}`)

}
catch (error: any) {
// Ловим ошибки, которые могли возникнуть до основного блока try/catch в main
if (error instanceof Error) { // Проверяем, что это действительно объект Error
console.error('Произошла ошибка во время выполнения:', error.message)
// Можно добавить вывод стека для отладки: console.error(error.stack);
}
else {
console.error('Произошла неизвестная ошибка:', error)
}
process.exit(1)
}
}

export async function clean(\_sourceDir?: string, \_exportDir?: string): Promise<void> {
// process.argv содержит: [0: node, 1: script.js, 2: arg1, 3: arg2, ...]
const exportDir: string | undefined = \_exportDir ?? process.argv[3]

// Преобразуем пути в абсолютные для надежности
const absoluteExportDir = path.resolve(exportDir)
const absoluteImageDestPath = path.join(absoluteExportDir, IMAGE_DEST_FOLDER)

// Очистка и создание директории назначения
console.log(`Очистка и подготовка директории назначения: ${absoluteExportDir}`)
await fs.rm(absoluteExportDir, { recursive: true, force: true }) // Удаляем, если существует
await fs.mkdir(absoluteExportDir, { recursive: true }) // Создаем заново
await fs.mkdir(absoluteImageDestPath, { recursive: true }) // Создаем папку для изображений '\_'
}

--- File: server/tsconfig.json ---

{
"extends": "../.nuxt/tsconfig.server.json"
}

--- File: shared/composables/change-theme.ts ---

enum ThemesVariant {
Light = 'light',
Dark = 'dark',
Rainy = 'rainy',
}

const themesColors: Record<ThemesVariant, string> = {
[ThemesVariant.Light]: '#dcdfe1',
[ThemesVariant.Dark]: '#161b22',
[ThemesVariant.Rainy]: '#121314',
}

function useChangeTheme() {
const theme = useColorMode()

function applyToHead(value: ThemesVariant) {
useHead({
meta: [
{ name: 'theme-color', content: themesColors[value] },
],
})
}

function getHeadThemeColor() {
return themesColors[theme.value as ThemesVariant]
}

const setTheme = (value: ThemesVariant) => {
theme.preference = value
applyToHead(value)
}

return {
theme,
getHeadThemeColor,
setTheme,
}
}

export { useChangeTheme }
export { ThemesVariant }

--- File: tsconfig.json ---

{
// https://nuxt.com/docs/guide/concepts/typescript
"extends": "./.nuxt/tsconfig.json"
}

=====================
