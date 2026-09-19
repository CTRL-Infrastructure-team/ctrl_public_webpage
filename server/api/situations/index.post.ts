export default defineEventHandler(async (event) => {
  const user = await requireUser(event)
  const parts = await readMultipartFormData(event)
  const fields = textFields(parts)
  const files = pickParts(parts, 'file')
  const title = fields.title?.trim()
  const content = fields.content?.trim()
  if (!title || !content) {
    throw createError({ statusCode: 400, statusMessage: 'タイトルと本文は必須です' })
  }
  if (!files[0]) {
    throw createError({ statusCode: 400, statusMessage: '画像を1枚指定してください' })
  }
  const saved = await saveUpload(files[0], user.username, 'image')
  return prisma.situations.create({
    data: {
      title,
      content,
      img_url: saved.url,
      contributor: user.username
    }
  })
})
