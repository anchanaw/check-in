<template>
  <a-layout class="page">
    <!-- Header -->
    <a-badge class="notification" :count="unreadCount" :overflow-count="99" :show-zero="false">
      <NuxtLink to="/mentor/notifications" class="bell-link">
        <BellOutlined class="bell-icon" />
      </NuxtLink>
    </a-badge>
    <div class="header">
      <a-space direction="vertical" size="2">
        <a-typography-title class="name">
          Hi, {{ user?.name }}
        </a-typography-title>

        <a-typography-text class="role">
          {{ user?.role }}
        </a-typography-text>
      </a-space>
    </div>

    <!-- Content -->
    <div class="center-wrapper">
      <BaseCard class="outer-card">
        <a-space direction="vertical" :size="27" style="width:100%">
          <div class="space-item">
            <OverviewCard :loading="loading" :data="overview"/>
          </div>
          <div class="space-item">
            <ActionCard />
          </div>
        </a-space>
      </BaseCard>
    </div>

    <MentorBottomBar />
  </a-layout>
</template>

<script setup>
import { useMentorDashboard } from '@/composables/mentor/useMentorDashboard'
import { useMentorNotifications } from '@/composables/mentor/useMentorNotifications'
import { ref, onMounted } from 'vue'

import BaseCard from '~/components/base/BaseCard.vue'
import OverviewCard from '@/components/mentor/dashboard/OverviewCard.vue'
import ActionCard from '@/components/mentor/dashboard/ActionCard.vue'
import MentorBottomBar from '@/components/mentor/MentorBottomBar.vue'
import { BellOutlined } from '@ant-design/icons-vue'
import { useCurrentUser } from '@/composables/mentor/useCurrentUser'

const { user, fetchUser } = useCurrentUser()
const { loading, overview, fetchOverview } = useMentorDashboard()
const { unreadCount, fetchNotifications } = useMentorNotifications()

onMounted(() => {
  fetchUser()
  fetchOverview()
  fetchNotifications()
})

</script>

<style scoped>
.page {
  position: fixed;
  /* ยึดเต็มหน้าจอ */
  inset: 0;
  /* top:0 right:0 bottom:0 left:0 */

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 0 16px;
  background: #6CBCFA;
}

.card-spacing {
  width: 100%;
}

.center-wrapper {
  display: flex;
  justify-content: center;
}

.outer-card {
  width: 100%;
  max-width: 360px;
}

.space-item {
  width: 100%;
}

.header {
  width: 100%;
  padding: 40px 20px 10px;
}

.name {
  font-size: 36px;
  font-weight: 600;
  margin: 0;
}

.bell {
  font-size: 20px;
}

.mt {
  margin-top: 16px;
}

.notification {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

.bell-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.bell-icon {
  font-size: 26px;
  color: #000;
  cursor: pointer;
}

.card-spacing :deep(.ant-space-item) {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
