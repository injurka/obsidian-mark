import fs from 'node:fs/promises'
import path from 'node:path'
import { FRONT_MATTER_REGEX, IMAGE_EXTENSIONS, INLINE_TAG_REGEX, SYSNAME_REGEX } from './constants'

/**
 * Проверяет, является ли расширение файла расширением изображения.
 */
export function isImageExtension(extension: string): boolean {
  return IMAGE_EXTENSIONS.has(extension.toLowerCase())
}

/**
 * Извлекает sysname из YAML front matter файла.
 */
export async function extractSysnameFromFrontMatter(filePath: string): Promise<string | null> {
  let fileHandle: fs.FileHandle | undefined
  try {
    fileHandle = await fs.open(filePath, 'r')
    const buffer = Buffer.alloc(1024)
    const { bytesRead } = await fileHandle.read(buffer, 0, 1024, 0)

    if (bytesRead === 0) return null

    const contentStart = buffer.toString('utf8', 0, bytesRead)
    const frontMatterMatch = contentStart.match(FRONT_MATTER_REGEX)

    if (frontMatterMatch?.[1]) {
      const yamlContent = frontMatterMatch[1]
      const sysnameMatch = yamlContent.match(SYSNAME_REGEX)
      if (sysnameMatch?.[1]) {
        return sysnameMatch[1].trim()
      }
    }
  } catch (error: any) {
    console.warn(`Не удалось прочитать front matter из файла ${filePath}: ${error.message}`)
  } finally {
    await fileHandle?.close()
  }
  return null
}

/**
 * Парсит теги из YAML контента и основного текста.
 * Исправлена логика для предотвращения попадания "-" в теги.
 */
export function extractTags(yamlContent: string | null, bodyContent: string): string[] {
  const tags = new Set<string>()

  // 1. Парсинг YAML (Ручной разбор для надежности)
  if (yamlContent) {
    const lines = yamlContent.split(/\r?\n/)
    let capturingList = false

    for (const line of lines) {
      const trimmedLine = line.trim()

      if (!trimmedLine || trimmedLine.startsWith('#')) continue

      // Проверка на ключ "tags:"
      if (trimmedLine.match(/^tags?:/)) {
        // Проверяем наличие значения на той же строке
        // Пример: "tags: tag1, tag2" или "tags: [tag1, tag2]"
        const inlineValueMatch = trimmedLine.match(/^tags?:\s*(.+)$/)

        if (inlineValueMatch) {
          let val = inlineValueMatch[1].trim()

          // Если это массив [a, b]
          if (val.startsWith('[')) {
            val = val.replace(/^\[|\]$/g, '') // убираем скобки
            if (val) {
              val.split(',').forEach(t => tags.add(t.trim()))
            }
            capturingList = false
          }
          // Если это просто текст (и не начинается с # комментария)
          else if (val && !val.startsWith('#')) {
            val.split(',').forEach(t => tags.add(t.trim()))
            capturingList = false
          }
          else {
            // Значение пустое, ожидаем список на следующих строках
            capturingList = true
          }
        } else {
          // Просто "tags:", ожидаем список
          capturingList = true
        }
        continue
      }

      // Обработка элементов списка "- value"
      if (capturingList) {
        if (trimmedLine.startsWith('-')) {
          const tagVal = trimmedLine.substring(1).trim() // Убираем дефис
          if (tagVal) tags.add(tagVal)
        } else if (trimmedLine.includes(':')) {
          // Начался новый ключ, прекращаем захват
          capturingList = false
        }
      }
    }
  }

  // 2. Инлайн теги из текста (#tag)
  const matches = bodyContent.match(INLINE_TAG_REGEX)
  if (matches) {
    // matches возвращает массив строк типа "#tag", убираем решетку
    matches.forEach(m => {
      // INLINE_TAG_REGEX = /(?<=^|\s)#([a-zA-Z...]+)/g
      // match[0] будет "#tag". 
      tags.add(m.replace('#', ''))
    })
  }

  // Очистка: убираем кавычки, пустые строки и возможные дубликаты "-" если вдруг просочились
  return Array.from(tags)
    .map(t => t.replace(/^["']|["']$/g, '')) // Убираем кавычки вокруг тега
    .filter(t => t.length > 0 && t !== '-')
}

/**
 * Ensures a directory exists for a given file path.
 */
export async function ensureDirectoryExists(filePath: string): Promise<void> {
  const directory = path.dirname(filePath)
  try {
    await fs.mkdir(directory, { recursive: true })
  } catch (error: any) {
    if (error.code !== 'EEXIST') throw error
  }
}

/**
 * Safely copies a file, ensuring the destination directory exists.
 */
export async function safeCopyFile(sourcePath: string, destPath: string): Promise<void> {
  try {
    await fs.access(sourcePath, fs.constants.F_OK)
    await ensureDirectoryExists(destPath)
    await fs.copyFile(sourcePath, destPath)
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      console.error(`Error: Source file does not exist: ${sourcePath} `)
    } else {
      console.error(`Error copying file from ${sourcePath} to ${destPath}: ${error.message} `)
    }
  }
}

/**
 * Очищает текст от Markdown разметки для создания превью и индекса поиска.
 */
export function stripMarkdown(markdown: string): string {
  if (!markdown) return ''
  return markdown
    // Удаляем заголовки
    .replace(/^#+\s+/gm, '')
    // Удаляем жирный текст и курсив
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/(\*|_)(.*?)\1/g, '$2')
    // Удаляем зачеркнутый текст
    .replace(/~~(.*?)~~/g, '$1')
    // Удаляем ссылки [text](url) -> text
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
    // Удаляем вики-ссылки [[text]] или [[link|text]] -> text
    .replace(/\[\[(?:[^|\]]+\|)?([^\]]+)\]\]/g, '$1')
    // Удаляем изображения ![[...]] или ![...](...)
    .replace(/!\[\[.*?\]\]/g, '')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    // Удаляем блоки кода
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`([^`]+)`/g, '$1')
    // Удаляем цитаты
    .replace(/^>\s+/gm, '')
    // Удаляем HTML теги
    .replace(/<[^>]*>/g, '')
    // Удаляем теги хэштеги из текста поиска (сами теги уже в поле tags)
    .replace(/(?<=^|\s)#([a-zA-Zа-яА-Я0-9_\-\/]+)/g, '$1')
    // Удаляем лишние пробелы и переносы
    .replace(/\s+/g, ' ')
    .trim()
}
