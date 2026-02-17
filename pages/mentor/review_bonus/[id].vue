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
import { useApi } from '~/composables/core'

import BackButton from '@/components/base/BackButton.vue'
import BonusTaskSummaryCard from '@/components/mentor/bonus/BonusTaskSummaryCard.vue'
import BonusTaskContentWithAction from '@/components/mentor/bonus/BonusTaskContentWithAction.vue'
import MentorBottomBar from '@/components/mentor/MentorBottomBar.vue'
import { useBonusReview } from '@/composables/mentor/useBonusReview'

const route = useRoute()
const router = useRouter()

const { apiFetch } = useApi()
const loading = ref(true)
const actionLoading = ref(false)
const id = route.params.id as string

const { reviewSubmission } = useBonusReview()

const task = ref({
  internName: '',
  title: '',
  submittedAt: '',
  bonusPoint: 0,
  description: '',
  imageUrl: ''
})

onMounted(async () => {
  loading.value = true

  try {
    const submissionRes = await apiFetch<{
      success: boolean
      data: any[]
    }>('/tasks/submissions/pending')

    const submission = submissionRes.data.find(
      (s: any) => s.id === id
    )


    if (!submission) return

    // ดึง task detail
    const taskRes = await apiFetch<{
      success: boolean
      data: any
    }>(`/tasks/${submission.taskId}`)

    const taskData = taskRes.data

    // ดึง intern
    const internRes = await apiFetch<{
      success: boolean
      data: any[]
    }>('/users/interns')
    const intern = internRes.data.find(
      (i: any) => i.id === submission.internId
    )

    task.value = {
      internName: intern
        ? `${intern.firstName} ${intern.lastName}`
        : 'Unknown',
      title: taskData.title,
      submittedAt: submission.submittedAt,
      bonusPoint: taskData.points,
      description: submission.content,
      imageUrl: '' // ถ้ามี image field ค่อยใส่
    }

  } finally {
    loading.value = false
  }
})

const approve = async (note: string) => {
  actionLoading.value = true
  try {
    await reviewSubmission(id, 'approved', note)
    router.back()
  } catch (err) {
    console.error(err)
  } finally {
    actionLoading.value = false
  }
}

const reject = async (note: string) => {
  actionLoading.value = true
  try {
    await reviewSubmission(id, 'rejected', note)
    router.back()
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
