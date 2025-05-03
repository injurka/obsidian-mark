import fs from 'node:fs/promises'
import path from 'node:path'
import outputMdJson from '../output-md.json'
import { main } from './migrate'

const sourcePathRoot = '.'
const exportPathRoot = './.output/content'
const ignoredFolderNames = ['Frame Forge']

const filteredOutputMdJson = outputMdJson.filter(item => {
  const folderName = path.basename(item.sourcePath);
  return !ignoredFolderNames.includes(folderName);
});

const globalNavigationStructure = filteredOutputMdJson.map(m => m.navigation)

async function auto() {
  console.log('Starting content generation process...')

  await fs.mkdir(exportPathRoot, { recursive: true })

  for await (const item of filteredOutputMdJson) {
    const currentSourcePath = path.join(sourcePathRoot, item.sourcePath)
    const currentExportPath = path.join(exportPathRoot, item.exportPath)
    const currentNavSysname = item.navigation.sysname

    await main(
      currentSourcePath, 
      currentExportPath, 
      currentNavSysname,
      ignoredFolderNames
    )
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
