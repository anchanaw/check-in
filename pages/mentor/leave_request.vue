<template>
  <div class="leave-page">
    <!-- Header -->
    <div class="top-header">
      <a-button type="text" shape="circle" @click="goBack">
        <ArrowLeftOutlined />
      </a-button>
      <span class="header-title">Leave Request</span>
    </div>

    <div class="wrapper">
      <BaseCard>
        <LeaveRequestCard
          :request="request"
          @approve="approve"
          @reject="reject"
        />
      </BaseCard>
    </div>

    <BottomBar active="profile" />
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { ArrowLeftOutlined } from '@ant-design/icons-vue'

import BaseCard from '~/components/base/BaseCard.vue'
import LeaveRequestCard from '~/components/mentor/LeaveRequestCard.vue'
import BottomBar from '@/components/mentor/MentorBottomBar.vue'

/**
 * TODO:
 * - GET /leave-requests/:id
 * - POST /leave-requests/:id/approve
 * - POST /leave-requests/:id/reject
 */

const goBack = () => history.back()

// 🔹 mock leave request
const request = reactive({
  name: 'Sompong',
  type: 'Sick Leave',
  date: '26 Jan',
  duration: '1 day',
  status: 'Pending'
})

const approve = () => {
  console.log('approve leave')
  request.status = 'Approved'
}

const reject = () => {
  console.log('reject leave')
  request.status = 'Rejected'
}
</script>

<style scoped>
.leave-page {
  background-color: #6ec1ff;
  min-height: 100vh;
  padding-bottom: 72px;
}

.top-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
}

.header-title {
  font-weight: 600;
}

.wrapper {
  display: flex;
  justify-content: center;
  padding: 0 12px;
}

.wrapper :deep(.base-card) {
  width: 100%;
  max-width: 360px;
}
</style>
