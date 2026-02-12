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

import BackButton from '@/components/base/BackButton.vue'
import TaskStatusCard from '@/components/mentor/task/TaskStatusCard.vue'
import TaskSummaryCard from '@/components/mentor/task/TaskSummaryCard.vue'
import TaskDescriptionCard from '@/components/mentor/task/TaskDescriptionCard.vue'

const route = useRoute()
const loading = ref(true)

interface TaskDetail {
  id: number
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
  id: 0,
  studentName: '',
  taskTitle: '',
  submittedDate: '',
  bonusPoints: 0,
  description: '',
  image: '',
  note: '',
  status: 'approved'
})

onMounted(async () => {
  loading.value = true

  const taskId = route.params.id
  console.log('TASK ID:', taskId)

  await new Promise(r => setTimeout(r, 800)) // mock API delay

  // 🔥 mock data (รอเปลี่ยนเป็น API)
  task.value = {
    id: 1,
    studentName: 'Sompong',
    taskTitle: 'Share your day',
    submittedDate: '15 Jan 2026',
    bonusPoints: 2,
    description:
      'This report provides an analysis of the latest trends and statistics. The intern has conducted research and presented detailed findings on the given topic.',
    image: '/images/sample.jpg',
    note: 'Good reflection and clear explanation',
    status: 'approved'
  }

  loading.value = false
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
