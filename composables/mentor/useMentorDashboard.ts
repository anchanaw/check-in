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

      // 🔥 ดึง profile ตัวเองก่อน
      const me = await apiFetch<MeResponse>('/auth/me')
      const myId = me.data.id

      // 🔥 ดึงข้อมูลทั้งหมดพร้อมกัน
      const [teamsRes, tasksRes, leaveRes] = await Promise.all([
        apiFetch<TeamsResponse>('/teams'),
        apiFetch<any>('/tasks/submissions/pending'),
        apiFetch<any>('/leaves/pending')
      ])

      if (!isMounted) return

      const allTeams = teamsRes.data.teams

      // 🔥 filter ทีมที่ mentorId ตรงกับตัวเอง
      const myTeams = allTeams.filter(
        team => team.mentorId === myId
      )

      // 🔥 รวม intern ของทีมตัวเอง
      const internCount = myTeams.reduce(
        (total, team) => total + (team.interns?.length || 0),
        0
      )

      overview.value = {
        internCount,
        taskToReview: Array.isArray(tasksRes?.data)
          ? tasksRes.data.length
          : 0,
        leaveRequests: Array.isArray(leaveRes?.data)
          ? leaveRes.data.length
          : 0
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