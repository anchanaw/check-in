export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return

    if (import.meta.dev) return

  const auth = useAuthStore()
  const publicRoutes = ['/login', '/register']

  if (!auth.isLoggedIn && !publicRoutes.includes(to.path)) {
    return navigateTo('/login')
  }

  if (auth.isLoggedIn && auth.role) {
    const homeByRole = {
      intern: '/intern',
      manager: '/manager',
      mentor: '/mentor'
    } as const

    const roleRoots = Object.values(homeByRole)
    const ownHome = homeByRole[auth.role]
    const isRoleRoot = roleRoots.some((root) => to.path.startsWith(root))

    if (isRoleRoot && !to.path.startsWith(ownHome)) {
      return navigateTo(ownHome)
    }
  }
})
