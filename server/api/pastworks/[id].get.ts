export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const work = await prisma.pastworks.findUnique({ where: { id } })
  if (!work) {
    throw createError({ statusCode: 404, statusMessage: '作品が見つかりません' })
  }
  return work
})
