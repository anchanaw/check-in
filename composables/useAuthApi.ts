// composables/useAuthApi.ts
import { useAuthStore } from '~/stores/auth.store'
import type { LoginResponse, RegisterResponse } from '~/types/auth'

export const useAuthApi = () => {
  const authStore = useAuthStore()
  const config = useRuntimeConfig()

  // ===== LOGIN =====
  const login = async (data: {
    username: string
    password: string
  }) => {
    console.log('AUTH API LOGIN CALLED')

    const res = await $fetch<LoginResponse>(
      '/api/auth/login',
      {
        baseURL: config.public.apiBase,
        method: 'POST',
        body: data
      }
    )

    authStore.setAuth({
      access_token: res.access_token,
      refresh_token: res.refresh_token,
      role: res.user.role
    })

    return res
  }

  // ===== REGISTER =====
  const register = async (data: any) => {
    const res = await $fetch<RegisterResponse>(
      '/api/auth/register',
      {
        baseURL: config.public.apiBase,
        method: 'POST',
        body: data
      }
    )

    return res
  }

  // 👇 สำคัญ: export ทั้งคู่
  return { login, register }
}
