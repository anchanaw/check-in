import { ref } from 'vue'
import { useApi } from '~/composables/core'

interface BonusTask {
    id: string
    internName: string
    taskTitle: string
    bonusPoint: number
    content: string
    submittedAt: string
}

export function useBonusReview() {
    const loading = ref(false)
    const tasks = ref<BonusTask[]>([])
    const error = ref<string | null>(null)
    const { apiFetch } = useApi()

    const fetchPending = async () => {
        try {
            loading.value = true
            error.value = null

            // 1️⃣ ดึง intern ทั้งหมด
            const internRes = await apiFetch<{
                success: boolean
                data: any[]
            }>('/users/interns')
            const internMap: Record<string, string> = {}

            if (internRes && typeof internRes === 'object' && 'data' in internRes) {
                internRes.data.forEach((i: any) => {
                    internMap[i.id] = `${i.firstName} ${i.lastName}`
                })
            }

            // 2️⃣ ดึง pending submissions
            const submissionRes = await apiFetch<{
                success: boolean
                data: any[]
            }>('/tasks/submissions/pending')
            const submissions = (submissionRes && typeof submissionRes === 'object' && 'data' in submissionRes) ? submissionRes.data : []

            // 3️⃣ ดึง task detail
            tasks.value = await Promise.all(
                submissions.map(async (item: any) => {
                    const taskRes = await apiFetch<{
                        success: boolean
                        data: any
                    }>(`/tasks/${item.taskId}`)
                    const taskData = taskRes.data

                    return {
                        id: item.id,
                        internName: internMap[item.internId] || 'Unknown',
                        taskTitle: taskData.title,
                        bonusPoint: taskData.points,
                        content: item.content,
                        submittedAt: item.submittedAt
                    }
                })
            )

        } catch (err: any) {
            error.value =
                err.response?.data?.message ||
                err.message ||
                'Failed to fetch bonus tasks'
        } finally {
            loading.value = false
        }
    }

    const reviewSubmission = async (
        id: string,
        status: 'approved' | 'rejected',
        comment?: string
    ) => {
        try {
            await apiFetch(`/tasks/submissions/${id}/review`, {
                status,
                comment
            })

            tasks.value = tasks.value.filter(t => t.id !== id)

        } catch (err: any) {
            throw err.response?.data?.message || 'Review failed'
        }
    }

    return {
        loading,
        tasks,
        error,
        fetchPending,
        reviewSubmission
    }
}
