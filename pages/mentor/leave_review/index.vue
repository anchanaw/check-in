<template>
  <div class="leave-page">
    <!-- Header -->
    <div class="top-header">
      <BackButton/>
      <span class="header-title">Leave Requests</span>
    </div>

    <div class="wrapper">
      <BaseCard>
        <a-skeleton v-if="loading" active />

        <a-empty
          v-else-if="!leaves.length"
          description="No pending leave requests"
        />

        <LeaveRequestCard
          v-else
          v-for="item in leaves"
          :key="item.id"
          :request="item"
          @approve="approveLeave(item)"
          @reject="rejectLeave(item)"
        />
      </BaseCard>
    </div>

    <MentorBottomBar />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from '~/composables/core'
import { message } from 'ant-design-vue'

import BaseCard from '~/components/base/BaseCard.vue'
import LeaveRequestCard from '@/components/mentor/LeaveRequestCard.vue'
import MentorBottomBar from '@/components/mentor/MentorBottomBar.vue'
import BackButton from '@/components/base/BackButton.vue'

const { apiFetch } = useApi()
const router = useRouter()

const leaves = ref<any[]>([])
const loading = ref(false)

const goBack = () => router.back()

// ✅ โหลด leave pending ทั้งหมด
onMounted(async () => {
  loading.value = true
  try {
    const res: any = await apiFetch('/leaves/pending')

    leaves.value = (res.data || []).map((l: any) => ({
      id: l.id,
      name: l.internName,
      type: l.type,
      date: l.date,
      duration: l.duration,
      status: l.status,
      description: l.description
    }))

  } catch (err) {
    message.error('Failed to load leave requests')
  } finally {
    loading.value = false
  }
})

// ✅ ไปหน้า detail
const goDetail = (id: string) => {
  router.push(`/mentor/leave_review/${id}`)
}

// ✅ approve
const approveLeave = async (item: any) => {
  try {
    await apiFetch(`/leaves/${item.id}/review`, {
      method: 'PATCH',
      body: { status: 'approved' }
    })

    message.success('Leave approved')
    leaves.value = leaves.value.filter(l => l.id !== item.id)

  } catch {
    message.error('Failed to approve leave')
  }
}

// ✅ reject
const rejectLeave = async (item: any) => {
  try {
    await apiFetch(`/leaves/${item.id}/review`, {
      method: 'PATCH',
      body: { status: 'rejected' }
    })

    message.success('Leave rejected')
    leaves.value = leaves.value.filter(l => l.id !== item.id)

  } catch {
    message.error('Failed to reject leave')
  }
}
</script>

<style scoped>
.leave-page {
  min-height: 100vh;
  background: #6CBCFA;
  padding: 16px;
}

.top-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.header-title {
  font-size: 18px;
  font-weight: 600;
}

.wrapper {
  max-width: 480px;
  margin: auto;
}
</style>
