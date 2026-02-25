import { useAuthStore } from '~/stores/auth.store'
import { navigateTo } from '#app'
import { config } from 'process'
import { useRuntimeConfig } from '#app'

export const useApi = () => {
  const apiFetch = async <T>(url: string, options: any = {}) => {

    const authStore = useAuthStore()
    const config = useRuntimeConfig()

    const publicEndpoints = ['/auth/login', '/auth/register']
    const isPublicEndpoint = publicEndpoints.some(endpoint =>
      url.startsWith(endpoint)
    )

    const isFormData = options.body instanceof FormData

    const headers: any = {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
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
      const status = err?.response?.status || err?.status

      if (status === 401 && authStore.access_token) {
        authStore.clearAuth()
        await navigateTo('/login')
      }
      throw err
    }
  }

  return { apiFetch }
}
