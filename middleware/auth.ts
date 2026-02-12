export default defineNuxtRouteMiddleware(() => {

  if (import.meta.dev) return
  
  const authStore = useAuthStore()
  if (!authStore.access_token) {
    return navigateTo('/login')
  }
})
