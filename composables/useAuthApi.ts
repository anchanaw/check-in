// composables/useAuthApi.ts
import type { LoginResponse, RegisterResponse } from '~/types/auth'

export const useAuthApi = () => {
  const config = useRuntimeConfig()

  // ===== LOGIN (ทุก role ใช้เส้นเดียว) =====
  const login = async (data: {
    email: string
    password: string
  }) => {
    return await $fetch<LoginResponse>(
      '/auth/login',
      {
        baseURL: config.public.apiBase,
        method: 'POST',
        body: data
      }
    )
  }

  // ===== REGISTER =====
  const register = async (data: {
    inviteCode: string
    email: string
    password: string
    firstName: string
    lastName: string
  }) => {
    return await $fetch<RegisterResponse>(
      '/auth/register',   // 🔥 เอา /api ออก
      {
        baseURL: config.public.apiBase,
        method: 'POST',
        body: data
      }
    )
  }

  return { login, register }
}
