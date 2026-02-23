export default defineNuxtRouteMiddleware((to) => {

  if (import.meta.server) return

  const auth = useAuthStore()

  const publicRoutes = ['/login', '/register', '/invite']
  const isPublic = publicRoutes.some(route =>
    to.path.startsWith(route)
  )

  const homeByRole = {
    intern: '/intern',
    manager: '/manager',
    mentor: '/mentor'
  } as const
  if (!auth.access_token && to.path === '/login') return
  // 🔐 ถ้า login แล้ว ห้ามเข้า public page
  if (auth.access_token && isPublic) {
    return navigateTo(homeByRole[auth.role!])
  }

  // 🔐 ถ้ายังไม่ login
  if (!auth.access_token && !isPublic) {
    return navigateTo('/login')
  }

  // 🔐 ถ้า login แล้ว แต่เข้าโซนผิด
  if (auth.access_token && auth.role) {
    const ownHome = homeByRole[auth.role]
    if (!to.path.startsWith(ownHome)) {
      return navigateTo(ownHome)
    }
  }
})