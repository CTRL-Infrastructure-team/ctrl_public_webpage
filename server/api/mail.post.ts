import nodemailer from 'nodemailer'

const recentByIp = new Map<string, number[]>()

function checkRateLimit(ip: string) {
  const now = Date.now()
  const windowMs = 10 * 60 * 1000
  const stamps = (recentByIp.get(ip) || []).filter(t => now - t < windowMs)
  if (stamps.length >= 5) {
    throw createError({ statusCode: 429, statusMessage: '送信が多すぎます。しばらくしてから再度お試しください' })
  }
  stamps.push(now)
  recentByIp.set(ip, stamps)
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export default defineEventHandler(async (event) => {
  const body = await readBody<{ email?: string, inquiry?: string }>(event)
  const email = body?.email?.trim() || ''
  const inquiry = body?.inquiry?.trim() || ''
  const errors: { param: string, msg: string }[] = []
  if (!isEmail(email)) errors.push({ param: 'email', msg: '不正なメールアドレスです。' })
  if (!inquiry) errors.push({ param: 'inquiry', msg: '問い合わせ内容を入力してください' })
  if (errors.length) {
    throw createError({
      statusCode: 400,
      statusMessage: '入力内容を確認してください',
      data: { error: errors }
    })
  }

  const ip = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
  checkRateLimit(ip)

  const config = useRuntimeConfig()
  const hasMail = Boolean(config.senderEmailAddress && config.senderEmailPassword)
  const hasDiscord = Boolean(config.discordUrl)
  if (!hasMail && !hasDiscord) {
    throw createError({
      statusCode: 503,
      statusMessage: '問い合わせ機能が設定されていません（Discord またはメールの .env を確認してください）'
    })
  }

  const text = `このメールアドレスは送信専用です。返信しても反応はできません。\n返信には時間がかかる場合がございます。\n 以下の内容で問い合わせを受けつけました。\n${inquiry}`

  if (hasMail) {
    const smtp = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: String(config.senderEmailAddress),
        pass: String(config.senderEmailPassword)
      }
    })
    try {
      await smtp.sendMail({
        from: String(config.senderEmailAddress),
        to: email,
        subject: '問い合わせを受け付けました。',
        text
      })
    } catch {
      if (!hasDiscord) {
        throw createError({
          statusCode: 502,
          statusMessage: '確認メールの送信に失敗しました。Gmail の設定を確認してください'
        })
      }
    }
  }

  if (config.discordUrl) {
    await $fetch(String(config.discordUrl), {
      method: 'POST',
      body: {
        username: 'CTRL_HP',
        content: `CTRLホームページから問い合わせです。\n 内容：${inquiry} \n email: ${email}`
      }
    })
  }

  return { ok: true }
})
