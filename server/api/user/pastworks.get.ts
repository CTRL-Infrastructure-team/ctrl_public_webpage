export default defineEventHandler(async (event) => {
  const user = await requireUser(event)
  return prisma.pastworks.findMany({
    orderBy: { created_at: 'desc' },
    where: { contributor: user.username }
  })
})
