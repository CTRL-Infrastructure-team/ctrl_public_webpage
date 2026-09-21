export default defineEventHandler(async () => {
  return prisma.situations.findMany({
    orderBy: { created_at: 'desc' }
  })
})
