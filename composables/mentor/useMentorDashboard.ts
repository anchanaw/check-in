import { getMentorDashboard } from '@/services/mentor/dashboard.service'

export const useMentorDashboard = () => {
  const loading = ref(true)
  const error = ref(false)

  const overview = ref({
    internCount: 0,
    taskToReview: 0,
    leaveRequests: 0
  })

  const fetchDashboard = async () => {
    loading.value = true
    error.value = false

    try {
      overview.value = await getMentorDashboard()
    } catch (e) {
      error.value = true
    } finally {
      loading.value = false
    }
  }

  onMounted(fetchDashboard)

  return {
    loading,
    error,
    overview,
    refetch: fetchDashboard
  }
}
