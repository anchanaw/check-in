<template>
  <a-card
    class="noti-card"
    :class="{ unread }"
  >
    <div class="card-content">
      <!-- Icon -->
      <div class="icon">
        <component :is="iconComponent" />
      </div>

      <!-- Text -->
      <div class="text">
        <div class="card-title">{{ data.title }}</div>
        <div class="card-body">{{ data.body }}</div>

        <a-button
          size="small"
          class="detail-btn"
          type="link"
          @click="$emit('detail', data)"
        >
          Detail
        </a-button>
      </div>

      <!-- Remove -->
      <a-button
        type="text"
        danger
        @click="$emit('remove', data.id)"
      >
        ✕
      </a-button>
    </div>
  </a-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from '~/composables/core'
import NotificationItem from '@/components/mentor/NotificationItem.vue'

const router = useRouter()

const loading = ref(true)
const notifications = ref<any[]>([])

onMounted(async () => {
  const { apiFetch } = useApi() // ✅ เรียกตรงนี้

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

  } finally {
    loading.value = false
  }
})

const goBack = () => router.back()

const onDetail = (noti: any) => {
  if (noti.type === 'task') {
    router.push(`/mentor/review_bonus/${noti.refId}`)
  }

  if (noti.type === 'leave') {
    router.push(`/mentor/leave_review/${noti.refId}`)
  }
}

const removeNoti = (id: string) => {
  notifications.value = notifications.value.filter(n => n.id !== id)
}

const clearAll = () => {
  notifications.value = []
}
</script>

<style scoped>
.noti-card {
  border-radius: 8px;
  margin-bottom: 8px;
}

.noti-card :deep(.ant-card-body) {
  padding: 11px 16px;
}

.noti-card.unread {
  background-color: #eef5ff;
}

.card-content {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.icon {
  font-size: 20px;
  margin-top: 4px;
}

.text {
  flex: 1;
}

.card-title {
  font-weight: 600;
}

.card-body {
  font-size: 13px;
  color: #555;
  margin-bottom: 6px;
}

.detail-btn {
  padding: 0;
}
</style>
