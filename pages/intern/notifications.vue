<template>
  <div class="noti-page">
    <!-- Header -->
    <div class="noti-header">
      <div class="header-left">
        <a-button type="text" shape="circle" @click="goBack">
          <ArrowLeftOutlined />
        </a-button>
        <span class="title">Notifications</span>
      </div>

      <a-button type="text" danger shape="circle" @click="clearAll">
        <DeleteOutlined />
      </a-button>
    </div>

    <!-- Content -->
    <div class="noti-list">
      <NotificationItem
        v-for="noti in notifications"
        :key="noti.id"
        :data="noti"
        @detail="onDetail"
        @remove="removeNoti"
      />

      <a-empty
        v-if="!notifications.length"
        description="No notifications"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import NotificationItem from '@/components/intern/NotificationItem.vue'
import {
  ArrowLeftOutlined,
  DeleteOutlined
} from '@ant-design/icons-vue'

const router = useRouter()
const notifications = ref([
  {
    id: 1,
    title: 'Title',
    body: 'Body text.'
  }
])

const goBack = () => {
  router.back()
}

const onDetail = (noti) => {
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
