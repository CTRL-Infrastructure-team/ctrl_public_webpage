export default defineNuxtRouteMiddleware(async () => {
  const { data } = await useFetch('/api/me')
  if (!data.value?.user) {
    return navigateTo('/login')
  }
})
