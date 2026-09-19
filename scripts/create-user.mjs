import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const prisma = new PrismaClient()
const here = dirname(fileURLToPath(import.meta.url))
const users = JSON.parse(readFileSync(join(here, 'user_data.json'), 'utf8'))

for (const user of users) {
  const password = await bcrypt.hash(user.password, 10)
  await prisma.users.create({
    data: {
      username: user.username,
      password,
      twitter_id: user.twitter_id || ''
    }
  })
}

console.log(await prisma.users.findMany())
await prisma.$disconnect()
