import { ref, onMounted, onUnmounted } from 'vue'
import { useApi } from '~/composables/core'

export function useMentorDashboard() {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const { apiFetch } = useApi()

  const overview = ref({
    internCount: 0,
    taskToReview: 0,
    leaveRequests: 0
  })

  // helper รองรับทั้ง array และ object { data: [] }
  const getLength = (res: any) => {
    if (Array.isArray(res?.data)) return res.data.length
    if (Array.isArray(res?.data?.data)) return res.data.data.length
    return 0
  }

  let isMounted = true

  const fetchOverview = async () => {
    try {
      loading.value = true
      error.value = null

      const [internsRes, tasksRes, leaveRes] = await Promise.all([
        apiFetch('/users/interns'),
        apiFetch('/tasks/submissions/pending'),
        apiFetch('/leaves/pending')
      ])

      if (!isMounted) return

      overview.value = {
        internCount: getLength(internsRes),
        taskToReview: getLength(tasksRes),
        leaveRequests: getLength(leaveRes)
      }

    } catch (err: any) {
      if (!isMounted) return

      console.error('Mentor dashboard error:', err)
      error.value = err?.response?.data?.message || 'Failed to load dashboard data'
    } finally {
      if (isMounted) {
        loading.value = false
      }
    }
  }

  onMounted(fetchOverview)

  onUnmounted(() => {
    isMounted = false
  })

  return {
    loading,
    error,
    overview,
    fetchOverview
  }
}
