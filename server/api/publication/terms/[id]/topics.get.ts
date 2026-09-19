export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  return prisma.pubtopics.findMany({
    where: { pubterms_id: id },
    orderBy: { date: 'desc' }
  })
})
