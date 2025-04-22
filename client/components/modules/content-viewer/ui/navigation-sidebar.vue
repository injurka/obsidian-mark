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
const menu = defineModel<boolean>('menu', { required: true })

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
  sidebarWidth.value = Math.max(250, Math.min(500, e.clientX))
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
  <v-navigation-drawer
    v-model="menu"
    class="navigation-sidebar-wrapper"
    :width="sidebarWidth"
  >
    <div
      class="navigation-sidebar"
      :style="{ width: `${sidebarWidth}px` }"
      :class="{ 'show-icons': contentViewerStore.showIconsEnabled }"
    >
      <div class="sidebar-header">
        <VBtn
          icon="mdi-menu"
          variant="text"
          density="compact"
          style="font-size: 0.8rem; height: 30px;"
          color="var(--fg-primary-color)"
          @click="menu = !menu"
        />
        <VTextField
          v-model="searchQuery"
          placeholder="Поиск..."
          density="compact"
          variant="solo-filled"
          hide-details
          flat
          bg-color="var(--bg-secondary-color)"
          class="search-input"
          rounded
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
              color="var(--fg-primary-color)"
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

      <VBtn
        variant="text"
        density="compact"
        style="font-size: 0.7rem; height: 30px;"
        color="var(--fg-secondary-color)"
        text="Вернуться к хранилищам"
        @click="navigateTo('/')"
      />
    </div>
    <div
      class="resizer"
      :class="{ resizing }"
      @mousedown="startResize"
    />
  </v-navigation-drawer>
</template>

<style lang="scss" scoped>
:deep(.v-navigation-drawer__content) {
  display: flex !important;
  background-color: var(--bg-secondary-color);
  color: var(--fg-primary-color);
}

.navigation-sidebar {
  position: sticky;
  top: 0;
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  overflow: hidden;
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
.search-input {
  :deep(.v-field__field) {
    color: var(--fg-primary-color);
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
        border: 1px solid #1976d207;
        padding: 4px;
        margin: 4px;
      }
      > .v-list-group:nth-of-type(6n + 2) {
        --folder-color: #d32f2f;
        background-color: #d32f2f07;
        border: 1px solid #d32f2f07;
        padding: 4px;
        margin: 4px;
        .mdi-folder {
          display: none;
        }
      }
      > .v-list-group:nth-of-type(6n + 3) {
        --folder-color: #388e3ce3;
        background-color: #388e3c07;
        border: 1px solid #388e3c07;
        padding: 4px;
        margin: 4px;
      }
      > .v-list-group:nth-of-type(6n + 4) {
        --folder-color: #e7a20cc5;
        background-color: #fbc02d07;
        border: 1px solid #fbc02d07;
        padding: 4px;
        margin: 4px;
      }
      > .v-list-group:nth-of-type(6n + 5) {
        --folder-color: #7b1fa2dc;
        background-color: #7b1fa207;
        border: 1px solid #7b1fa207;
        padding: 4px;
        margin: 4px;
      }
      > .v-list-group:nth-of-type(6n + 6) {
        --folder-color: #5d4037d7;
        background-color: #5d403707;
        border: 1px solid #5d403707;
        padding: 4px;
        margin: 4px;
      }

      > .v-list-item {
        --folder-color: #b6217df1;
        background-color: #b6217d07;
        border: 1px solid #b6217d07;
        padding: 4px;
        margin: 4px;
      }

      .v-list-item {
        color: var(--folder-color, inherit);
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
