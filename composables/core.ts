// composables/core.ts
import { useAuthStore } from '~/stores/auth.store'
import { navigateTo } from '#app'

export const useApi = () => {
  const authStore = useAuthStore()
  const config = useRuntimeConfig()

  const apiFetch = async <T>(
    url: string,
    options: any = {}
  ) => {
    try {
      return await $fetch<T>(url, {
        baseURL: config.public.apiBase,
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
