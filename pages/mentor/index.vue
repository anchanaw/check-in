<template>
  <a-layout class="page">
    <!-- Header -->
    <div class="header">
      <a-space direction="vertical" size="0">
        <a-typography-title :level="3" style="margin:0">
          Hi, Sommai
        </a-typography-title>
        <a-typography-text type="secondary">
          Mentor · Team Frontend Development
        </a-typography-text>
      </a-space>

      <a-badge :count="unreadCount" :overflow-count="99" :show-zero="false">
        <NuxtLink to="/mentor/notifications" class="bell-link">
          <BellOutlined class="bell-icon" />
        </NuxtLink>
      </a-badge>
    </div>

    <!-- Content -->
    <a-space direction="vertical" size="middle" style="width:100%">
      <OverviewCard :loading="loading" :data="overview" />

      <ActionCard />
    </a-space>

    <BottomBar />
  </a-layout>
</template>

<script setup>
import { useMentorDashboard } from '@/composables/mentor/useMentorDashboard'
import { useMentorNotifications } from '@/composables/mentor/useMentorNotifications'

import OverviewCard from '@/components/mentor/dashboard/OverviewCard.vue'
import ActionCard from '@/components/mentor/dashboard/ActionCard.vue'
import BottomBar from '@/components/mentor/MentorBottomBar.vue'
import { BellOutlined } from '@ant-design/icons-vue'

const { loading, overview } = useMentorDashboard()
const { unreadCount } = useMentorNotifications()

</script>


<style scoped>
.page {
  min-height: 100vh;
  padding: 16px 16px 80px;
  background: #79c3f6;
}

.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}

.header h1 {
  margin: 0;
  font-size: 24px;
}

.header p {
  margin: 4px 0 0;
  font-size: 14px;
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
  font-size: 22px;
  color: #000;
  cursor: pointer;
}
</style>
