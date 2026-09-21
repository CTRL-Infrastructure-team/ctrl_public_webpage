export default defineEventHandler(async (event) => {
  const user = await requireUser(event)
  return prisma.situations.findMany({
    orderBy: { created_at: 'desc' },
    where: { contributor: user.username }
  })
})
