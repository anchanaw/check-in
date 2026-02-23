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

  // ยังไม่ login → เข้า public ได้
  if (!auth.access_token && isPublic) return

  // ยังไม่ login → ห้ามเข้า private
  if (!auth.access_token && !isPublic) {
    return navigateTo('/login')
  }

  // login แล้ว → ห้ามกลับหน้า login
  if (auth.access_token && to.path === '/login') {
    return navigateTo(homeByRole[auth.role!])
  }

  // login แล้ว เข้าโซนผิด
  if (auth.access_token && auth.role) {
    const ownHome = homeByRole[auth.role]
    if (!to.path.startsWith(ownHome)) {
      return navigateTo(ownHome)
    }
  }
})