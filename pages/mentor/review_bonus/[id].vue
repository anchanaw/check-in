<template>
  <a-layout class="page">
    <a-page-header class="page-header">
      <div class="header-grid">
        <div class="left">
          <BackButton @click="goBack" />
        </div>
        <div class="center">
          Review Bonus Tasks
        </div>
        <div></div>
      </div>
    </a-page-header>

    <div class="content-center">
      <a-space direction="vertical" size="middle" class="space-wrapper">
        <BonusTaskSummaryCard :task="task" :loading="loading" />

        <BonusTaskContentWithAction :task="task" :loading="actionLoading" @approve="approve" @reject="reject" />
      </a-space>
    </div>

    <MentorBottomBar />
  </a-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { useApi } from '~/composables/core'
import { useBonusReview } from '@/composables/mentor/useBonusReview'

import BackButton from '@/components/base/BackButton.vue'
import BonusTaskSummaryCard from '@/components/mentor/bonus/BonusTaskSummaryCard.vue'
import BonusTaskContentWithAction from '@/components/mentor/bonus/BonusTaskContentWithAction.vue'
import MentorBottomBar from '@/components/mentor/MentorBottomBar.vue'

const route = useRoute()
const router = useRouter()
const { apiFetch } = useApi()
const { reviewSubmission } = useBonusReview()

const loading = ref(true)
const actionLoading = ref(false)

const id = route.params.id as string
const reviewed = ref(false)
const task = ref({
  id: '',
  internName: '',
  title: '',
  submittedAt: '',
  bonusPoint: 0,
  description: '',
  imageUrl: ''
})

onMounted(async () => {
  try {
    loading.value = true

    // ดึง submission pending
    const submissionRes: any = await apiFetch('/tasks/submissions/pending')
    const submission = submissionRes.data?.find(
      (s: any) => s.id === id
    )

    if (!submission) {
      message.error('Submission not found')
      router.back()
      return
    }

    // ดึง task detail
    const taskRes: any = await apiFetch(`/tasks/${submission.taskId}`)
    const taskData = taskRes.data

    // ดึง intern
    const internRes: any = await apiFetch('/users/interns')
    const intern = internRes.data?.find(
      (i: any) => i.id === submission.internId
    )

    task.value = {
      id: submission.id,
      internName: intern
        ? `${intern.firstName} ${intern.lastName}`
        : 'Unknown Intern',
      title: taskData?.title || '',
      submittedAt: submission.submittedAt,
      bonusPoint: taskData?.points || 0,
      description: submission.content || '',
      imageUrl: ''
    }

  } catch (err) {
    message.error('Failed to load submission')
    router.back()
  } finally {
    loading.value = false
  }
})

const approve = async (note: string) => {
  try {
    actionLoading.value = true
    await reviewSubmission(id, 'approved', note)
    reviewed.value = true 
    message.success('Approved successfully')
    router.back()
  } catch (err) {
    message.error('Approve failed')
  } finally {
    actionLoading.value = false
  }
}

const reject = async (note: string) => {
  try {
    actionLoading.value = true
    await reviewSubmission(id, 'rejected', note)
    reviewed.value = true 
    message.success('Rejected successfully')
    router.back()
  } catch (err) {
    message.error('Reject failed')
  } finally {
    actionLoading.value = false
  }
}

const goBack = () => router.back()
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #6ec1ff;
  display: flex;
  flex-direction: column;
  padding-bottom: 80px;
}

.page-header {
  background: #74c3ff;
  padding: 0 !important;
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
}

:deep(.ant-space-item) {
  display: flex;
  justify-content: center;
}
</style>