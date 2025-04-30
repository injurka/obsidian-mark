import type { Dirent } from 'node:fs'
import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

// --- Типы данных ---
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

// --- Константы ---
const NAV_FILENAME: string = 'nav.json'
const IMAGE_DEST_FOLDER: string = '_'

// --- Регулярные выражения ---
const FRONT_MATTER_REGEX: RegExp = /^---\s*([\s\S]*?)\s*---/
const SYSNAME_REGEX: RegExp = /^\s*sysname:\s*"?([^"\s]+)"?\s*$/m
// Regex to find Obsidian links: [[filename]] or [[filename|alias]]
const OBSIDIAN_LINK_REGEX: RegExp = /(?<!!)\[\[([^|\]\n]+)(?:\|([^\]\n]+))?\]\]/g

// --- Расширения изображений ---
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
 * Checks if a file extension is an image extension.
 */
function isImageExtension(extension: string): boolean {
  return IMAGE_EXTENSIONS.has(extension.toLowerCase())
}

/**
 * Extracts sysname from YAML front matter.
 */
async function extractSysnameFromFrontMatter(filePath: string): Promise<string | null> {
  let fileHandle: fs.FileHandle | undefined
  try {
    fileHandle = await fs.open(filePath, 'r')
    const buffer = Buffer.alloc(1024)
    const { bytesRead } = await fileHandle.read(buffer, 0, 1024, 0)

    if (bytesRead === 0) {
      return null
    }

    const contentStart: string = buffer.toString('utf8', 0, bytesRead)
    const frontMatterMatch = contentStart.match(FRONT_MATTER_REGEX)

    if (frontMatterMatch?.[1]) {
      const yamlContent = frontMatterMatch[1]
      const sysnameMatch = yamlContent.match(SYSNAME_REGEX)
      if (sysnameMatch?.[1]) {
        return sysnameMatch[1]
      }
    }
  }
  catch (error: any) {
    console.warn(`Could not read front matter from ${filePath}: ${error.message}`)
  }
  finally {
    await fileHandle?.close()
  }
  return null
}

// ========================================================================
// Pass 1: Build File Map
// ========================================================================

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
    const entries: Dirent[] = await fs.readdir(currentSourcePath, { withFileTypes: true })

    for (const entry of entries) {
      const entryName = entry.name
      const sourceFullPath = path.join(currentSourcePath, entryName)
      const extension = path.extname(entryName)

      if (entryName.startsWith('.') || entryName === IMAGE_DEST_FOLDER || (entry.isDirectory() && entryName === '-')) {
        continue // Skip hidden, image folder, or special '-' folder
      }

      if (entry.isDirectory()) {
        // Recursively scan subdirectory
        await buildFileMapRecursive(sourceBasePath, sourceFullPath, navigationSysname, fileMap)
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
        const targetUrl = `/${navigationSysname}/${finalRelativePath}`

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

// ========================================================================
// Pass 2: Process Content and Copy
// ========================================================================

/**
 * Recursively scans, processes content (replacing links), copies files/folders, and builds the nav structure.
 * @param sourceCurrentPath - Current source path being scanned.
 * @param destBasePath - Base destination path (e.g., './public/content/Travel').
 * @param relativePath - Relative path within the destination structure.
 * @param imageDestPath - Absolute path to the destination image folder.
 * @param fileMap - The pre-built map of base file names to URLs.
 * @param navigationSysname - The root sysname for this section (needed for logging/context).
 * @returns Promise resolving to an array of ContentNavItem for the current level.
 */
async function processDirectoryRecursive(
  sourceCurrentPath: string,
  destBasePath: string,
  relativePath: string,
  imageDestPath: string,
  fileMap: Map<string, string>, // Pass the map here
  navigationSysname: string,
): Promise<ContentNavItem[]> {
  const childrenNavItems: ContentNavItem[] = []
  try {
    const entries: Dirent[] = await fs.readdir(sourceCurrentPath, { withFileTypes: true })

    for (const entry of entries) {
      const entryName = entry.name
      const sourceFullPath = path.join(sourceCurrentPath, entryName)
      const extension = path.extname(entryName)

      // --- Ignore Rules ---
      if (entryName.startsWith('.') || entryName === IMAGE_DEST_FOLDER || (entry.isDirectory() && entryName === '-')) {
        continue
      }

      // --- Handle Images ---
      if (entry.isFile() && isImageExtension(extension)) {
        const targetImagePath = path.join(imageDestPath, entryName)
        try {
          await fs.copyFile(sourceFullPath, targetImagePath)
          // console.log(`🖼️ Image copied: ${entryName} -> ${IMAGE_DEST_FOLDER}/`);
        }
        catch (copyError: any) {
          console.error(`Error copying image ${entryName}:`, copyError.message)
        }
        continue // Skip adding images to nav.json
      }

      // --- Determine Type and Base Names ---
      const type = entry.isDirectory() ? ContentNavItemType.Directory : ContentNavItemType.File
      const title = path.basename(entryName, extension) // Title for nav.json

      let sysname = entryName // Default sysname (for folders or non-md files)
      let targetName = entryName // Default target file/folder name in destination
      let currentChildren: ContentNavItem[] | undefined

      // --- Process Files (Extract sysname, determine targetName) ---
      if (type === ContentNavItemType.File && extension.toLowerCase() === '.md') {
        const frontMatterSysname = await extractSysnameFromFrontMatter(sourceFullPath)
        if (frontMatterSysname) {
          sysname = frontMatterSysname // Use sysname from front matter for nav.json
          targetName = `${sysname}${extension}` // Rename file in destination
        }
        else {
          sysname = title // Use title as sysname if no front matter
          // targetName remains original entryName
        }
      }
      else if (type === ContentNavItemType.File) {
        // For non-md files (not images), use title as sysname
        sysname = title
        // targetName remains original entryName
      }
      // For directories, sysname and targetName remain original entryName

      // --- Determine Destination Path for Non-Images ---
      const destRelativePath = path.join(relativePath, targetName)
      const destFullPath = path.join(destBasePath, destRelativePath)

      // --- Create/Copy/Process ---
      if (type === ContentNavItemType.Directory) {
        await fs.mkdir(destFullPath, { recursive: true })
        currentChildren = await processDirectoryRecursive(
          sourceFullPath,
          destBasePath,
          destRelativePath, // Use updated relative path for children
          imageDestPath,
          fileMap, // Pass map down
          navigationSysname,
        )
      }
      else if (type === ContentNavItemType.File && extension.toLowerCase() === '.md') {
        // *** Process MD File Content ***
        try {
          let content = await fs.readFile(sourceFullPath, 'utf8')
          let linksFound = 0
          let linksReplaced = 0

          content = content.replace(OBSIDIAN_LINK_REGEX, (match, linkedFile, alias) => {
            linksFound++
            const linkBaseName = linkedFile.trim()
            const linkText = alias ? alias.trim() : linkBaseName
            const targetUrl = fileMap.get(linkBaseName) // Lookup in the map

            if (targetUrl) {
              linksReplaced++
              // console.log(`    🔗 Replacing link in ${entryName}: "[[${linkedFile}${alias ? '|' + alias : ''}]]" -> "[${linkText}](${targetUrl})"`);
              return `[${linkText}](${targetUrl})`
            }
            else {
              // Keep original link but maybe log a warning
              console.warn(`    ⚠️ Link target not found for "[[${linkBaseName}]]" in file: ${entryName}. Keeping original.`)
              return match // Return original [[...]] link
            }
          })

          if (linksFound > 0) {
            console.log(`📝 Processed ${entryName}: ${linksReplaced}/${linksFound} links replaced.`)
          }

          // Write the modified content to the destination
          await fs.writeFile(destFullPath, content, 'utf8')
        }
        catch (readWriteError: any) {
          console.error(`Error processing/writing Markdown file ${entryName}:`, readWriteError.message)
        }
      }
      else {
        // Copy other file types directly
        try {
          // Ensure parent directory exists before copying
          await fs.mkdir(path.dirname(destFullPath), { recursive: true })
          await fs.copyFile(sourceFullPath, destFullPath)
        }
        catch (copyError: any) {
          console.error(`Error copying file ${entryName} to ${destFullPath}:`, copyError.message)
        }
      }

      // --- Create Nav Item ---
      const navItem: ContentNavItem = {
        sysname,
        title,
        type,
      }
      if (currentChildren && currentChildren.length > 0) {
        navItem.children = currentChildren
      }

      childrenNavItems.push(navItem)
    }
  }
  catch (error: any) {
    console.error(`Error processing directory ${sourceCurrentPath}:`, error.message)
  }

  // Sort: Folders -> Files, alphabetically by title
  childrenNavItems.sort((a, b) => {
    if (a.type !== b.type) {
      return a.type === ContentNavItemType.Directory ? -1 : 1
    }
    return a.title.localeCompare(b.title)
  })

  return childrenNavItems
}

// --- Main Function ---
export async function main(
  _sourceDir?: string,
  _exportDir?: string,
  _navigationSysname?: string, // <-- Add navigationSysname parameter
): Promise<void> {
  const sourceDir: string | undefined = _sourceDir ?? process.argv[2]
  const exportDir: string | undefined = _exportDir ?? process.argv[3]
  // Use provided nav sysname or get from args (less ideal) or default
  const navigationSysname: string | undefined = _navigationSysname ?? process.argv[4]

  if (!sourceDir || !exportDir || !navigationSysname) { // Check for navigationSysname too
    console.error('Error: Missing required arguments:')
    console.error('1. Source directory path')
    console.error('2. Export directory path')
    console.error('3. Navigation sysname (root identifier for URLs)')
    console.error('Example: node dist/script.js /path/to/source /path/to/export SectionName')
    process.exit(1)
  }

  const absoluteSourceDir = path.resolve(sourceDir)
  const absoluteExportDir = path.resolve(exportDir) // This is the base export dir for the section
  const absoluteImageDestPath = path.join(absoluteExportDir, IMAGE_DEST_FOLDER)

  console.log(`\n🚀 Starting processing for [${navigationSysname}]`)
  console.log(`   Source: ${absoluteSourceDir}`)
  console.log(`   Export Root: ${absoluteExportDir}`)

  // Clean and prepare destination directory
  // console.log(`   Cleaning destination: ${absoluteExportDir}`);
  await fs.rm(absoluteExportDir, { recursive: true, force: true })
  await fs.mkdir(absoluteExportDir, { recursive: true })
  await fs.mkdir(absoluteImageDestPath, { recursive: true }) // Create image folder '_'

  try {
    // Check source directory exists
    try {
      const sourceStats = await fs.stat(absoluteSourceDir)
      if (!sourceStats.isDirectory()) {
        throw new Error(`Source path "${absoluteSourceDir}" is not a directory.`)
      }
    }
    catch (statError: any) {
      if (statError.code === 'ENOENT') {
        throw new Error(`Source directory "${absoluteSourceDir}" not found.`)
      }
      throw statError
    }

    // --- Pass 1: Build File Map ---
    console.log(`   Pass 1: Building file map...`)
    const fileMap = new Map<string, string>()
    await buildFileMapRecursive(
      absoluteSourceDir, // Base path for relative calculations
      absoluteSourceDir, // Start scanning from here
      navigationSysname, // Root identifier for URLs
      fileMap, // Map to populate
    )
    console.log(`   Pass 1: Map built with ${fileMap.size} entries.`)

    // --- Pass 2: Process Content, Copy, and Build Nav ---
    console.log(`   Pass 2: Processing content and building structure...`)
    const navigationStructure: ContentNavItem[] = await processDirectoryRecursive(
      absoluteSourceDir, // Start scanning from here
      absoluteExportDir, // Base destination path
      '', // Start with empty relative path
      absoluteImageDestPath, // Path to image folder
      fileMap, // The generated map
      navigationSysname, // Pass for context/logging
    )

    // Write nav.json for this specific section
    const navFilePath = path.join(absoluteExportDir, NAV_FILENAME)
    await fs.writeFile(navFilePath, JSON.stringify(navigationStructure, null, 2))
    console.log(`   Pass 2: Structure built. Navigation saved: ${navFilePath}`)

    console.log(`✅ Processing finished for [${navigationSysname}].`)
  }
  catch (error: any) {
    console.error(`❌ Fatal error during processing for [${navigationSysname}]:`, error instanceof Error ? error.message : error)
    process.exit(1)
  }
}

// (Keep the clean function as it was, it doesn't need modification for link processing)
export async function clean(_sourceDir?: string, _exportDir?: string): Promise<void> {
  const exportDir: string | undefined = _exportDir ?? process.argv[3]

  if (!exportDir) {
    console.error('Error: Missing export directory path for clean operation.')
    process.exit(1)
  }

  const absoluteExportDir = path.resolve(exportDir)
  // Only remove the specific export dir, not the global public/content
  console.log(`🧹 Cleaning directory: ${absoluteExportDir}`)
  await fs.rm(absoluteExportDir, { recursive: true, force: true })
  // Recreate the base export dir after cleaning
  await fs.mkdir(absoluteExportDir, { recursive: true })
  // Recreate the image folder if needed within this specific dir
  // await fs.mkdir(path.join(absoluteExportDir, IMAGE_DEST_FOLDER), { recursive: true });
  console.log(`✨ Directory cleaned: ${absoluteExportDir}`)
}
