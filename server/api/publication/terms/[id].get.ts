export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const term = await prisma.pubterms.findUnique({ where: { id } })
  if (!term) {
    throw createError({ statusCode: 404, statusMessage: '活動期間が見つかりません' })
  }
  return term
})
