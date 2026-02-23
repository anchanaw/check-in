export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return

  const auth = useAuthStore()

  const publicRoutes = ['/login', '/register', '/invite']

  const isPublic = publicRoutes.some(route =>
    to.path.startsWith(route)
  )

  console.log('ROUTING TO:', to.fullPath)
  console.log('isPublic:', isPublic)
  console.log('isLoggedIn:', auth.isLoggedIn)

  if (!auth.isLoggedIn && !isPublic) {
    return navigateTo('/login')
  }

  if (auth.isLoggedIn && auth.role) {
    const homeByRole = {
      intern: '/intern',
      manager: '/manager',
      mentor: '/mentor'
    } as const

    const ownHome = homeByRole[auth.role]

    if (!to.path.startsWith(ownHome)) {
      return navigateTo(ownHome)
    }
  }
})