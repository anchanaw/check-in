import { useAuthStore } from '~/stores/auth.store'
import { navigateTo } from '#app'

export const useApi = () => {
  const authStore = useAuthStore()
  const config = useRuntimeConfig()

  const apiFetch = async <T>(url: string, options: any = {}) => {
    const publicEndpoints = ['/auth/login', '/auth/register']
    const isPublicEndpoint = publicEndpoints.some(endpoint =>
      url.startsWith(endpoint)
    )

    const headers: any = {
      ...(options.headers || {})
    }

    if (!isPublicEndpoint && authStore.access_token) {
      headers.Authorization = `Bearer ${authStore.access_token}`
    }

    try {
      return await $fetch<T>(url, {
        baseURL: config.public.apiBase,
        ...options,
        headers
      })
    } catch (err: any) {
      if (err?.status === 401) {
        authStore.clearAuth()
        return navigateTo('/login')
      }
      throw err
    }
  }

  return { apiFetch }
}
