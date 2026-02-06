// middleware/auth.global.ts
export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()

  // ✅ public pages ที่ไม่ต้อง login
  const publicRoutes = ['/login', '/register']

  // 🔒 ยังไม่ login และไม่ใช่ public → ไป login
  if (!auth.isLoggedIn && !publicRoutes.includes(to.path)) {
    return navigateTo('/login')
  }

  // 🔐 role guard (เฉพาะตอน login แล้ว)
  if (auth.isLoggedIn) {
    if (auth.role === 'intern' && to.path.startsWith('/manager')) {
      return navigateTo('/intern')
    }

    if (auth.role === 'manager' && to.path.startsWith('/intern')) {
      return navigateTo('/manager')
    }
  }
})
