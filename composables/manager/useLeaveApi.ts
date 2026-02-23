import { useAuthStore } from '~/stores/auth.store'
import { useRuntimeConfig } from '#imports'

export const useLeaveApi = () => {
  const auth = useAuthStore()
  const config = useRuntimeConfig()

  const getPendingLeaves = async () => {
    return await $fetch('/leaves?status=pending', {
      baseURL: config.public.apiBase as string,
      headers: {
        Authorization: `Bearer ${auth.access_token}`
      }
    })
  }

  const reviewLeave = async (
    id: string,
    status: 'approved' | 'rejected'
  ) => {
    return await $fetch(`/leaves/${id}/review`, {
      method: 'PATCH',
      baseURL: config.public.apiBase as string,
      body: { status },
      headers: {
        Authorization: `Bearer ${auth.access_token}`
      }
    })
  }

  return {
    getPendingLeaves,
    reviewLeave
  }
}