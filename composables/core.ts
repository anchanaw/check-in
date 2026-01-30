import { useAuthStore } from '~/stores/auth.store'
import { useAuthApi } from '~/composables/api/useAuthApi'

export const useApi = () => {
  const authStore = useAuthStore()
  const { refresh } = useAuthApi()

  const apiFetch = async (
    url: string,
    options: any = {},
    retried = false
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
      // 🔴 access token หมดอายุ
      if (err?.status === 401 && authStore.refresh_token && !retried) {
        try {
          const res: any = await refresh(authStore.refresh_token)

          authStore.setTokens({
            access_token: res.access_token,
            refresh_token: res.refresh_token
          })

          // 🔁 retry request เดิม
          return apiFetch(url, options, true)
        } catch (refreshErr) {
          authStore.clearTokens()
          navigateTo('/login')
          throw refreshErr
        }
      }

      throw err
    }
  }

  return { apiFetch }
}
