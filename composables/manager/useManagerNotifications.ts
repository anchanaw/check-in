import { ref } from 'vue'
import { useApi } from '~/composables/core'

const notifications = ref<any[]>([])
const unreadCount = ref(0)
const loading = ref(false)

export const useManagerNotifications = () => {

  const fetchNotifications = async () => {
    const { apiFetch } = useApi()
    loading.value = true

    try {
      // 🔥 Manager ดู leave pending ทั้งหมด
      const leaveRes: any = await apiFetch('/leaves/pending')

      const leaveList =
        leaveRes?.data?.data ??
        leaveRes?.data ??
        []

      notifications.value = leaveList.map((l: any) => ({
        id: `leave-${l.id}`,
        type: 'leave',
        title: 'Leave request pending',
        body: `${l.user?.display_name || 'Intern'} requested leave`,
        refId: l.id,
        unread: true
      }))

      unreadCount.value = notifications.value.length

    } catch (err) {
      console.error('Manager notification error:', err)
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