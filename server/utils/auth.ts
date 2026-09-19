import type { H3Event } from 'h3'
import { prisma } from './prisma'

function sessionPassword() {
  const secret = useRuntimeConfig().sessionSecret
  if (!secret || String(secret).length < 32) {
    throw createError({
      statusCode: 500,
      statusMessage: 'NUXT_SESSION_SECRET を32文字以上で設定してください'
    })
  }
  return String(secret)
}

export function getAppSession(event: H3Event) {
  return useSession(event, {
    name: 'ctrl.sid',
    password: sessionPassword(),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7
    }
  })
}

export async function requireUser(event: H3Event) {
  const session = await getAppSession(event)
  const userId = session.data.userId as string | undefined
  if (!userId) {
    throw createError({ statusCode: 401, statusMessage: 'ログインが必要です' })
  }
  const user = await prisma.users.findUnique({ where: { id: userId } })
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'ログインが必要です' })
  }
  return user
}

export function assertOwner(contributor: string, username: string) {
  if (contributor !== username) {
    throw createError({ statusCode: 403, statusMessage: '権限がありません' })
  }
}

export function publicUser(user: { id: string, username: string, twitter_id: string, grade: number }) {
  return {
    id: user.id,
    username: user.username,
    twitter_id: user.twitter_id,
    grade: user.grade
  }
}
