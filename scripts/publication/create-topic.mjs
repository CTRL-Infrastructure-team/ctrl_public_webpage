import { PrismaClient } from '@prisma/client'
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const prisma = new PrismaClient()
const here = dirname(fileURLToPath(import.meta.url))
const topic = JSON.parse(
  (await import('node:fs')).readFileSync(join(here, 'topic_data.json'), 'utf8')
)

const created = await prisma.pubtopics.create({
  data: {
    date: topic.date,
    name: topic.title,
    explanation: topic.explanation
  }
})

writeFileSync(join(here, 'setting.json'), JSON.stringify({
  id: created.id,
  created_at: created.created_at
}, null, '\t'))

console.log(created)
await prisma.$disconnect()
