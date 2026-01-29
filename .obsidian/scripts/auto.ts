import fs from 'node:fs/promises'
import path from 'node:path'
import config from './config.json' assert { type: 'json' }
import { main } from './migrator'

async function copyGlobalImages() {
  const sourceImageDir = path.resolve(config.paths.globalImageSource)
  const destImageDir = path.resolve(config.paths.outputImageRoot)

  try {
    await fs.access(sourceImageDir)
    await fs.mkdir(destImageDir, { recursive: true })
    const files = await fs.readdir(sourceImageDir)

    for (const file of files) {
      const src = path.join(sourceImageDir, file)
      const dst = path.join(destImageDir, file)
      const stat = await fs.stat(src)
      if (stat.isFile()) await fs.copyFile(src, dst)
    }
  } catch (e: any) { /* ignore */ }
}

async function copyMetaFiles() {
  const sourceMetaDir = path.resolve(config.paths.metaSource)
  const destMetaDir = path.resolve(config.paths.outputMetaRoot)

  try {
    await fs.access(sourceMetaDir)
    await fs.cp(sourceMetaDir, destMetaDir, { recursive: true, force: true })
  } catch (e: any) { /* ignore */ }
}

async function auto() {
  console.log('🚀 Starting Auto Generation process...')

  const sourceDataFilePath = path.resolve(config.paths.sourceDataFile)
  const outputMdJsonRaw = await fs.readFile(sourceDataFilePath, 'utf-8')
  const outputMdJson = JSON.parse(outputMdJsonRaw)

  const ignoredFolderNames = config.ignore.folders
  const exportPathRoot = path.resolve(config.paths.outputContentRoot)
  const metaPathRoot = path.resolve(config.paths.outputMetaRoot)

  const filteredOutputMdJson = outputMdJson.filter((item: any) => {
    return !ignoredFolderNames.includes(path.basename(item.sourcePath))
  })

  const globalNavigationStructure = filteredOutputMdJson.map((m: any) => m.navigation)

  await fs.mkdir(exportPathRoot, { recursive: true })
  await copyGlobalImages()
  await copyMetaFiles()

  for await (const item of filteredOutputMdJson) {
    const currentSourcePath = path.join(config.paths.sourceNotesRoot, item.sourcePath)
    const currentExportPath = path.join(exportPathRoot, item.exportPath)
    const currentNavSysname = item.navigation.sysname

    try {
      await main(
        currentSourcePath,
        currentExportPath,
        currentNavSysname,
        ignoredFolderNames,
        metaPathRoot
      )
    } catch (e: any) {
      console.warn(`⚠️ SKIP "${currentNavSysname}": ${e.message}\n`)
    }
  }

  const globalNavFilePath = path.resolve(exportPathRoot, 'nav.json')
  await fs.writeFile(globalNavFilePath, JSON.stringify(globalNavigationStructure, null, 2))
  console.log(`\n🌍 Global navigation file saved: ${globalNavFilePath}`)
}

auto().catch((err) => {
  console.error('Fatal Auto Error:', err)
  process.exit(1)
})
