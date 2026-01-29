import type { Dirent } from 'node:fs'
import fs from 'node:fs/promises'
import path from 'node:path'
import { IMAGE_DEST_FOLDER } from './constants'
import { extractSysnameFromFrontMatter } from './utils'

/**
 * Recursively scans the source directory to build a map of base file names to their final URL paths.
 */
export async function buildFileMapRecursive(
  sourceBasePath: string,
  currentSourcePath: string,
  navigationSysname: string,
  fileMap: Map<string, string>,
  ignoredFolderNames: string[]
): Promise<void> {
  try {
    const entries: Dirent = await fs.readdir(currentSourcePath, { withFileTypes: true }) as any

    for (const entry of entries) {
      const entryName = entry.name
      const sourceFullPath = path.join(currentSourcePath, entryName)
      const extension = path.extname(entryName)

      // Игнорирование
      if (entry.isDirectory() && ignoredFolderNames.includes(entryName)) {
        console.log(`🚫 Ignoring directory for file mapping: ${path.join(path.relative(sourceBasePath, currentSourcePath), entryName)}`)
        continue
      }

      if (entryName.startsWith('.') || entryName === IMAGE_DEST_FOLDER || (entry.isDirectory() && entryName === '-')) {
        continue
      }

      if (entry.isDirectory()) {
        await buildFileMapRecursive(sourceBasePath, sourceFullPath, navigationSysname, fileMap, ignoredFolderNames)
      } else if (entry.isFile() && extension.toLowerCase() === '.md') {
        const baseName = path.basename(entryName, extension)
        const frontMatterSysname = await extractSysnameFromFrontMatter(sourceFullPath)

        const urlFileNamePart = frontMatterSysname ?? baseName
        const relativePathFromSourceBase = path.relative(sourceBasePath, path.dirname(sourceFullPath))
        const finalRelativePath = path.join(relativePathFromSourceBase, urlFileNamePart).replace(/\\/g, '/')

        const targetUrl = `/${navigationSysname}/${finalRelativePath}`

        if (fileMap.has(baseName)) {
          console.warn(`⚠️ Duplicate base file name found: "${baseName}". Link resolution might be ambiguous. Using path: ${targetUrl}`)
        }
        fileMap.set(baseName, targetUrl)
      }
    }
  } catch (error: any) {
    console.error(`Error scanning directory for map ${currentSourcePath}:`, error.message)
  }
}
