<template>
  <a-layout class="page">
    <a-typography-title :level="4" class="header-title">
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

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from '~/composables/core'

import BonusTaskList from '@/components/mentor/bonus/BonusTaskList.vue'
import MentorBottomBar from '@/components/mentor/MentorBottomBar.vue'
import { useBonusReview } from '@/composables/mentor/useBonusReview'

const { apiFetch } = useApi() 
const router = useRouter()
const {
  loading,
  tasks,
  fetchPending
} = useBonusReview()

onMounted(() => {
  fetchPending()
})

const goToReview = (task: { id: any }) => {
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

.header-title {
  font-size: 24px;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 20px;
  text-align: center;
}
</style>
