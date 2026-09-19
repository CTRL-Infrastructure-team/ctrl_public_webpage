export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  return prisma.pubslides.findMany({
    where: { pubtopics_id: id },
    orderBy: [{ grade: 'desc' }, { contributor: 'asc' }]
  })
})
