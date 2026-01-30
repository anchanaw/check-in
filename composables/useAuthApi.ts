// composables/useAuthApi.ts
import { useApi } from './core'
import { useAuthStore } from '~/stores/auth.store'

const IS_DEV = import.meta.env.DEV

export const useAuthApi = () => {
  const { apiFetch } = useApi()
  const authStore = useAuthStore()

  const register = async (data: any) => {
    // 🟡 DEV MOCK REGISTER
    if (IS_DEV) {
      // สมมติ backend สมัครสำเร็จ
      console.log('🧪 MOCK REGISTER:', data)

      // เก็บ username ไว้ใช้หน้า success / login
      sessionStorage.setItem('registered_username', data.username ?? data.email)

      return {
        success: true,
        user_id: 'mock-user-001'
      }
    }

    // 🔴 REAL API
    return apiFetch('/api/auth/register', {
      method: 'POST',
      body: data
    })
  }

  const login = async (data: {
    username: string
    password: string
    invite_code?: string
  }) => {
    if (IS_DEV) {
      console.log('🧪 MOCK LOGIN:', data)

      const res = {
        access_token: 'mock-access-token',
        refresh_token: 'mock-refresh-token',
        user: {
          username: data.username,
          role: 'intern'
        }
      }

      authStore.setTokens(res)
      return res
    }

    const res: any = await apiFetch('/api/auth/login', {
      method: 'POST',
      body: data
    })

    authStore.setTokens(res)
    return res
  }

  return {
    register,
    login
  }
}
