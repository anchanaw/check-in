<template>
  <div class="leave-page">
    <!-- Header -->
    <div class="top-header">
      <BackButton />
      <span class="header-title">Leave Requests</span>
    </div>

    <div class="wrapper">
      <BaseCard>
        <a-skeleton v-if="loading" active />

        <a-empty v-else-if="!leaves.length" description="No pending leave requests" />

        <LeaveRequestCard v-for="item in leaves" :key="item.id" :request="item" @approve="approveLeave"
          @reject="rejectLeave" />
      </BaseCard>
    </div>

    <MentorBottomBar />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useApi } from '~/composables/core'
import { message } from 'ant-design-vue'

import BaseCard from '~/components/base/BaseCard.vue'
import LeaveRequestCard from '@/components/mentor/LeaveRequestCard.vue'
import MentorBottomBar from '@/components/mentor/MentorBottomBar.vue'
import BackButton from '@/components/base/BackButton.vue'

const { apiFetch } = useApi()

const leaves = ref<any[]>([])
const loading = ref(false)
const interns = ref<any[]>([])

const loadInterns = async () => {
  const res: any = await apiFetch('/users/interns')
  interns.value = res.data?.interns || []
}

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

const getDuration = (start: string, end: string) => {
  const s = new Date(start)
  const e = new Date(end)

  const diff =
    Math.floor((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) + 1

  return diff
}

// ✅ โหลด leave pending ทั้งหมด
onMounted(async () => {
  loading.value = true

  try {
    await loadInterns()

    const res: any = await apiFetch('/leaves/pending')

    leaves.value = (res.data || []).map((l: any) => {
      const intern = interns.value.find(
        (i: any) => i.id === l.internId
      )

      return {
        id: l.id,
        name: intern
          ? `${intern.firstName} ${intern.lastName}`
          : 'Unknown Intern',
        startDate: formatDate(l.startDate),
        endDate: formatDate(l.endDate),
        duration: getDuration(l.startDate, l.endDate),
        status: l.status?.toLowerCase(),
        description: l.reason
      }
    })

  } catch (err) {
    message.error('Failed to load leave requests')
  } finally {
    loading.value = false
  }
})

const approveLeave = async (id: string) => {
  try {
    await apiFetch(`/leaves/${id}/review`, {
      method: 'PATCH',
      body: { status: 'approved' }
    })

    message.success('Leave approved')
    leaves.value = leaves.value.filter(l => l.id !== id)

  } catch {
    message.error('Failed to approve leave')
  }
}

const rejectLeave = async (id: string) => {
  try {
    await apiFetch(`/leaves/${id}/review`, {
      method: 'PATCH',
      body: { status: 'rejected' }
    })

    message.success('Leave rejected')
    leaves.value = leaves.value.filter(l => l.id !== id)

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
