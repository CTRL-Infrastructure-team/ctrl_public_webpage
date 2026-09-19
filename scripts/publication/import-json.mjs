import { PrismaClient } from '@prisma/client'
import { readFileSync } from 'node:fs'

const prisma = new PrismaClient()
const pubterms = JSON.parse(readFileSync('pubterms.json', 'utf8'))
const pubtopics = JSON.parse(readFileSync('pubtopics.json', 'utf8'))
const pubslides = JSON.parse(readFileSync('pubslides.json', 'utf8'))

for (const data of pubterms) await prisma.pubterms.create({ data })
for (const data of pubtopics) await prisma.pubtopics.create({ data })
for (const data of pubslides) await prisma.pubslides.create({ data })

console.log('Data imported from JSON files')
await prisma.$disconnect()
