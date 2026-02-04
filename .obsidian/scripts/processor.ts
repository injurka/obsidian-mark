import type { Dirent } from 'node:fs'
import fs from 'node:fs/promises'
import path from 'node:path'
import { FRONT_MATTER_REGEX, OBSIDIAN_LINK_REGEX } from './constants'
import { ContentNavItem, ContentNavItemType, FileMetaData, ProcessingContext } from './types'
import { ensureDirectoryExists, extractSysnameFromFrontMatter, extractTags, isImageExtension, safeCopyFile, stripMarkdown } from './utils'

export async function processDirectoryRecursive(
  sourceCurrentPath: string,
  destBasePath: string,
  relativePath: string,
  imageDestPath: string,
  fileMap: Map<string, string>,
  navigationSysname: string,
  ignoredFolderNames: string[],
  context: ProcessingContext
): Promise<ContentNavItem[]> {
  const childrenNavItems: ContentNavItem[] = []

  try {
    const entries: Dirent = await fs.readdir(sourceCurrentPath, { withFileTypes: true }) as any

    for (const entry of entries) {
      const entryName = entry.name
      const sourceFullPath = path.join(sourceCurrentPath, entryName)
      const extension = path.extname(entryName)

      // --- Игнорирование ---
      if (entry.isDirectory() && ignoredFolderNames.includes(entryName)) {
        console.log(`🚫 Ignoring directory: ${path.join(relativePath, entryName)}`)
        continue
      }
      if (entryName.startsWith('.')) continue
      if (entry.isDirectory() && entryName === '-') continue

      // --- Изображения ---
      if (entry.isFile() && isImageExtension(extension)) {
        const targetImagePath = path.join(imageDestPath, entryName)
        try {
          await fs.copyFile(sourceFullPath, targetImagePath)
        } catch (e: any) { console.error(`Err copy img ${entryName}:`, e.message) }
        continue
      }

      // --- Определение типа и путей ---
      const type = entry.isDirectory() ? ContentNavItemType.Directory : ContentNavItemType.File
      const title = path.basename(entryName, extension)

      let sysname = title
      let targetName = entryName
      let currentChildren: ContentNavItem[] | undefined

      if (type === ContentNavItemType.File && extension.toLowerCase() === '.md') {
        const frontMatterSysname = await extractSysnameFromFrontMatter(sourceFullPath)
        if (frontMatterSysname) {
          sysname = frontMatterSysname
          targetName = `${sysname}${extension}`
        }
      }

      const destRelativePath = path.join(relativePath, targetName)
      const destFullPath = path.join(destBasePath, destRelativePath)

      const urlPathPart = type === ContentNavItemType.File ? sysname : targetName
      const relativeUrlPath = path.join(relativePath, urlPathPart).replace(/\\/g, '/')
      const currentWebUrl = `/${navigationSysname}/${relativeUrlPath}`.replace(/\/+/g, '/')

      let metaData: FileMetaData | undefined = undefined;

      // --- ОБРАБОТКА ДИРЕКТОРИЙ ---
      if (type === ContentNavItemType.Directory) {
        try {
          await fs.mkdir(destFullPath, { recursive: true })
          currentChildren = await processDirectoryRecursive(
            sourceFullPath, destBasePath, destRelativePath, imageDestPath, fileMap, navigationSysname, ignoredFolderNames, context
          )
        } catch (e: any) { console.error(`Err mkdir ${destFullPath}:`, e.message); continue }
      }

      // --- ОБРАБОТКА MARKDOWN ФАЙЛОВ ---
      else if (type === ContentNavItemType.File && extension.toLowerCase() === '.md') {
        try {
          const fileStats = await fs.stat(sourceFullPath)
          let content = await fs.readFile(sourceFullPath, 'utf8')
          let linksFound = 0

          // 1. Извлечение тегов (до удаления frontmatter)
          const frontMatterMatch = content.match(FRONT_MATTER_REGEX)
          const yamlContent = frontMatterMatch ? frontMatterMatch[1] : null

          // Для поиска инлайн-тегов берем текст без frontmatter (если он есть), чтобы не дублировать
          const bodyForTags = frontMatterMatch
            ? content.substring(frontMatterMatch[0].length)
            : content

          const extractedTags = extractTags(yamlContent, bodyForTags)

          // 2. Удаление Frontmatter для итогового файла
          if (frontMatterMatch) {
            content = content.substring(frontMatterMatch[0].length).trimStart()
          }

          const uniqueOutboundLinks = new Set<string>()

          content = content.replace(OBSIDIAN_LINK_REGEX, (match, linkedFile, alias) => {
            linksFound++
            const linkBaseName = decodeURIComponent(linkedFile.trim())
            const linkText = alias ? alias.trim() : linkBaseName
            const targetUrl = fileMap.get(linkBaseName)

            if (targetUrl) {
              if (!uniqueOutboundLinks.has(targetUrl)) {
                uniqueOutboundLinks.add(targetUrl)

                // Graph Links
                context.graphData.links.push({
                  source: currentWebUrl,
                  target: targetUrl
                })

                // Backlinks
                if (!context.backlinks[targetUrl]) {
                  context.backlinks[targetUrl] = []
                }
                context.backlinks[targetUrl].push({
                  title: sysname,
                  url: currentWebUrl
                })
              }
              return `[${linkText}](${targetUrl})`
            }
            return match
          })

          // --- Генерация Метаданных ---
          const cleanText = stripMarkdown(content)
          const words = cleanText.split(/\s+/).filter(w => w.length > 0).length

          metaData = {
            words,
            readingTime: Math.ceil(words / 200) || 1,
            lastModified: fileStats.mtime.toISOString()
          }

          // --- Поиск (Добавляем теги) ---
          context.searchIndex.push({
            id: currentWebUrl,
            title: title,
            url: currentWebUrl,
            content: cleanText,
            tags: extractedTags // Сохраняем теги
          })

          // --- Graph Nodes ---
          context.graphData.nodes.push({
            id: currentWebUrl,
            label: sysname,
            val: 1 + uniqueOutboundLinks.size,
            group: navigationSysname
          })

          await ensureDirectoryExists(destFullPath)
          await fs.writeFile(destFullPath, content, 'utf8')

        } catch (e: any) {
          console.error(`Error processing MD ${entryName}:`, e.message)
          continue
        }
      }

      else if (type === ContentNavItemType.File) {
        await safeCopyFile(sourceFullPath, destFullPath)
      }

      const navItem: ContentNavItem = { sysname, title, type }
      if (metaData) {
        navItem.meta = metaData
      }
      if (currentChildren && currentChildren.length > 0) {
        navItem.children = currentChildren
      }
      childrenNavItems.push(navItem)
    }
  } catch (error: any) {
    console.error(`Ошибка обработки папки ${sourceCurrentPath}:`, error.message)
  }

  childrenNavItems.sort((a, b) => {
    if (a.type !== b.type) return a.type === ContentNavItemType.Directory ? -1 : 1
    return a.title.localeCompare(b.title, undefined, { numeric: true, sensitivity: 'base' })
  })

  return childrenNavItems
}
