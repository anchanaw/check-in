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

  interface Team {
    id: string
    name: string
    mentorId: string
    internTotal?: number
    interns: any[]
  }

  interface TeamsResponse {
    success: boolean
    data: {
      teams: Team[]
    }
  }

  interface MeResponse {
    success: boolean
    data: {
      id: string
    }
  }

  let isMounted = true

  const fetchOverview = async () => {
    try {
      loading.value = true
      error.value = null

      const me = await apiFetch<MeResponse>('/auth/me')
      const myId = me?.data?.id

      const [teamsResult, tasksResult, leaveResult] = await Promise.allSettled([
        apiFetch<TeamsResponse>(`/teams?mentorId=${myId}&page=1&pageSize=100`),
        apiFetch<any>('/tasks/submissions/pending'),
        apiFetch<any>('/leaves/pending')
      ])

      if (!isMounted) return

      const allTeams =
        teamsResult.status === 'fulfilled'
          ? (teamsResult.value?.data?.teams || [])
          : []

      const internCount = allTeams.reduce(
        (total, team) => total + (team.internTotal ?? team.interns?.length ?? 0),
        0
      )

      const taskToReview =
        tasksResult.status === 'fulfilled'
          ? (tasksResult.value?.data?.submissions?.length ??
            (Array.isArray(tasksResult.value?.data) ? tasksResult.value.data.length : 0))
          : 0

      const leaveRequests =
        leaveResult.status === 'fulfilled'
          ? (leaveResult.value?.data?.leaves?.length ??
            (Array.isArray(leaveResult.value?.data) ? leaveResult.value.data.length : 0))
          : 0

      overview.value = {
        internCount,
        taskToReview,
        leaveRequests
      }

    } catch (err: any) {
      if (!isMounted) return

      console.error('Mentor dashboard error:', err)
      error.value =
        err?.response?.data?.message || 'Failed to load dashboard data'
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
