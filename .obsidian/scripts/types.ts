export enum ContentNavItemType {
  File = 'file',
  Directory = 'directory',
}

// --- Статистика и SEO ---
export interface FileMetaData {
  words: number
  readingTime: number // в минутах
  lastModified: string // ISO date
}

// --- Элемент дерева ---
export interface ContentNavItem {
  sysname: string
  title: string
  type: ContentNavItemType
  children?: ContentNavItem[]
  meta?: FileMetaData
}

// --- Поиск ---
export interface SearchIndexItem {
  id: string
  title: string
  url: string
  content: string // Очищенный текст для поиска
  tags?: string[]
}

// --- Граф знаний ---
export interface GraphNode {
  id: string // URL страницы
  label: string // Заголовок
  val: number // "Вес" узла
  group?: string // Группа
}

export interface GraphLink {
  source: string // URL откуда
  target: string // URL куда
}

export interface GraphData {
  nodes: GraphNode[]
  links: GraphLink[]
}

// --- Обратные ссылки ---
// Ключ: URL целевой страницы. Значение: список страниц, ссылающихся на неё
export type BacklinksMap = Record<string, Array<{ title: string; url: string }>>

// --- Контейнер для сбора всех данных ---
export interface ProcessingContext {
  searchIndex: SearchIndexItem[]
  graphData: GraphData
  backlinks: BacklinksMap
}
