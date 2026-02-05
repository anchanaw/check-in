export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()

// ✅ DEV: mock เป็น intern แล้วเด้งไป /intern
if (import.meta.dev && !auth.isLoggedIn) {
  auth.isLoggedIn = true
  auth.role = 'manager'

  if (!to.path.startsWith('/manager')) {
    return navigateTo('/manager')
  }
  return
}


  // 🔒 PROD: ต้อง login จริง
  if (!auth.isLoggedIn && to.path !== '/login') {
    return navigateTo('/login')
  }
})
