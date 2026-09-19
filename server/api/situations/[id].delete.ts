export default defineEventHandler(async (event) => {
  const user = await requireUser(event)
  const id = getRouterParam(event, 'id')
  const situation = await prisma.situations.findUnique({ where: { id } })
  if (!situation) {
    throw createError({ statusCode: 404, statusMessage: '活動報告が見つかりません' })
  }
  assertOwner(situation.contributor, user.username)
  await deletePublicFile(situation.img_url)
  await prisma.situations.delete({ where: { id } })
  return { ok: true }
})
