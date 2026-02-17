import { ref } from 'vue'
import { useApi } from '~/composables/core'

// ✅ shared state
const notifications = ref<any[]>([])
const unreadCount = ref(0)
const loading = ref(false)

export const useMentorNotifications = () => {

  const fetchNotifications = async () => {
    const { apiFetch } = useApi()
    loading.value = true

    try {
      const taskRes: any = await apiFetch('/tasks/submissions/pending')
      const leaveRes: any = await apiFetch('/leaves/pending')

      notifications.value = [
        ...taskRes.data.map((t: any) => ({
          id: `task-${t.id}`,
          type: 'task',
          title: 'Task submitted',
          body: 'Intern submitted a bonus task',
          refId: t.id,
          unread: true
        })),
        ...leaveRes.data.map((l: any) => ({
          id: `leave-${l.id}`,
          type: 'leave',
          title: 'Leave request pending',
          body: 'Intern requested leave',
          refId: l.id,
          unread: true
        }))
      ]

      unreadCount.value = notifications.value.length

    } catch (err) {
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const removeNotification = (id: string) => {
    notifications.value = notifications.value.filter(n => n.id !== id)
    unreadCount.value = notifications.value.length
  }

  const clearAll = () => {
    notifications.value = []
    unreadCount.value = 0
  }

  return {
    notifications,
    unreadCount,
    loading,
    fetchNotifications,
    removeNotification,
    clearAll
  }
}
