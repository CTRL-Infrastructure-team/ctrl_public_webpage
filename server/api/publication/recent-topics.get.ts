export default defineEventHandler(async () => {
  return prisma.pubtopics.findMany({
    where: { pubterms_id: null },
    orderBy: { date: 'desc' }
  })
})
