import { ref } from 'vue'
import { useApi } from '~/composables/core'

const { apiFetch } = useApi()

interface CurrentUser {
  id: string
  email: string
  role: string
  firstName: string
  lastName: string
}

export const useCurrentUser = () => {
  const user = ref<{
    id: string
    name: string
    role: string
    email: string
  } | null>(null)

  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchUser = async () => {
    try {
      loading.value = true
      error.value = null

      const res = await apiFetch<{
        success: boolean
        data: CurrentUser
      }>('/auth/me')
      const data: CurrentUser = (res as { data: CurrentUser }).data

      user.value = {
        id: data.id,
        name: `${data.firstName} ${data.lastName}`,
        role: data.role,
        email: data.email
      }

    } catch (err: any) {
      error.value =
        err.response?.data?.message ||
        err.message ||
        'Failed to fetch user'
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    loading,
    error,
    fetchUser
  }
}
