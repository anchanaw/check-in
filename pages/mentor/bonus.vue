<template>
  <a-layout class="page">
    <a-typography-title :level="4">
      Review Bonus Tasks
    </a-typography-title>

    <BonusTaskList
      :loading="loading"
      :tasks="tasks"
      @review="goToReview"
    />

    <MentorBottomBar />
  </a-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import BonusTaskList from '@/components/mentor/bonus/BonusTaskList.vue'
import MentorBottomBar from '@/components/mentor/MentorBottomBar.vue'

const router = useRouter()
const loading = ref(true)
const tasks = ref([])

onMounted(async () => {
  loading.value = true
  await new Promise(r => setTimeout(r, 700)) // mock

  tasks.value = [
    {
      id: 1,
      internName: 'Sompong',
      taskTitle: 'Share your day',
      bonusPoint: 2
    },
    {
      id: 2,
      internName: 'Somchai',
      taskTitle: 'Share your day',
      bonusPoint: 2
    }
  ]

  loading.value = false
})

const goToReview = (task) => {
  // TODO: ไปหน้า review detail
  router.push(`/mentor/review_bonus/${task.id}`)
  console.log('review task:', task)
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  padding: 16px 16px 80px;
  background: #6ec1ff;
}
</style>
