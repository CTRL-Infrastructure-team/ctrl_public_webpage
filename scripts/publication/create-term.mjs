import { PrismaClient } from '@prisma/client'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const prisma = new PrismaClient()
const here = dirname(fileURLToPath(import.meta.url))
const termData = JSON.parse(readFileSync(join(here, 'term_data.json'), 'utf8'))

const topics = await prisma.pubtopics.findMany({
  where: {
    date: {
      gte: termData.start_date,
      lte: termData.end_date
    }
  },
  select: { id: true }
})

const newTerm = await prisma.pubterms.create({
  data: {
    term: termData.term,
    name: termData.term_name,
    explanation: termData.explanation
  }
})

await prisma.pubtopics.updateMany({
  where: { id: { in: topics.map(topic => topic.id) } },
  data: { pubterms_id: newTerm.id }
})

console.log(await prisma.pubterms.findMany())
await prisma.$disconnect()
