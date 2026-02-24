<template>
  <a-layout class="page">

    <!-- Header -->
    <div class="top-header">
      <div class="back">
        <BackButton />
      </div>
      <div class="title">Task Complete</div>
    </div>

    <div class="content">

      <a-spin :spinning="loading">

        <div class="card-stack">
          <TaskStatusCard status="approved" />
          <TaskSummaryCard :task="task" />
          <TaskDescriptionCard :task="task" />
        </div>

      </a-spin>

    </div>

  </a-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'
import { useApi } from '~/composables/core'

import BackButton from '@/components/base/BackButton.vue'
import TaskStatusCard from '@/components/mentor/task/TaskStatusCard.vue'
import TaskSummaryCard from '@/components/mentor/task/TaskSummaryCard.vue'
import TaskDescriptionCard from '@/components/mentor/task/TaskDescriptionCard.vue'

const { apiFetch } = useApi()
const route = useRoute()
const loading = ref(true)

interface TaskDetail {
  id: string
  studentName: string
  taskTitle: string
  submittedDate: string
  bonusPoints: number
  description: string
  image?: string
  note?: string
  status: 'approved' | 'pending' | 'rejected'
}

const task = ref<TaskDetail>({
  id: '',
  studentName: '',
  taskTitle: '',
  submittedDate: '',
  bonusPoints: 0,
  description: '',
  image: '',
  note: '',
  status: 'pending'
})

onMounted(async () => {
  try {
    loading.value = true

    const submissionId = route.params.id as string
    console.log('SUBMISSION ID:', submissionId)

    const res = await apiFetch(
      `/tasks/${submissionId}/submissions`
    ) as any

    console.log('TASK DETAIL RESPONSE:', res)
    console.log('TASK DATA:', res?.data)

    const data = res?.data

    task.value = {
      id: data.id,
      studentName: `${data.intern?.firstName || ''} ${data.intern?.lastName || ''}`,
      taskTitle: data.task?.title || '',
      submittedDate: dayjs(data.createdAt)
        .add(7, 'hour')
        .format('DD MMM YYYY HH:mm'),
      bonusPoints: data.task?.points || 0,
      description: data.content || '',
      image: data.fileUrl || '',
      note: data.reviewNote || '',
      status: data.status || 'pending'
    }

  } catch (err) {
    console.error('Task detail error:', err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: #6ec1ff;
  padding-bottom: 40px;
}

.top-header {
  position: relative;
  height: 70px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back {
  position: absolute;
  left: 16px;
}

.title {
  font-size: 20px;
  font-weight: 600;
}

.content {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.card-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
