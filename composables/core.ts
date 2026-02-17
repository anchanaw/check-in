import { useAuthStore } from '~/stores/auth.store'
import { navigateTo } from '#app'

export const useApi = () => {
  const apiFetch = async <T>(url: string, options: any = {}) => {

    // 👇 เรียก store ภายใน function แทน
    const authStore = useAuthStore()

    const publicEndpoints = ['/auth/login', '/auth/register']
    const isPublicEndpoint = publicEndpoints.some(endpoint =>
      url.startsWith(endpoint)
    )

    const headers: any = {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }

    if (!isPublicEndpoint && authStore.access_token) {
      headers.Authorization = `Bearer ${authStore.access_token}`
    }

    try {
      return await $fetch<T>(`/api${url}`, {
        ...options,
        headers
      })
    } catch (err: any) {
      const status = err?.response?.status || err?.status

      if (status === 401) {
        authStore.clearAuth()
        await navigateTo('/login')
      }

      throw err
    }
  }

  return { apiFetch }
}
