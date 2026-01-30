import { useApi } from './core'

export const useAuthApi = () => {
  const { apiFetch } = useApi()

  return {
    login(data: {
      username: string
      password: string
    }) {
      return apiFetch('/api/auth/login', {
        method: 'POST',
        body: data
      })
    },

    register(data: any) {
      return apiFetch('/api/auth/register', {
        method: 'POST',
        body: data
      })
    },

    refresh(refresh_token: string) {
      return apiFetch('/api/auth/refresh', {
        method: 'POST',
        body: { refresh_token }
      })
    }
  }
}
