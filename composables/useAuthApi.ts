// composables/useAuthApi.ts
import { useApi } from './core'
import { useAuthStore } from '~/stores/auth.store'
import type { LoginResponse, RegisterResponse } from '~/types/auth'

export const useAuthApi = () => {
  const { apiFetch } = useApi()
  const authStore = useAuthStore()

  // ===== REGISTER =====
  const register = async (data: any) => {
    const res = await apiFetch<RegisterResponse>(
      '/api/auth/register',
      {
        method: 'POST',
        body: data
      }
    )

    return res
  }

  // ===== LOGIN =====
  const login = async (data: {
    username: string
    password: string
  }) => {
    const res = await apiFetch<LoginResponse>(
      '/api/auth/login',
      {
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

  return {
    register,
    login
  }
}
