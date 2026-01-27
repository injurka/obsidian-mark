import fs from 'node:fs/promises'
import path from 'node:path'
import config from './config.json' assert { type: 'json' }
import { main } from './migrate'

/**
 * Копирует все файлы из глобальной директории изображений в целевую.
 */
async function copyGlobalImages() {
  const sourceImageDir = path.resolve(config.paths.globalImageSource)
  const destImageDir = path.resolve(config.paths.outputImageRoot)

  console.log('\n🖼️  Копирование глобальных изображений...')
  console.log(`    Источник: ${sourceImageDir}`)
  console.log(`    Назначение:   ${destImageDir}`)

  try {
    await fs.access(sourceImageDir)
    await fs.mkdir(destImageDir, { recursive: true })
    const imageFiles = await fs.readdir(sourceImageDir)

    if (imageFiles.length === 0) {
      console.log('    ℹ️  Исходная директория с изображениями пуста. Копировать нечего.')
      return
    }

    let copiedCount = 0
    for (const file of imageFiles) {
      const sourcePath = path.join(sourceImageDir, file)
      const destPath = path.join(destImageDir, file)

      const stat = await fs.stat(sourcePath)
      if (stat.isFile()) {
        await fs.copyFile(sourcePath, destPath)
        copiedCount++
      }
    }
    console.log(`    ✅  Успешно скопировано ${copiedCount} изображение(й).`)

  } catch (error: any) {
    if (error.code === 'ENOENT') {
      console.log(`    ℹ️  Исходная директория '${config.paths.globalImageSource}' не найдена. Пропускаем копирование.`)
    } else {
      console.error(`    ❌  Ошибка при копировании глобальных изображений: ${error.message}`)
    }
  }
}

/**
 * Рекурсивно копирует папку meta.
 */
async function copyMetaFiles() {
  const sourceMetaDir = path.resolve(config.paths.metaSource)
  const destMetaDir = path.resolve(config.paths.outputMetaRoot)

  console.log('\n⚙️  Копирование мета-данных (meta)...')
  console.log(`    Источник: ${sourceMetaDir}`)
  console.log(`    Назначение:   ${destMetaDir}`)

  try {
    // Проверяем существование источника
    await fs.access(sourceMetaDir)

    // Используем cp с recursive: true для копирования всей структуры папок (styles и т.д.)
    // Работает в Node v16.7+ и Bun
    await fs.cp(sourceMetaDir, destMetaDir, { recursive: true, force: true })

    console.log(`    ✅  Мета-данные успешно скопированы.`)

  } catch (error: any) {
    if (error.code === 'ENOENT') {
      console.log(`    ℹ️  Папка meta '${config.paths.metaSource}' не найдена. Пропускаем.`)
    } else {
      console.error(`    ❌  Ошибка при копировании meta: ${error.message}`)
    }
  }
}

async function auto() {
  console.log('Starting content generation process...', config)

  const sourceDataFilePath = path.resolve(config.paths.sourceDataFile)
  const outputMdJsonRaw = await fs.readFile(sourceDataFilePath, 'utf-8');
  const outputMdJson = JSON.parse(outputMdJsonRaw);

  const ignoredFolderNames = config.ignore.folders
  const exportPathRoot = path.resolve(config.paths.outputContentRoot)

  const filteredOutputMdJson = outputMdJson.filter((item: any) => {
    const folderName = path.basename(item.sourcePath);
    return !ignoredFolderNames.includes(folderName);
  });

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
        ignoredFolderNames
      )
    } catch (e: any) {
      console.warn(`\n⚠️  ПРЕДУПРЕЖДЕНИЕ: Пропуск раздела "${currentNavSysname}".`)
      console.warn(`    Причина: ${e.message}`)
      console.warn(`    Путь: ${currentSourcePath}\n`)
    }
  }

  const globalNavFilePath = path.resolve(exportPathRoot, 'nav.json')
  await fs.writeFile(globalNavFilePath, JSON.stringify(globalNavigationStructure, null, 2))
  console.log(`\n🌍 Global navigation file saved: ${globalNavFilePath}`)

  console.log('\nAll content generation tasks completed.')
}

auto().catch((err) => {
  console.error('Auto process failed:', err)
  process.exit(1)
})
