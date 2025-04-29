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
const NAV_FILENAME: string = 'nav.json'
const IMAGE_DEST_FOLDER: string = '_' // Папка для изображений в корне назначения

// --- Регулярные выражения ---
const FRONT_MATTER_REGEX: RegExp = /^---\s*([\s\S]*?)\s*---/;
const SYSNAME_REGEX: RegExp = /^\s*sysname:\s*"?([^"\s]+)"?\s*$/m;
const OBSIDIAN_LINK_REGEX: RegExp = /(?<!\!)\[\[([^|\]\n]+)(?:\|([^\]\n]+))?\]\]/g;

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


/**
 * Ensures a directory exists for a given file path.
 */
async function ensureDirectoryExists(filePath: string): Promise<void> {
  const directory = path.dirname(filePath);
  try {
    await fs.mkdir(directory, { recursive: true });
  } catch (error: any) {
    // Ignore if directory already exists
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }
}

/**
 * Safely copies a file, ensuring the destination directory exists.
 */
async function safeCopyFile(sourcePath: string, destPath: string): Promise<void> {
  try {
    // First check if the source file exists
    await fs.access(sourcePath, fs.constants.F_OK);

    // Ensure destination directory exists
    await ensureDirectoryExists(destPath);

    // Copy the file
    await fs.copyFile(sourcePath, destPath);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      console.error(`Error: Source file does not exist: ${sourcePath} `);
    } else {
      console.error(`Error copying file from ${sourcePath} to ${destPath}: ${error.message} `);
    }
    throw error; // Re-throw to allow caller to handle
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
): Promise<void> {
  try {
    const entries: Dirent[] = await fs.readdir(currentSourcePath, { withFileTypes: true });

    for (const entry of entries) {
      const entryName = entry.name;
      const sourceFullPath = path.join(currentSourcePath, entryName);
      const extension = path.extname(entryName);

      if (entryName.startsWith('.') || entryName === IMAGE_DEST_FOLDER || (entry.isDirectory() && entryName === '-')) {
        continue; // Skip hidden, image folder, or special '-' folder
      }

      if (entry.isDirectory()) {
        // Recursively scan subdirectory
        await buildFileMapRecursive(sourceBasePath, sourceFullPath, navigationSysname, fileMap);
      } else if (entry.isFile() && extension.toLowerCase() === '.md') {
        // Process Markdown files
        const baseName = path.basename(entryName, extension); // e.g., "10 (сб) - Начало пути"
        const frontMatterSysname = await extractSysnameFromFrontMatter(sourceFullPath);

        // Determine the filename part of the URL (use sysname if available, else baseName)
        const urlFileNamePart = frontMatterSysname ?? baseName;

        // Calculate the relative path from the sourceBasePath for the URL structure
        const relativePathFromSourceBase = path.relative(sourceBasePath, path.dirname(sourceFullPath));

        // Construct the final relative path for the URL (directory + filename part)
        // Ensure forward slashes for URL
        const finalRelativePath = path.join(relativePathFromSourceBase, urlFileNamePart).replace(/\\/g, '/');

        // Construct the full URL: /{navigation.sysname}/relative/path/to/file
        // NOTE: We are NOT URL-encoding path segments here to match the example output.
        // Consider adding encodeURIComponent if needed for web server compatibility.
        const targetUrl = `/ ${navigationSysname}/${finalRelativePath}`;

        if (fileMap.has(baseName)) {
          console.warn(`⚠️ Duplicate base file name found: "${baseName}". Link resolution might be ambiguous. Using path: ${targetUrl}`);
        }
        // Add to map
        fileMap.set(baseName, targetUrl);
        // console.log(`🗺️ Mapped: "${baseName}" -> ${targetUrl}`); // Debug logging
      }
    }
  } catch (error: any) {
    console.error(`Error scanning directory for map ${currentSourcePath}:`, error.message);
  }
}

async function processDirectoryRecursive(
  sourceCurrentPath: string,
  destBasePath: string,
  relativePath: string,
  imageDestPath: string,
  fileMap: Map<string, string>,
  navigationSysname: string,
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
        // Create directory
        try {
          await fs.mkdir(destFullPath, { recursive: true });
          console.log(`📁 Created directory: ${destRelativePath || '/'}`);
        } catch (mkdirError: any) {
          console.error(`Error creating directory ${destFullPath}:`, mkdirError.message);
          continue; // Skip this directory if we can't create it
        }

        // Process children recursively
        currentChildren = await processDirectoryRecursive(
          sourceFullPath,
          destBasePath,
          destRelativePath, // Use updated relative path for children
          imageDestPath,
          fileMap, // Pass map down
          navigationSysname,
        );
      } else if (type === ContentNavItemType.File && extension.toLowerCase() === '.md') {
        // *** Process MD File Content ***
        try {
          let content = await fs.readFile(sourceFullPath, 'utf8');
          let linksFound = 0;
          let linksReplaced = 0;

          content = content.replace(OBSIDIAN_LINK_REGEX, (match, linkedFile, alias) => {
            linksFound++;
            const linkBaseName = linkedFile.trim();
            const linkText = alias ? alias.trim() : linkBaseName;
            const targetUrl = fileMap.get(linkBaseName); // Lookup in the map

            if (targetUrl) {
              linksReplaced++;
              return `[${linkText}](${targetUrl})`;
            } else {
              // Keep original link but maybe log a warning
              console.warn(`    ⚠️ Link target not found for "[[${linkBaseName}]]" in file: ${entryName}. Keeping original.`);
              return match; // Return original [[...]] link
            }
          });

          if (linksFound > 0) {
            console.log(`📝 Processed ${entryName}: ${linksReplaced}/${linksFound} links replaced.`);
          }

          // Ensure parent directory exists
          await ensureDirectoryExists(destFullPath);

          // Write the modified content to the destination
          await fs.writeFile(destFullPath, content, 'utf8');
          console.log(`✍️ Wrote Markdown file: ${destRelativePath}`);

        } catch (readWriteError: any) {
          console.error(`Error processing Markdown file ${entryName}:`, readWriteError.message);
          continue; // Skip this file if processing failed
        }
      } else {
        // Copy other file types directly
        try {
          console.log(`📄 Copying file: ${destRelativePath}`);
          await safeCopyFile(sourceFullPath, destFullPath);
        } catch (copyError: any) {
          // Error already logged in safeCopyFile
          continue; // Skip this file if copying failed
        }
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
export async function main(
  _sourceDir?: string,
  _exportDir?: string,
  _navigationSysname?: string
): Promise<void> {
  // process.argv содержит: [0: node, 1: script.js, 2: arg1, 3: arg2, ...]
  const sourceDir: string | undefined = _sourceDir ?? process.argv[2]
  const exportDir: string | undefined = _exportDir ?? process.argv[3]
  const navigationSysname: string | undefined = _navigationSysname ?? process.argv[4] ?? path.basename(sourceDir || '');

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

    console.log(`Начинаю обработку директории: ${absoluteSourceDir}`)
    console.log(`Экспорт в: ${absoluteExportDir}`)
    console.log(`Изображения будут скопированы в: ${absoluteImageDestPath}`)

    const fileMap = new Map<string, string>();

    // Запускаем рекурсивную обработку и построение JSON
    const navigationStructure: ContentNavItem[] = await processDirectoryRecursive(
      absoluteSourceDir,
      absoluteExportDir,
      '',
      absoluteImageDestPath,
      fileMap,
      navigationSysname
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

export async function clean(_sourceDir?: string, _exportDir?: string): Promise<void> {
  // process.argv содержит: [0: node, 1: script.js, 2: arg1, 3: arg2, ...]
  const exportDir: string | undefined = _exportDir ?? process.argv[3]

  // Преобразуем пути в абсолютные для надежности
  const absoluteExportDir = path.resolve(exportDir)
  const absoluteImageDestPath = path.join(absoluteExportDir, IMAGE_DEST_FOLDER)

  // Очистка и создание директории назначения
  console.log(`Очистка и подготовка директории назначения: ${absoluteExportDir}`)
  await fs.rm(absoluteExportDir, { recursive: true, force: true }) // Удаляем, если существует
  await fs.mkdir(absoluteExportDir, { recursive: true }) // Создаем заново
  await fs.mkdir(absoluteImageDestPath, { recursive: true }) // Создаем папку для изображений '_'
}
