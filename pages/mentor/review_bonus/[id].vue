<template>
  <div class="leave-page">
    <div class="top-header">
      <BackButton />
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

    <BottomBar />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { useApi } from '~/composables/core'

import BaseCard from '~/components/base/BaseCard.vue'
import LeaveRequestCard from '~/components/mentor/LeaveRequestCard.vue'
import BottomBar from '@/components/mentor/MentorBottomBar.vue'
import BackButton from '@/components/base/BackButton.vue'

const { apiFetch } = useApi()
const route = useRoute()
const router = useRouter()

const id = route.params.id as string

if (!id) {
  console.error('Invalid leave id')
  router.back()
}

const submitting = ref(false)

const request = reactive({
  id: '',
  name: '',
  type: '',
  date: '',
  duration: '',
  status: '',
  description: ''
})

onMounted(async () => {
  try {
    const res: any = await apiFetch(`/leaves/${id}`)
    const data = res.data

    request.id = data.id
    request.name = data.internName
    request.type = data.type
    request.date = data.date
    request.duration = data.duration
    request.status = data.status
    request.description = data.description

  } catch (err) {
    message.error('Failed to load leave')
  }
})

const approve = async () => {
  if (submitting.value) return
  submitting.value = true

  try {
    await apiFetch(`/leaves/${id}/review`, {
      method: 'PATCH',
      body: { status: 'approved' }
    })

    message.success('Approved')
    router.back()

  } catch {
    message.error('Approve failed')
  } finally {
    submitting.value = false
  }
}

const reject = async () => {
  if (submitting.value) return
  submitting.value = true

  try {
    await apiFetch(`/leaves/${id}/review`, {
      method: 'PATCH',
      body: { status: 'rejected' }
    })

    message.success('Rejected')
    router.back()

  } catch {
    message.error('Reject failed')
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #6ec1ff;
  display: flex;
  flex-direction: column;
  padding-bottom: 80px;
}

/* ================= HEADER ================= */
.page-header {
  background: #74c3ff;
  padding: 0 !important;
}

.page-header :deep(.ant-page-header-content),
.page-header :deep(.ant-page-header-heading) {
  padding: 0;
  margin: 0;
}

.header-grid {
  display: grid;
  grid-template-columns: 48px 1fr 48px;
  align-items: center;
  height: 56px;
  padding: 0 8px;
}

.left {
  display: flex;
  justify-content: center;
}

.center {
  text-align: center;
  font-size: 20px;
  font-weight: 600;
}

/* ================= CONTENT ================= */
.content-center {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 12px;
}

.space-wrapper {
  width: 100%;
  max-width: 390px;
  /* ความกว้างมือถือ */
}

:deep(.ant-space-item) {
  display: flex;
  justify-content: center;
}
</style>
