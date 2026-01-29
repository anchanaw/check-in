<template>
  <div class="request-leave-page">
    <!-- Header -->
    <div class="top-header">
      <a-button type="text" shape="circle" @click="goBack">
        <ArrowLeftOutlined />
      </a-button>
      <span class="header-title">Request Leave</span>
    </div>

    <div class="wrapper">
      <BaseCard>
        <h3 class="card-title">Request Leave</h3>
        <RequestLeaveForm @submit="onSubmit" @cancel="goBack" />
      </BaseCard>
    </div>

    <BottomBar active="profile" />
  </div>
</template>

<script setup>
import { ArrowLeftOutlined } from '@ant-design/icons-vue'
import BaseCard from '@/components/BaseCard.vue'
import RequestLeaveForm from '@/components/RequestLeaveForm.vue'
import BottomBar from '@/components/BottomBar.vue'

const goBack = () => {
  history.back()
}

const onSubmit = (payload) => {
  console.log('request leave payload:', payload)
  /**
   * TODO:
   * POST /leave-requests
   * body: payload
   */
}
</script>

<style scoped>
.request-leave-page {
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

.card-title {
  font-weight: 600;
  margin-bottom: 12px;
}
</style>
