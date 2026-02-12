// composables/useAuthApi.ts
import type { LoginResponse, RegisterResponse } from '~/types/auth'

export const useAuthApi = () => {
  const config = useRuntimeConfig()

  // ===== INTERN LOGIN =====
  const login = async (data: {
    email?: string
    username?: string
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

  // ===== MANAGER LOGIN =====
  const loginManager = async (data: {
    email: string
    password: string
  }) => {
    return await $fetch<LoginResponse>(
      '/auth/manager/login',
      {
        baseURL: config.public.apiBase,
        method: 'POST',
        body: data
      }
    )
  }

  // ===== REGISTER =====
  const register = async (data: any) => {
    return await $fetch<RegisterResponse>(
      '/api/auth/register',
      {
        baseURL: config.public.apiBase,
        method: 'POST',
        body: data
      }
    )
  }

  return { login, loginManager, register }
}
