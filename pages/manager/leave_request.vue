<template>
  <div class="leave-page">
    <!-- Header -->
    <div class="top-header">
      <BackButton class="back-btn" />
      <span class="header-title">Leave Request</span>
    </div>

    <div class="wrapper">
      <BaseCard>
        <a-empty v-if="notFound" description="No leave request found" />

        <LeaveRequestCard v-else :request="request" @approve="approve" @reject="reject" />
      </BaseCard>
    </div>

    <BottomBar active="profile" />
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { useLeaveApi } from '~/composables/manager/useLeaveApi'

import BaseCard from '~/components/base/BaseCard.vue'
import BackButton from '~/components/base/BackButton.vue'
import LeaveRequestCard from '~/components/manager/LeaveRequestCard.vue'
import BottomBar from '@/components/manager/ManagerBottomBar.vue'

const route = useRoute()
const router = useRouter()
const { getPendingLeaves, reviewLeave } = useLeaveApi()

const id = route.params.id as string

const request = reactive < any > ({
  id: '',
  name: '',
  type: '',
  date: '',
  duration: '',
  status: '',
  description: ''
})

const notFound = ref(false)

onMounted(async () => {
  try {
    const res: any = await getPendingLeaves()

    const leave = res.data.find(
      (l: any) => String(l.id) === String(id)
    )

    if (!leave) {
      notFound.value = true
      return
    }

    request.id = leave.id
    request.name = leave.user?.display_name || '-'
    request.type = leave.leave_type
    request.date = leave.duration_text
    request.duration = leave.duration_text
    request.status = leave.status
    request.description = leave.reason

  } catch {
    message.error('Failed to load leave')
  }
})

const approve = async () => {
  try {
    await reviewLeave(id, 'approved')
    request.status = 'approved'
    message.success('Approved')
  } catch {
    message.error('Approve failed')
  }
}

const reject = async () => {
  try {
    await reviewLeave(id, 'rejected')
    request.status = 'rejected'
    message.success('Rejected')
  } catch {
    message.error('Reject failed')
  }
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
  justify-content: center;
  gap: 8px;
  padding: 12px;
}

.header-title {
  font-size: 24px;
  font-weight: 600;
}

.back-btn {
  position: absolute;
  left: 12px;
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
