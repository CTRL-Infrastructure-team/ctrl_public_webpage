export default defineEventHandler(async (event) => {
  const user = await requireUser(event)
  const id = getRouterParam(event, 'id')
  const work = await prisma.pastworks.findUnique({ where: { id } })
  if (!work) {
    throw createError({ statusCode: 404, statusMessage: '作品が見つかりません' })
  }
  assertOwner(work.contributor, user.username)

  const parts = await readMultipartFormData(event)
  const fields = textFields(parts)
  const title = fields.title?.trim()
  const content = fields.content?.trim()
  const twitter = fields.twitter === 'true'
  if (!title || !content) {
    throw createError({ statusCode: 400, statusMessage: 'タイトルと本文は必須です' })
  }

  const topImage = pickParts(parts, 'topImage')
  const otherImage = pickParts(parts, 'otherImage')
  const gameFile = pickParts(parts, 'gameFile')

  let topUrl = work.top_img_url
  let other0 = work.other_img_url_0
  let other1 = work.other_img_url_1
  let download = work.download_url

  if (topImage[0]) {
    const saved = await saveUpload(topImage[0], user.username, 'image')
    await deletePublicFile(work.top_img_url)
    topUrl = saved.url
  }
  if (otherImage[0]) {
    const saved = await saveUpload(otherImage[0], user.username, 'image')
    await deletePublicFile(work.other_img_url_0)
    other0 = saved.url
  }
  if (otherImage[1]) {
    const saved = await saveUpload(otherImage[1], user.username, 'image')
    await deletePublicFile(work.other_img_url_1)
    other1 = saved.url
  }
  if (gameFile[0]) {
    const saved = await saveUpload(gameFile[0], user.username, 'zip')
    await deletePublicFile(work.download_url)
    download = saved.url
  }

  return prisma.pastworks.update({
    where: { id },
    data: {
      title,
      content,
      download_url: download,
      top_img_url: topUrl,
      other_img_url_0: other0,
      other_img_url_1: other1,
      contributor: user.username,
      twitter_id: twitter ? user.twitter_id : ''
    }
  })
})
