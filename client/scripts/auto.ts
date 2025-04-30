import fs from 'node:fs/promises'
import path from 'node:path'
import outputMdJson from '../output-md.json'
import { main } from './migrate'

const sourcePathRoot = '../marks'
const exportPathRoot = './public/content'

const globalNavigationStructure = outputMdJson.map(m => m.navigation)

async function auto() {
  console.log('Starting content generation process...')

  await fs.mkdir(exportPathRoot, { recursive: true })

  for await (const item of outputMdJson) {
    const currentSourcePath = path.join(sourcePathRoot, item.sourcePath)
    const currentExportPath = path.join(exportPathRoot, item.exportPath)
    const currentNavSysname = item.navigation.sysname

    await main(currentSourcePath, currentExportPath, currentNavSysname)
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
