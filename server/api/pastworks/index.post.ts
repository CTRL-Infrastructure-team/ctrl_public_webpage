export default defineEventHandler(async (event) => {
  const user = await requireUser(event)
  const parts = await readMultipartFormData(event)
  const fields = textFields(parts)
  const title = fields.title?.trim()
  const content = fields.content?.trim()
  const twitter = fields.twitter === 'true'
  const topImage = pickParts(parts, 'topImage')
  const otherImage = pickParts(parts, 'otherImage')
  const gameFile = pickParts(parts, 'gameFile')

  if (!title || !content) {
    throw createError({ statusCode: 400, statusMessage: 'タイトルと本文は必須です' })
  }
  if (!topImage[0] || otherImage.length < 2 || !gameFile[0]) {
    throw createError({ statusCode: 400, statusMessage: '画像3枚とzipファイルが必要です' })
  }

  const top = await saveUpload(topImage[0], user.username, 'image')
  const other0 = await saveUpload(otherImage[0], user.username, 'image')
  const other1 = await saveUpload(otherImage[1], user.username, 'image')
  const game = await saveUpload(gameFile[0], user.username, 'zip')

  return prisma.pastworks.create({
    data: {
      title,
      content,
      download_url: game.url,
      top_img_url: top.url,
      other_img_url_0: other0.url,
      other_img_url_1: other1.url,
      contributor: user.username,
      twitter_id: twitter ? user.twitter_id : ''
    }
  })
})
