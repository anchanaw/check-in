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

  </div>
</template>

<script setup lang="ts">
import { ArrowLeftOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'
import { useApi } from '~/composables/core'
import { message } from 'ant-design-vue'

import BaseCard from '~/components/base/BaseCard.vue'
import RequestLeaveForm from '~/components/intern/RequestLeaveForm.vue'

const router = useRouter()
const { apiFetch } = useApi()

const goBack = () => {
  router.back()
}

const onSubmit = async (payload: any) => {
  try {
    // 🔥 แปลงวันที่ให้เป็น ISO string
    const body = {
      startDate: new Date(payload.startDate).toISOString(),
      endDate: new Date(payload.endDate).toISOString(),
      reason: payload.reason
    }

    if (!payload.startDate || !payload.endDate) {
      message.error('Please select leave dates')
      return
    }

    if (new Date(payload.endDate) < new Date(payload.startDate)) {
      message.error('End date must be after start date')
      return
    }
    
    await apiFetch('/leaves', {
      method: 'POST',
      body
    })

    message.success('Leave request submitted successfully')

    router.push('/intern')

  } catch (err: any) {
    console.error('Leave request error:', err)
    message.error(
      err?.response?.data?.error?.message ||
      'Failed to submit leave request'
    )
  }
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
