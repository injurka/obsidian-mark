// migrate.ts

import type { Dirent } from 'node:fs'
import fs from 'node:fs/promises'
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
const NAV_FILENAME: string = 'nav.json'
const IMAGE_DEST_FOLDER: string = '_' // Папка для изображений в корне назначения

// --- Регулярные выражения ---
// Regex to match the entire front matter block at the beginning of a string
const FRONT_MATTER_REGEX: RegExp = /^---\s*([\s\S]*?)\s*---/
// Regex to extract sysname specifically from the front matter content
const SYSNAME_REGEX: RegExp = /^\s*sysname:\s*"?([^"\s]+)"?\s*$/m
// Regex for Obsidian links (excluding image links like ![[...]])
const OBSIDIAN_LINK_REGEX: RegExp = /(?<!!)\[\[([^|\]\n]+)(?:\|([^\]\n]+))?\]\]/g

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

/**
 * Проверяет, является ли расширение файла расширением изображения.
 * @param extension - Расширение файла (например, '.png').
 * @returns true, если это изображение, иначе false.
 */
function isImageExtension(extension: string): boolean {
  return IMAGE_EXTENSIONS.has(extension.toLowerCase())
}

/**
 * Извлекает sysname из YAML front matter файла.
 * @param filePath - Путь к файлу.
 * @returns Промис, который разрешается значением sysname или null, если его нет.
 */
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
        return sysnameMatch[1].trim() // Возвращаем найденное значение sysname, убираем лишние пробелы
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

/**
 * Ensures a directory exists for a given file path.
 */
async function ensureDirectoryExists(filePath: string): Promise<void> {
  const directory = path.dirname(filePath)
  try {
    await fs.mkdir(directory, { recursive: true })
  }
  catch (error: any) {
    // Ignore if directory already exists
    if (error.code !== 'EEXIST') {
      throw error
    }
  }
}

/**
 * Safely copies a file, ensuring the destination directory exists.
 */
async function safeCopyFile(sourcePath: string, destPath: string): Promise<void> {
  try {
    // First check if the source file exists
    await fs.access(sourcePath, fs.constants.F_OK)

    // Ensure destination directory exists
    await ensureDirectoryExists(destPath)

    // Copy the file
    await fs.copyFile(sourcePath, destPath)
  }
  catch (error: any) {
    if (error.code === 'ENOENT') {
      console.error(`Error: Source file does not exist: ${sourcePath} `)
    }
    else {
      console.error(`Error copying file from ${sourcePath} to ${destPath}: ${error.message} `)
    }
  }
}

/**
 * Recursively scans the source directory to build a map of base file names to their final URL paths.
 * @param sourceBasePath - The root source directory for this run (e.g., '../marks/Personal Note/Travel').
 * @param currentSourcePath - The current directory being scanned.
 * @param navigationSysname - The root sysname for this section (e.g., 'Travel').
 * @param fileMap - The Map object to populate (baseName -> URL).
 */
async function buildFileMapRecursive(
  sourceBasePath: string,
  currentSourcePath: string,
  navigationSysname: string,
  fileMap: Map<string, string>, // Map<BaseFileName, TargetURL>
  ignoredFolderNames: string[]
): Promise<void> {
  try {
    const entries: Dirent[] = await fs.readdir(currentSourcePath, { withFileTypes: true })

    for (const entry of entries) {
      const entryName = entry.name
      const sourceFullPath = path.join(currentSourcePath, entryName)
      const extension = path.extname(entryName)

      // --- NEW: Check if directory is ignored ---
      if (entry.isDirectory() && ignoredFolderNames.includes(entryName)) {
        console.log(`🚫 Ignoring directory for file mapping: ${path.join(path.relative(sourceBasePath, currentSourcePath), entryName)}`);
        continue; // Skip this ignored directory and its contents
      }
      // --- END NEW ---

      if (entryName.startsWith('.') || entryName === IMAGE_DEST_FOLDER || (entry.isDirectory() && entryName === '-')) {
        continue // Skip hidden, image folder, or special '-' folder
      }


      if (entry.isDirectory()) {
        // Recursively scan subdirectory
        await buildFileMapRecursive(
          sourceBasePath, sourceFullPath, navigationSysname, fileMap, ignoredFolderNames)
      }
      else if (entry.isFile() && extension.toLowerCase() === '.md') {
        // Process Markdown files
        const baseName = path.basename(entryName, extension) // e.g., "10 (сб) - Начало пути"
        const frontMatterSysname = await extractSysnameFromFrontMatter(sourceFullPath)

        // Determine the filename part of the URL (use sysname if available, else baseName)
        const urlFileNamePart = frontMatterSysname ?? baseName

        // Calculate the relative path from the sourceBasePath for the URL structure
        const relativePathFromSourceBase = path.relative(sourceBasePath, path.dirname(sourceFullPath))

        // Construct the final relative path for the URL (directory + filename part)
        // Ensure forward slashes for URL
        const finalRelativePath = path.join(relativePathFromSourceBase, urlFileNamePart).replace(/\\/g, '/')

        // Construct the full URL: /{navigation.sysname}/relative/path/to/file
        // NOTE: We are NOT URL-encoding path segments here to match the example output.
        // Consider adding encodeURIComponent if needed for web server compatibility.
        const targetUrl = `/${navigationSysname}/${finalRelativePath}` // Убрал пробел после '/'

        if (fileMap.has(baseName)) {
          console.warn(`⚠️ Duplicate base file name found: "${baseName}". Link resolution might be ambiguous. Using path: ${targetUrl}`)
        }
        // Add to map
        fileMap.set(baseName, targetUrl)
        // console.log(`🗺️ Mapped: "${baseName}" -> ${targetUrl}`); // Debug logging
      }
    }
  }
  catch (error: any) {
    console.error(`Error scanning directory for map ${currentSourcePath}:`, error.message)
  }
}


async function processDirectoryRecursive(
  sourceCurrentPath: string,
  destBasePath: string,
  relativePath: string,
  imageDestPath: string,
  fileMap: Map<string, string>,
  navigationSysname: string,
  ignoredFolderNames: string[]
): Promise<ContentNavItem[]> {
  const childrenNavItems: ContentNavItem[] = []
  try {
    const entries: Dirent[] = await fs.readdir(sourceCurrentPath, { withFileTypes: true })

    for (const entry of entries) {
      const entryName = entry.name
      const sourceFullPath = path.join(sourceCurrentPath, entryName)
      const extension = path.extname(entryName)

      // --- NEW: Check if directory is ignored ---
      if (entry.isDirectory() && ignoredFolderNames.includes(entryName)) {
        console.log(`🚫 Ignoring directory for processing: ${path.join(relativePath, entryName)}`);
        continue; // Skip this ignored directory and its contents
      }
      // --- END NEW ---

      // --- Правила игнорирования (существующие) ---
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
        } continue // Переходим к следующему элементу, не добавляем в nav.json
      }

      // --- Определение типа и базовых имен ---
      const type = entry.isDirectory() ? ContentNavItemType.Directory : ContentNavItemType.File
      // Title - имя файла без расширения или имя папки
      const title = path.basename(entryName, extension) // Для папок extension будет пустым, path.basename вернет имя папки

      let sysname = title // По умолчанию sysname = title
      let targetName = entryName // Имя файла/папки в директории назначения по умолчанию
      let currentChildren: ContentNavItem[] | undefined

      // --- Обработка файлов (извлечение sysname, определение targetName) ---
      if (type === ContentNavItemType.File && extension.toLowerCase() === '.md') {
        const frontMatterSysname = await extractSysnameFromFrontMatter(sourceFullPath)
        if (frontMatterSysname) {
          sysname = frontMatterSysname // Используем sysname из front matter
          targetName = `${sysname}${extension}` // Новое имя файла = sysname + .md
        } else {
          // Если front matter нет, sysname становится именем файла без расширения
          sysname = title
          // targetName остается оригинальным entryName
        }
      }
      // Для директорий sysname остается title (имя папки)
      // и targetName остается оригинальным entryName

      // --- Определение пути назначения для НЕ-изображений ---
      const destRelativePath = path.join(relativePath, targetName)
      const destFullPath = path.join(destBasePath, destRelativePath)

      // --- Создание/Копирование ---
      if (type === ContentNavItemType.Directory) {
        // Create directory
        try {
          await fs.mkdir(destFullPath, { recursive: true })
          console.log(`📁 Created directory: ${destRelativePath || '/'}`)
          // Process children recursively
          currentChildren = await processDirectoryRecursive(
            sourceFullPath,
            destBasePath,
            destRelativePath, // Use updated relative path for children
            imageDestPath,
            fileMap, // Pass map down
            navigationSysname,
            ignoredFolderNames
          )
        }
        catch (mkdirError: any) {
          console.error(`Error creating directory ${destFullPath}:`, mkdirError.message)
          continue // Skip this directory if we can't create it
        }
      }
      else if (type === ContentNavItemType.File && extension.toLowerCase() === '.md') {
        // *** Process MD File Content ***
        try {
          let content = await fs.readFile(sourceFullPath, 'utf8')
          let linksFound = 0
          let linksReplaced = 0
          let frontMatterRemoved = false

          // --- NEW: Remove Front Matter ---
          // Check if the content starts with '---' and try to match the whole block
          const frontMatterMatch = content.match(FRONT_MATTER_REGEX)
          if (frontMatterMatch) {
            // Remove the matched front matter block (including --- lines)
            // frontMatterMatch[0] contains the entire matched string (---...---)
            content = content.substring(frontMatterMatch[0].length).trimStart() // Remove the block and leading whitespace/newlines
            frontMatterRemoved = true
            // console.log(`    ℹ️ Removed front matter from ${entryName}`); // Optional detailed log
          }
          // --- End NEW ---


          // Replace Obsidian links [[link|alias]] or [[link]]
          content = content.replace(OBSIDIAN_LINK_REGEX, (match, linkedFile, alias) => {
            linksFound++
            // Decode potential URI encoded characters in file names from Obsidian
            const linkBaseName = decodeURIComponent(linkedFile.trim())
            const linkText = alias ? alias.trim() : linkBaseName
            const targetUrl = fileMap.get(linkBaseName) // Lookup in the map using decoded name

            if (targetUrl) {
              linksReplaced++
              return `[${linkText}](${targetUrl})`
            }
            else {
              // Keep original link but maybe log a warning
              console.warn(`    ⚠️ Link target not found for "[[${linkBaseName}]]" in file: ${entryName}. Keeping original.`)
              return match // Return original [[...]] link
            }
          })

          if (linksFound > 0 || frontMatterRemoved) {
            const logParts: string[] = [];
            if (frontMatterRemoved) logParts.push("Front matter removed");
            if (linksFound > 0) logParts.push(`${linksReplaced}/${linksFound} links replaced`);
            console.log(`📝 Processed ${entryName}: ${logParts.join(', ')}.`);
          }


          // Ensure parent directory exists before writing
          await ensureDirectoryExists(destFullPath)

          // Write the modified content to the destination
          await fs.writeFile(destFullPath, content, 'utf8')
          console.log(`✍️ Wrote Markdown file: ${destRelativePath}`)
        }
        catch (readWriteError: any) {
          console.error(`Error processing Markdown file ${entryName} (${sourceFullPath}):`, readWriteError.message)
          continue // Skip this file if processing failed
        }
      }
      else if (type === ContentNavItemType.File) {
        // Copy other file types directly (non-MD, non-image)
        console.log(`📄 Copying file: ${destRelativePath}`)
        await safeCopyFile(sourceFullPath, destFullPath)
      }

      // --- Создание объекта для nav.json ---
      // Добавляем элемент в навигацию только если он не является игнорируемой папкой
      // (Изображения уже пропущены с помощью continue)
      const navItem: ContentNavItem = {
        sysname, // Use the determined sysname (from front matter or filename/dirname)
        title,   // Use the base name without extension as title
        type,
      }
      // Add children only if they exist and are not empty
      if (currentChildren && currentChildren.length > 0) {
        navItem.children = currentChildren
      }

      // Add the item to the navigation structure
      childrenNavItems.push(navItem)

    } // End loop through entries
  }
  catch (error: any) {
    console.error(`Ошибка обработки директории ${sourceCurrentPath}:`, error.message)
  }

  // Сортировка: папки -> файлы, по алфавиту title
  childrenNavItems.sort((a, b) => {
    if (a.type !== b.type) {
      return a.type === ContentNavItemType.Directory ? -1 : 1
    }
    // Используем localeCompare для корректной сортировки строк, включая числа
    return a.title.localeCompare(b.title, undefined, { numeric: true, sensitivity: 'base' })
  })

  return childrenNavItems
}

// --- Основная функция ---
export async function main(
  _sourceDir?: string,
  _exportDir?: string,
  _navigationSysname?: string,
  _ignoredFolderNames?: string[]
): Promise<void> {
  // process.argv содержит: [0: node, 1: script.js, 2: arg1, 3: arg2, ...]
  const sourceDir: string | undefined = _sourceDir ?? process.argv[2]
  const exportDir: string | undefined = _exportDir ?? process.argv[3]
  // Use basename of sourceDir as default nav sysname if not provided
  const navigationSysname: string | undefined = _navigationSysname ?? process.argv[4] ?? path.basename(sourceDir || '')
  const ignoredFolderNames: string[] = _ignoredFolderNames ?? process.argv[5] ?? []

  if (!sourceDir || !exportDir || !navigationSysname) {
    console.error('Ошибка: Необходимо указать минимум два аргумента (исходная директория, директория экспорта).')
    console.error('Третий аргумент (navigation sysname) опционален и будет взят из имени исходной директории, если не указан.')
    console.error('1. Путь к исходной директории')
    console.error('2. Путь к директории для экспорта')
    console.error('3. (Опционально) Системное имя для корневой навигации (напр., \'MyNotes\')')
    console.error('Пример: node dist/script.js ../MyNotes ./ExportedNotes MyNotes')
    process.exit(1)
    return
  }

  // Преобразуем пути в абсолютные для надежности
  const absoluteSourceDir = path.resolve(sourceDir)
  const absoluteExportDir = path.resolve(exportDir)
  const absoluteImageDestPath = path.join(absoluteExportDir, IMAGE_DEST_FOLDER)

  // Очистка и создание директории назначения
  console.log(`--- Инициализация ---`)
  console.log(`Очистка и подготовка директории назначения: ${absoluteExportDir}`)
  await fs.rm(absoluteExportDir, { recursive: true, force: true }) // Удаляем, если существует
  await fs.mkdir(absoluteExportDir, { recursive: true }) // Создаем заново
  await fs.mkdir(absoluteImageDestPath, { recursive: true }) // Создаем папку для изображений '_'

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

    console.log(`Источник: ${absoluteSourceDir}`)
    console.log(`Назначение: ${absoluteExportDir}`)
    console.log(`Корневой sysname: ${navigationSysname}`)
    console.log(`Изображения -> ${absoluteImageDestPath}`)
    console.log(`Игнорируемые папки: ${ignoredFolderNames?.join(', ') || 'нет'}`) // NEW: Log ignored folders
    console.log(`--- Построение карты ссылок ---`)

    // --- Этап 1: Построение карты ссылок ---
    const fileMap = new Map<string, string>()
    await buildFileMapRecursive(
      absoluteSourceDir, // Base path for relative URL calculation
      absoluteSourceDir, // Current path to start scanning
      navigationSysname,
      fileMap,
      ignoredFolderNames
    );
    console.log(`Карта ссылок построена (${fileMap.size} файлов .md найдено).`)
    console.log(`--- Обработка файлов и директорий ---`)


    // --- Этап 2: Рекурсивная обработка, копирование, модификация MD и генерация nav.json ---
    const navigationStructure: ContentNavItem[] = await processDirectoryRecursive(
      absoluteSourceDir,      // Source directory to process
      absoluteExportDir,      // Base destination directory
      '',                     // Initial relative path (empty)
      absoluteImageDestPath,  // Destination for all images
      fileMap,                // The pre-built map for link resolution
      navigationSysname,      // The root sysname for the section,
      ignoredFolderNames
    )

    // --- Этап 3: Запись файла nav.json ---
    const navFilePath = path.join(absoluteExportDir, NAV_FILENAME)
    await fs.writeFile(navFilePath, JSON.stringify(navigationStructure, null, 2), 'utf8')

    console.log(`\n--- Завершено ---`)
    // console.log(`Структура файлов скопирована в ${absoluteExportDir}`) // Already logged during process
    // console.log(`Изображения помещены в ${absoluteImageDestPath}`) // Already logged during process
    console.log(`Файл навигации сохранен: ${navFilePath}`)
    console.log(`Всего элементов в nav.json верхнего уровня: ${navigationStructure.length}`)

  }
  catch (error: any) {
    // Ловим ошибки, которые могли возникнуть до основного блока try/catch в main
    console.error('\n--- КРИТИЧЕСКАЯ ОШИБКА ---')
    if (error instanceof Error) { // Проверяем, что это действительно объект Error
      console.error('Произошла ошибка во время выполнения:', error.message)
      console.error(error.stack) // Выводим стек для детальной отладки
    }
    else {
      console.error('Произошла неизвестная ошибка:', error)
    }
    process.exit(1)
  }
}

// (clean function remains the same)
export async function clean(_sourceDir?: string, _exportDir?: string): Promise<void> {
  // process.argv содержит: [0: node, 1: script.js, 2: arg1, 3: arg2, ...]
  const exportDir: string | undefined = _exportDir ?? process.argv[3]

  if (!exportDir) {
    console.error('Ошибка: Необходимо указать путь к директории для очистки (второй аргумент).');
    console.error('Пример: node dist/script.js clean ./ExportedNotes')
    process.exit(1);
  }

  // Преобразуем пути в абсолютные для надежности
  const absoluteExportDir = path.resolve(exportDir)
  const absoluteImageDestPath = path.join(absoluteExportDir, IMAGE_DEST_FOLDER)

  // Очистка и создание директории назначения
  console.log(`Очистка директории назначения: ${absoluteExportDir}`)
  await fs.rm(absoluteExportDir, { recursive: true, force: true }).catch(() => { }) // Удаляем, если существует, игнорируем ошибку если нет
  await fs.mkdir(absoluteExportDir, { recursive: true }) // Создаем заново
  await fs.mkdir(absoluteImageDestPath, { recursive: true }) // Создаем папку для изображений '_'
  console.log(`Директория ${absoluteExportDir} очищена и подготовлена.`);
}
