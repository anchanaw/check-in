<template>
  <div class="noti-page">
    <!-- Header -->
    <div class="noti-header">
        <BackButton />

      <span class="title">Notifications</span>


      <a-button class="clear-btn" type="text" danger shape="circle" :disabled="!notifications.length" @click="clearAll">
        <img src="/icons/delete.svg" class="icon" alt="delete" />
      </a-button>
    </div>

    <!-- Content -->
    <div class="noti-list">
      <NotificationItem v-for="noti in notifications" :key="noti.id" :data="noti" :unread="noti.unread"
        @remove="removeNotification" />

      <a-empty v-if="!loading && !notifications.length" description="No mentor notifications" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMentorNotifications } from '@/composables/mentor/useMentorNotifications'
import NotificationItem from '@/components/manager/NotificationItem.vue'
import BackButton from '~/components/base/BackButton.vue'

const {
  notifications,
  loading,
  fetchNotifications,
  removeNotification,
  clearAll
} = useMentorNotifications()

onMounted(fetchNotifications)

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
