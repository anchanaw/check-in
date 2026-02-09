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
    console.log('apiFetch called:', url)

    // 🔑 public endpoints (ไม่ต้องแนบ token)
    const isPublicEndpoint =
      url.includes('/login') || url.includes('/register')

    try {
      return await $fetch<T>(url, {
        baseURL: config.public.apiBase,
        ...options,
        headers: {
          ...(options.headers || {}),
          ...(!isPublicEndpoint && authStore.access_token
            ? { Authorization: `Bearer ${authStore.access_token}` }
            : {})
        }
      })
    } catch (err: any) {
      if (err?.status === 401) {
        authStore.clearAuth()
        navigateTo('/login')
      }
      throw err
    }
  }

  return { apiFetch }
}
