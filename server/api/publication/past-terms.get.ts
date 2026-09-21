export default defineEventHandler(async () => {
  return prisma.pubterms.findMany({
    orderBy: { term: 'desc' }
  })
})
