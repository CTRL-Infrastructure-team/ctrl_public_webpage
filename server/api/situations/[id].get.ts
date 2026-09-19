export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const situation = await prisma.situations.findUnique({ where: { id } })
  if (!situation) {
    throw createError({ statusCode: 404, statusMessage: '活動報告が見つかりません' })
  }
  return situation
})
