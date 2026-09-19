export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const topic = await prisma.pubtopics.findUnique({ where: { id } })
  if (!topic) {
    throw createError({ statusCode: 404, statusMessage: 'トピックが見つかりません' })
  }
  return topic
})
