export default defineNuxtRouteMiddleware((to) => {

  // 🔥 DEV MODE: ข้าม auth
  if (import.meta.dev) return

  const auth = useAuthStore()

  if (!auth.isLoggedIn) {
    return navigateTo('/login')
  }

  const role = auth.role

  if (to.path.startsWith('/manager') && role !== 'manager') {
    return navigateTo(`/${role}`)
  }

  if (to.path.startsWith('/intern') && role !== 'intern') {
    return navigateTo(`/${role}`)
  }

  if (to.path.startsWith('/mentor') && role !== 'mentor') {
    return navigateTo(`/${role}`)
  }
})
