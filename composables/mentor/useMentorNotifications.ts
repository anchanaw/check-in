import { ref, computed, onMounted, onUnmounted } from 'vue'
import axios from 'axios'
import { notification } from 'ant-design-vue'

interface NotificationItem {
  id: string
  message: string
  type: 'task' | 'leave'
}

export const useMentorNotifications = () => {
  const notifications = ref<NotificationItem[]>([])
  const loading = ref(false)

  let interval: any = null

  const fetchNotifications = async () => {
    try {
      loading.value = true

      const [tasksRes, leavesRes] = await Promise.all([
        axios.get('/tasks/submissions/pending'),
        axios.get('/leaves/pending')
      ])

      const taskNoti = tasksRes.data.map((task: any) => ({
        id: `task-${task.id}`,
        message: `${task.intern_name} submitted "${task.title}"`,
        type: 'task'
      }))

      const leaveNoti = leavesRes.data.map((leave: any) => ({
        id: `leave-${leave.id}`,
        message: `${leave.intern_name} requested leave`,
        type: 'leave'
      }))

      const newList = [...taskNoti, ...leaveNoti]

      // 🔥 ตรวจว่าอันไหนใหม่ (เพื่อ toast)
      if (notifications.value.length > 0 && newList.length > notifications.value.length) {
        notification.open({
          message: 'New Notification',
          description: 'You have new pending activity.'
        })
      }

      notifications.value = newList

    } catch (err) {
      console.error('Notification error:', err)
    } finally {
      loading.value = false
    }
  }

  const unreadCount = computed(() => notifications.value.length)

  onMounted(() => {
    fetchNotifications()

    // ⚡ Auto refresh ทุก 30 วิ
    interval = setInterval(fetchNotifications, 30000)
  })

  onUnmounted(() => {
    clearInterval(interval)
  })

  return {
    notifications,
    unreadCount,
    loading,
    fetchNotifications
  }
}
