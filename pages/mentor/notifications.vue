<template>
  <div class="noti-page">
    <!-- Header -->
    <div class="noti-header">
      <a-button type="text" shape="circle" @click="goBack" class="back-btn">
        <ArrowLeftOutlined />
      </a-button>

      <span class="title">Notifications</span>


      <a-button class="clear-btn" type="text" danger shape="circle" :disabled="!notifications.length" @click="clearAll">
        <img src="/public/icons/delete.svg" class="icon" alt="delete" />
      </a-button>
    </div>

    <!-- Content -->
    <div class="noti-list">
      <NotificationItem v-for="noti in notifications" :key="noti.id" :data="noti" @detail="onDetail"
        @remove="removeNoti" />

      <a-empty v-if="!loading && !notifications.length" description="No mentor notifications" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  ArrowLeftOutlined,
  DeleteOutlined
} from '@ant-design/icons-vue'

import NotificationItem from '@/components/mentor/NotificationItem.vue'
// ↑ ถ้าใช้ร่วม intern ได้ OK
// ถ้า mentor-only → ย้ายเป็น components/mentor/NotificationItem.vue

const router = useRouter()

const loading = ref(true)
const notifications = ref([])

/**
 * MOCK – รอ API
 */
const fetchNotifications = async () => {
  loading.value = true

  await new Promise(r => setTimeout(r, 600))

  notifications.value = [
    {
      id: 1,
      title: 'Leave request pending',
      body: 'Intern A has requested leave',
      unread: true
    },
    {
      id: 2,
      title: 'Task submitted',
      body: 'Intern B submitted a task',
      unread: false
    }
  ]

  loading.value = false
}

onMounted(fetchNotifications)

/**
 * Actions
 */
const goBack = () => {
  router.push('/mentor')
}

const onDetail = (noti) => {
  // TODO: ไปหน้ารายละเอียด (leave / task)
  console.log('detail:', noti)
}

const removeNoti = (id) => {
  notifications.value = notifications.value.filter(n => n.id !== id)
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
  justify-content: space-between;
}

.back-btn {
  font-size: 24px;
}

.title {
  font-size: 24px;
  font-weight: 500;
}

/* Content */
.noti-list {
  padding: 12px;
}

.clear-btn {
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  width: 24px;
  height: 24px;
}
</style>
