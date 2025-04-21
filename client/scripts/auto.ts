import fs from 'node:fs/promises'
import path from 'node:path'
import { main } from './migrate'

const sourcePath = '../marks'
const exportPath = './public/content'

const navigationStructure = [
  {
    sysname: 'TypeScript',
    title: 'TypeScript',
    description: 'Стрероидный брат JavaScript со строгими типами для безопасной и эффективной разработки.',
    icon: '/images/ts.png',
  },
  {
    "sysname": "UnrealEngine",
    "title": "Unreal Engine 5",
    "description": "Познай мощь реального времени для 3D-графики и погрязни в его бескрайности.",
    "icon": "/images/ue.png"
  },
  {
    sysname: 'Cha',
    title: 'Травушка муравушка',
    description: 'Всё о китайском чае: от истории и видов до секретов заваривания и чайной церемонии.',
    icon: '/images/tea.png',
  },
]

async function auto() {
  await main(sourcePath.concat('/Frontend/TypeScript'), exportPath.concat('/TypeScript'))
  await main(sourcePath.concat('/Personal Note/茶 Cha'), exportPath.concat('/Cha'))
  await main(sourcePath.concat('/Gamedev/UE'), exportPath.concat('/UnrealEngine'))

  await fs.writeFile(path.resolve(exportPath, 'nav.json'), JSON.stringify(navigationStructure, null, 2))
}

auto()
