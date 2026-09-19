export default defineEventHandler(async (event) => {
  const user = await requireUser(event)
  const id = getRouterParam(event, 'id')
  const work = await prisma.pastworks.findUnique({ where: { id } })
  if (!work) {
    throw createError({ statusCode: 404, statusMessage: '作品が見つかりません' })
  }
  assertOwner(work.contributor, user.username)
  await Promise.all([
    deletePublicFile(work.top_img_url),
    deletePublicFile(work.other_img_url_0),
    deletePublicFile(work.other_img_url_1),
    deletePublicFile(work.download_url)
  ])
  await prisma.pastworks.delete({ where: { id } })
  return { ok: true }
})
