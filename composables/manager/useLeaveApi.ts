import { useAuthStore } from '~/stores/auth.store'
import { useRuntimeConfig } from '#imports'

export const useLeaveApi = () => {
  const auth = useAuthStore()
  const config = useRuntimeConfig()

  const getPendingLeaves = async () => {
    return await $fetch('/manager/leaves', {
      baseURL: config.public.apiBase as string,
      params: {
        status: 'pending'
      },
      headers: {
        Authorization: `Bearer ${auth.access_token}`
      }
    })
  }

  return {
    getPendingLeaves
  }
}
