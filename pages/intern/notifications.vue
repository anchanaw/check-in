<template>
  <div class="noti-page">
    <!-- Header -->
    <div class="noti-header">
      <div class="header-left">
          <BackButton />
        <span class="title">Notifications</span>
      </div>

      <a-button type="text" danger shape="circle" @click="clearAll">
        <DeleteOutlined />
      </a-button>
    </div>

    <!-- Content -->
    <div class="noti-list">
      <NotificationItem v-for="noti in notifications" :key="noti.id" :data="noti" @detail="onDetail"
        @remove="removeNoti" />

      <a-empty v-if="!notifications.length" description="No notifications" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'
import { useApi } from '~/composables/core'
import NotificationItem from '@/components/intern/NotificationItem.vue'
import {
  ArrowLeftOutlined,
  DeleteOutlined
} from '@ant-design/icons-vue'
import BackButton from '~/components/base/BackButton.vue'

const { apiFetch } = useApi()

const notifications = ref<Notification[]>([])
const loading = ref(false)

type Notification = {
  id: string
  title: string
  body: string
  createdAt: string
}
onMounted(async () => {
  try {
    loading.value = true

    const res: any = await apiFetch('/tasks')

    const tasks = res?.data || res || []

    console.log('TASKS:', tasks)

    const threeDaysAgo = dayjs().subtract(3, 'day')

    const recentTasks = tasks.filter((task: any) =>
      dayjs(task.createdAt).isAfter(threeDaysAgo)
    )

    recentTasks.sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )

    notifications.value = recentTasks.map((task: any) => ({
      id: task.id,
      title: task.title,
      body: `${task.points} pts`,
      createdAt: dayjs(task.createdAt)
        .add(7, 'hour')
        .format('DD/MM/YYYY HH:mm')
    }))

  } catch (err) {
    console.error('Notification error:', err)
  } finally {
    loading.value = false
  }
})

const onDetail = (noti: Notification) => {
  console.log('detail:', noti)
}

const removeNoti = (id: string) => {
  notifications.value = notifications.value.filter(
    n => n.id !== id
  )
}

const clearAll = () => {
  notifications.value = []
}
</script>

<style scoped>
.noti-page {
  background-color: #6ec1ff;
  min-height: 100vh;
}

/* Header */
.noti-header {
  height: 56px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 6px;
}

.title {
  font-size: 16px;
  font-weight: 500;
}

/* Content */
.noti-list {
  padding: 12px;
}
</style>
