import fs from 'node:fs/promises'
import path from 'node:path'
import { IMAGE_DEST_FOLDER, NAV_FILENAME, TREE_FILENAME } from './constants'
import { buildFileMapRecursive } from './link-resolver'
import { processDirectoryRecursive } from './processor'
import type { ContentNavItem, ProcessingContext } from './types'

export async function main(
  _sourceDir?: string,
  _exportDir?: string,
  _navigationSysname?: string,
  _ignoredFolderNames?: string[],
  _metaRootDir?: string
): Promise<void> {
  const sourceDir = _sourceDir ?? process.argv[2]
  const exportDir = _exportDir ?? process.argv[3]
  const navigationSysname = _navigationSysname ?? process.argv[4] ?? path.basename(sourceDir || '')
  const ignoredFolderNames = _ignoredFolderNames ?? process.argv[5] ?? []
  const metaRootDir = _metaRootDir ?? process.argv[6]

  if (!sourceDir || !exportDir || !navigationSysname) {
    console.error('Ошибка: Неверные аргументы.')
    process.exit(1)
  }

  const absoluteSourceDir = path.resolve(sourceDir)
  const absoluteExportDir = path.resolve(exportDir)
  const absoluteImageDestPath = path.join(absoluteExportDir, IMAGE_DEST_FOLDER)

  console.log(`--- Инициализация: ${navigationSysname} ---`)

  // Очистка
  await fs.rm(absoluteExportDir, { recursive: true, force: true })
  await fs.mkdir(absoluteExportDir, { recursive: true })
  await fs.mkdir(absoluteImageDestPath, { recursive: true })

  try {
    // 1. Карта ссылок
    const fileMap = new Map<string, string>()
    await buildFileMapRecursive(absoluteSourceDir, absoluteSourceDir, navigationSysname, fileMap, ignoredFolderNames)

    // 2. Инициализация контекста для сбора данных
    const context: ProcessingContext = {
      searchIndex: [],
      graphData: { nodes: [], links: [] },
      backlinks: {}
    }

    // 3. Процессинг
    console.log(`--- Обработка файлов и сбор данных ---`)
    const navigationStructure: ContentNavItem[] = await processDirectoryRecursive(
      absoluteSourceDir,
      absoluteExportDir,
      '',
      absoluteImageDestPath,
      fileMap,
      navigationSysname,
      ignoredFolderNames,
      context // Передаем контекст
    )

    // 4. Сохранение nav.json (Content only)
    const navFilePath = path.join(absoluteExportDir, NAV_FILENAME)
    await fs.writeFile(navFilePath, JSON.stringify(navigationStructure, null, 2), 'utf8')
    console.log(`✅ Навигация сохранена: ${navFilePath}`)

    // 5. Сохранение META данных (Tree, Search, Graph, Backlinks)
    if (metaRootDir) {
      const absoluteMetaRootDir = path.resolve(metaRootDir)
      const vaultMetaDir = path.join(absoluteMetaRootDir, navigationSysname)

      await fs.mkdir(vaultMetaDir, { recursive: true })

      // tree.json (с метаданными SEO)
      await fs.writeFile(
        path.join(vaultMetaDir, TREE_FILENAME),
        JSON.stringify(navigationStructure, null, 2), 'utf8'
      )

      // search.json
      await fs.writeFile(
        path.join(vaultMetaDir, 'search.json'),
        JSON.stringify(context.searchIndex, null, 2), 'utf8'
      )

      // backlinks.json
      await fs.writeFile(
        path.join(vaultMetaDir, 'backlinks.json'),
        JSON.stringify(context.backlinks, null, 2), 'utf8'
      )

      // graph.json
      await fs.writeFile(
        path.join(vaultMetaDir, 'graph.json'),
        JSON.stringify(context.graphData, null, 2), 'utf8'
      )

      console.log(`🌳 Meta данные (tree, search, backlinks, graph) сохранены в: ${vaultMetaDir}`)
    }

  } catch (error: any) {
    console.error('\n--- КРИТИЧЕСКАЯ ОШИБКА ---')
    console.error(error.message)
    throw error
  }
}
