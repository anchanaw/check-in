import { ref } from 'vue'
import { useApi } from '~/composables/core'

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

      console.log('TASK RES FULL:', taskRes)
      console.log('LEAVE RES FULL:', leaveRes)

      // 🔥 รองรับทั้ง 2 แบบ
      const taskList =
        taskRes?.data?.data ??
        taskRes?.data ??
        []

      const leaveList =
        leaveRes?.data?.data ??
        leaveRes?.data ??
        []

      console.log('TASK LIST:', taskList)
      console.log('LEAVE LIST:', leaveList)

      notifications.value = [
        ...taskList.map((t: any) => ({
          id: `task-${t.id}`,
          type: 'task',
          title: 'Task submitted',
          body: 'Intern submitted a bonus task',
          refId: t.id,
          unread: true
        })),
        ...leaveList.map((l: any) => ({
          id: `leave-${l.id}`,
          type: 'leave',
          title: 'Leave request pending',
          body: 'Intern requested leave',
          refId: l.id,
          unread: true
        }))
      ]

      unreadCount.value = notifications.value.length

      console.log('FINAL NOTIFICATIONS:', notifications.value)

    } catch (err) {
      console.error('Notification error:', err)
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
