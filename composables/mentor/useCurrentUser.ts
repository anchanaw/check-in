// composables/useCurrentUser.ts
import { ref, onMounted } from 'vue'
import axios from 'axios'

interface User {
  name: string
  role: string
  team: string
}

export const useCurrentUser = () => {
  const user = ref<User>({
    name: '',
    role: '',
    team: ''
  })

  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchUser = async () => {
    try {
      loading.value = true
      error.value = null

      const res = await axios.get('/users/me') // หรือ /me แล้วแต่ backend
      user.value = res.data

    } catch (err: any) {
      error.value = err?.response?.data?.message ?? 'Failed to fetch user'
    } finally {
      loading.value = false
    }
  }

  onMounted(fetchUser)

  return {
    user,
    loading,
    error,
    fetchUser
  }
}
