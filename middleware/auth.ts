export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore()

  if (!authStore.access_token) {
    return navigateTo('/login')
  }
})
