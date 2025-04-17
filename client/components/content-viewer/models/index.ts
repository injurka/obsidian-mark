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
