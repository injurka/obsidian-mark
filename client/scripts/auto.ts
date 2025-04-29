import fs from 'node:fs/promises'
import path from 'node:path'
import { main } from './migrate'
import outputMdJson from '../output-md.json'

const sourcePath = '../marks'
const exportPath = './public/content'

const navigationStructure = outputMdJson.map(m => m.navigation)

async function auto() {
  for await (const item of outputMdJson) {
    await main(sourcePath.concat(item.sourcePath), exportPath.concat(item.exportPath))
  }

  await fs.writeFile(path.resolve(exportPath, 'nav.json'), JSON.stringify(navigationStructure, null, 2))
}

auto()
