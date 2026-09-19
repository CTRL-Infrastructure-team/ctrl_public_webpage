export default defineEventHandler(async (event) => {
  const user = await requireUser(event).catch(() => null)
  return { user: user ? publicUser(user) : null }
})
