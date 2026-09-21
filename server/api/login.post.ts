import bcrypt from 'bcrypt'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ username?: string, password?: string }>(event)
  const username = body?.username?.trim()
  const password = body?.password || ''
  if (!username || !password) {
    throw createError({ statusCode: 400, statusMessage: 'IDとパスワードを入力してください' })
  }

  const users = await prisma.users.findMany({ where: { username } })
  for (const user of users) {
    const ok = await bcrypt.compare(password, user.password)
    if (ok) {
      const session = await getAppSession(event)
      await session.update({ userId: user.id })
      return { user: publicUser(user) }
    }
  }

  throw createError({ statusCode: 401, statusMessage: 'ユーザ名またはパスワードが違います' })
})
