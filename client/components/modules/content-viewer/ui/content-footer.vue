<script lang="ts" setup>
import type { ContentNavItem } from '~/components/modules/content-viewer'
import { ContentNavItemType } from '~/components/modules/content-viewer'

interface Props {
  items: ContentNavItem[] | null
  vault: string
  currentItemPath: string
}

const props = defineProps<Props>()

function flattenNavItems(items: ContentNavItem[] | undefined, currentPathSegments: string[] = []): Array<ContentNavItem & { path: string }> {
  if (!items)
    return []
  let flatList: Array<ContentNavItem & { path: string }> = []

  items.forEach((item) => {
    const newItemPathSegments = [...currentPathSegments, item.sysname]
    const itemPath = newItemPathSegments.join('/')

    if (item.type === ContentNavItemType.File) {
      flatList.push({ ...item, path: itemPath })
    }
    else if (item.type === ContentNavItemType.Directory && item.children) {
      flatList = flatList.concat(flattenNavItems(item.children, newItemPathSegments))
    }
  })

  return flatList
}

const navigableItems = computed(() => flattenNavItems(props.items || []))

const currentIndex = computed(() => {
  if (!props.currentItemPath) {
    return navigableItems.value.findIndex(item => item.path === 'index')
  }
  return navigableItems.value.findIndex(item => item.path === props.currentItemPath)
})

const previousItem = computed(() => {
  if (currentIndex.value > 0) {
    return navigableItems.value[currentIndex.value - 1]
  }
  return undefined
})

const nextItem = computed(() => {
  if (currentIndex.value !== -1 && currentIndex.value < navigableItems.value.length - 1) {
    return navigableItems.value[currentIndex.value + 1]
  }
  return undefined
})

const handlePreviousItem = () => {
  navigateTo({ path: `/${props.vault}/${previousItem.value!.path}` })
  if (typeof document !== 'undefined') {
    document.querySelector('.main-content')!.scrollTo(0,0) 
  }
}

const handleNextItem = () => {
  navigateTo({ path: `/${props.vault}/${nextItem.value!.path}` })
  if (typeof document !== 'undefined') {
    document.querySelector('.main-content')!.scrollTo(0,0) 
  }
}

</script>

<template>
  <div class="content-footer">
    <div class="footer-nav-item">
      <v-btn
        v-if="previousItem"
        variant="tonal"
        color="var(--fg-secondary-color)"
        prepend-icon="mdi-arrow-left"
        style="min-width: 200px; text-transform: none;"
        @click="handlePreviousItem()"
      >
        <span class="nav-title">{{ previousItem.title }}</span>
      </v-btn>
    </div>

    <div class="footer-nav-item">
      <v-btn
        v-if="nextItem"
        variant="tonal"
        color="var(--fg-secondary-color)"
        append-icon="mdi-arrow-right"
        style="min-width: 200px; text-transform: none;"
        @click="handleNextItem()"
      >
        <span class="nav-title">{{ nextItem.title }}</span>
      </v-btn>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content-footer {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 20px 30px;
  flex-shrink: 0;
  max-width: 1000px;
  margin: 0 auto;
  border-top: 1px solid var(--border-secondary-color);
}

.footer-nav-item {
  :deep(.v-btn) {
    width: 100% !important;
  }
  .nav-title {
    color: var(--fg-primary-color);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }
}

@include mobile() {
  .content-footer {
    flex-direction: column;
    align-items: stretch;
    padding: 15px 20px;
  }

  .footer-nav-item {
    width: 100%;
    margin-bottom: 10px;
    :deep(.v-btn) {
      width: 100% !important;
    }
  }
}
</style>
