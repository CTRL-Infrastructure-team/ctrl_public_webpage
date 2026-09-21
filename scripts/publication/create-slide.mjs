import { PrismaClient } from '@prisma/client'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const prisma = new PrismaClient()
const here = dirname(fileURLToPath(import.meta.url))
const slides = JSON.parse(readFileSync(join(here, 'slide_data.json'), 'utf8'))
const setting = JSON.parse(readFileSync(join(here, 'setting.json'), 'utf8'))

for (const slide of slides) {
  await prisma.pubtopics.update({
    where: { id: setting.id },
    data: {
      slides: {
        create: {
          contributor: slide.name,
          grade: slide.grade,
          slide_url: slide.slide || ''
        }
      }
    }
  })
}

console.log(await prisma.pubtopics.findUnique({ where: { id: setting.id } }))
console.log(await prisma.pubslides.findMany({ where: { pubtopics_id: setting.id } }))
await prisma.$disconnect()
