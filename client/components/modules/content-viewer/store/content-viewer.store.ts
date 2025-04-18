import { useCookie } from '#app'
import { defineStore } from 'pinia'

const COOKIE_BORDERLESS_VIEW = 'ui_borderlessViewEnabled'
const COOKIE_COLORED_FOLDERS = 'ui_coloredFoldersEnabled'
const COOKIE_SHOW_ICONS = 'ui_showIconsEnabled'

/**
 * Хранилище для управления настройками отображения контента и навигации.
 * Настройки сохраняются в cookie.
 */
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
