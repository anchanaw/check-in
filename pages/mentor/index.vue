<template>
  <a-layout class="page">
    <!-- Header -->
    <div class="header">
      <a-space direction="vertical" size="2">
        <a-typography-title class="name">
          Hi, {{ user.name }}
        </a-typography-title>

        <a-typography-text class="role">
          {{ user.role }} · {{ user.team }}
        </a-typography-text>
      </a-space>

      <a-badge :count="unreadCount" :overflow-count="99" :show-zero="false">
        <NuxtLink to="/mentor/notifications" class="bell-link">
          <BellOutlined class="bell-icon" />
        </NuxtLink>
      </a-badge>
    </div>

    <!-- Content -->
    <div class="center-wrapper">
      <BaseCard class="outer-card">
        <a-space direction="vertical" :size="27" style="width:100%">
          <div class="space-item">
            <OverviewCard :loading="loading" :data="overview" />
          </div>
          <div class="space-item">
            <ActionCard />
          </div>
        </a-space>
      </BaseCard>
    </div>

    <BottomBar />
  </a-layout>
</template>

<script setup>
import { useMentorDashboard } from '@/composables/mentor/useMentorDashboard'
import { useMentorNotifications } from '@/composables/mentor/useMentorNotifications'

import BaseCard from '~/components/base/BaseCard.vue'
import OverviewCard from '@/components/mentor/dashboard/OverviewCard.vue'
import ActionCard from '@/components/mentor/dashboard/ActionCard.vue'
import BottomBar from '@/components/mentor/MentorBottomBar.vue'
import { BellOutlined } from '@ant-design/icons-vue'
import { useCurrentUser } from '@/composables/mentor/useCurrentUser'

const { user, fetchUser } = useCurrentUser()
const { loading, overview } = useMentorDashboard()
const { unreadCount } = useMentorNotifications()

onMounted(() => {
  fetchUser()
})
</script>


<style scoped>
.page {
  min-height: 100vh;
  padding: 16px 16px 80px;
  background: #79c3f6;
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
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
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
