// composables/core.ts
import { useAuthStore } from '~/stores/auth.store'
import { navigateTo } from '#app'

export const useApi = () => {
  const authStore = useAuthStore()

  const apiFetch = async (
    url: string,
    options: any = {}
  ) => {
    try {
      return await $fetch(url, {
        baseURL: 'http://localhost:3000',
        ...options,
        headers: {
          ...(options.headers || {}),
          ...(authStore.access_token
            ? { Authorization: `Bearer ${authStore.access_token}` }
            : {})
        }
      })
    } catch (err: any) {
      // ❌ ยังไม่ทำ refresh ที่ core (กัน loop)
      if (err?.status === 401) {
        authStore.clearAuth()
        navigateTo('/login')
      }
      throw err
    }
  }

  return { apiFetch }
}
