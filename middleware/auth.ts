export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()

  // 🔥 อนุญาตหน้า invite
  if (to.path.startsWith('/invite')) {
    return
  }

  if (!authStore.access_token) {
    return navigateTo('/login')
  }
})
