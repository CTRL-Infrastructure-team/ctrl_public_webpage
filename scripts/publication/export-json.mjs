import { PrismaClient } from '@prisma/client'
import { writeFileSync } from 'node:fs'

const prisma = new PrismaClient()
const pubterms = await prisma.pubterms.findMany()
const pubtopics = await prisma.pubtopics.findMany()
const pubslides = await prisma.pubslides.findMany()
writeFileSync('pubterms.json', JSON.stringify(pubterms, null, 2))
writeFileSync('pubtopics.json', JSON.stringify(pubtopics, null, 2))
writeFileSync('pubslides.json', JSON.stringify(pubslides, null, 2))
console.log('Data exported to JSON files')
await prisma.$disconnect()
