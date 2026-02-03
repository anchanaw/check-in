export const useMentorNotifications = () => {
  const loading = ref(true)
  const unreadCount = ref(0)

  const fetchNotifications = async () => {
    loading.value = true

    // 🔹 MOCK (รอ API)
    await new Promise(r => setTimeout(r, 500))
    unreadCount.value = 3

    // 🔹 API จริงในอนาคต
    // const res = await $fetch('/api/mentor/notifications/unread-count')
    // unreadCount.value = res.count

    loading.value = false
  }

  onMounted(fetchNotifications)

  return {
    loading,
    unreadCount,
    refetch: fetchNotifications
  }
}
