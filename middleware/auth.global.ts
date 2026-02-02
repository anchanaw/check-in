export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()

  // ✅ DEV: mock เป็น intern แล้วเด้งไป /intern
  if (import.meta.dev && !auth.isLoggedIn) {
    auth.mockIntern()

    // ถ้ายังไม่อยู่หน้า intern ให้พาไป
    if (!to.path.startsWith('/mentor')) {
      return navigateTo('/mentor')
    }
    return
  }

  // 🔒 PROD: ต้อง login จริง
  if (!auth.isLoggedIn && to.path !== '/login') {
    return navigateTo('/login')
  }
})
