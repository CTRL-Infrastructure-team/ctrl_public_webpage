export default defineEventHandler(async () => {
  return prisma.pastworks.findMany({
    orderBy: { created_at: 'desc' }
  })
})
