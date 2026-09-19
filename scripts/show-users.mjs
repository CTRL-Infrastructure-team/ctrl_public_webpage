import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
console.log(await prisma.users.findMany({ orderBy: { created_at: 'desc' } }))
await prisma.$disconnect()
