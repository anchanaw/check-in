// composables/useCurrentUser.ts
import { ref } from 'vue'

export const useCurrentUser = () => {
  const user = ref({
    name: 'Sommai',
    role: 'Mentor',
    team: 'Frontend Development'
  })

  const fetchUser = async () => {
    /**
     * TODO:
     * const res = await api.get('/me')
     * user.value = res.data
     */
    // ตอนนี้ใช้ mock
    return user.value
  }

  return {
    user,
    fetchUser
  }
}
