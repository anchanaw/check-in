<template>
  <div class="noti-page">
    <!-- Header -->
    <div class="noti-header">
      <a-button type="text" shape="circle" @click="goBack" class="back-btn">
        <ArrowLeftOutlined />
      </a-button>

      <span class="title">Notifications</span>


      <a-button class="clear-btn" type="text" danger shape="circle" :disabled="!notifications.length" @click="clearAll">
        <img src="/icons/delete.svg" class="icon" alt="delete" />
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

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ArrowLeftOutlined } from '@ant-design/icons-vue'
import NotificationItem from '@/components/mentor/NotificationItem.vue'
import { useMentorNotifications } from '@/composables/mentor/useMentorNotifications'

const router = useRouter()

// 🔥 ใช้ composable ตัวเดียวกับหน้า dashboard
const {
  notifications,
  loading,
  fetchNotifications
} = useMentorNotifications()

const goBack = () => {
  router.push('/mentor')
}

const onDetail = (noti: any) => {
  console.log('detail:', noti)
}

const removeNoti = (id: string) => {
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
