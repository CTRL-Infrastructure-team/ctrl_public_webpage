export default defineEventHandler(async (event) => {
  const user = await requireUser(event)
  const id = getRouterParam(event, 'id')
  const situation = await prisma.situations.findUnique({ where: { id } })
  if (!situation) {
    throw createError({ statusCode: 404, statusMessage: '活動報告が見つかりません' })
  }
  assertOwner(situation.contributor, user.username)

  const parts = await readMultipartFormData(event)
  const fields = textFields(parts)
  const files = pickParts(parts, 'file')
  const title = fields.title?.trim()
  const content = fields.content?.trim()
  if (!title || !content) {
    throw createError({ statusCode: 400, statusMessage: 'タイトルと本文は必須です' })
  }

  let imgUrl = situation.img_url
  if (files[0]) {
    const saved = await saveUpload(files[0], user.username, 'image')
    await deletePublicFile(situation.img_url)
    imgUrl = saved.url
  }

  return prisma.situations.update({
    where: { id },
    data: {
      title,
      content,
      img_url: imgUrl,
      contributor: user.username
    }
  })
})
