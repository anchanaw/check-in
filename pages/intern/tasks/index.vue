<template>
  <div class="assignments-page">
    <h2 class="page-title">Assignments</h2>

    <div class="wrapper">
      <AssignmentCard v-for="item in assignments" :key="item.id" :data="item" @addLabel="onAddLabel" />

      <a-empty v-if="!assignments.length" description="No assignments" />
    </div>

    <BottomBar active="assignment" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useApi } from '~/composables/core'
import AssignmentCard from '~/components/intern/assignment/AssignmentCard.vue'
import BottomBar from '@/components/intern/BottomBar.vue'

const { apiFetch } = useApi()

interface TaskItem {
  id: string
  title: string
  description: string
  points: number
  isBonus: boolean
  deadline: string
}

const assignments = ref<any[]>([])
const loading = ref(false)

onMounted(async () => {
  try {
    loading.value = true

    const [taskRes, submissionRes] = await Promise.all([
      apiFetch<{ data: TaskItem[] }>('/tasks'),
      apiFetch<{ data: any[] }>('/tasks/submissions/me')
    ])

    const taskList = taskRes.data || []
    const submissions = submissionRes.data || []

    // เอา taskId ของงานที่ submit แล้ว
    const submittedTaskIds = submissions.map(s => s.taskId)

    assignments.value = taskList.map((task) => {
      const submission = submissions.find(s => s.taskId === task.id)

      return {
        id: task.id,
        title: task.title,
        status: submission
          ? submission.status   // pending / approved / rejected
          : getStatus(task.deadline), // not_done / done
        point: task.points,
        isBonus: task.isBonus,
        deadline: task.deadline
      }
    })

  } catch (err) {
    console.error('Failed to load assignments:', err)
  } finally {
    loading.value = false
  }
})

function getStatus(deadline: string) {
  const now = new Date()
  const end = new Date(deadline)
  return now > end ? 'done' : 'not_done'
}

const onAddLabel = (item: any) => {
  console.log('add label:', item)
}
</script>

<style scoped>
.assignments-page {
  background-color: #6ec1ff;
  min-height: 100vh;
  padding: 12px;
  padding-bottom: 72px;
}

.page-title {
  text-align: center;
  font-weight: 600;
  margin-bottom: 12px;
}

/* กลางแนวนอน */
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
</style>
