<template>
  <a-layout class="page">
    <!-- Header -->
    <a-page-header
      title="Review Bonus Tasks"
      @back="goBack"
    />

    <a-space direction="vertical" size="middle" style="width:100%">
      <BonusTaskSummaryCard :task="task" :loading="loading" />
      <BonusTaskContentCard :task="task" :loading="loading" />
      <BonusTaskActionBar
        :loading="actionLoading"
        @approve="approve"
        @reject="reject"
      />
    </a-space>

    <MentorBottomBar />
  </a-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import BonusTaskSummaryCard from '@/components/mentor/bonus/BonusTaskSummaryCard.vue'
import BonusTaskContentCard from '@/components/mentor/bonus/BonusTaskContentCard.vue'
import BonusTaskActionBar from '@/components/mentor/bonus/BonusTaskActionBar.vue'
import MentorBottomBar from '@/components/mentor/MentorBottomBar.vue'

const route = useRoute()
const router = useRouter()

const loading = ref(true)
const actionLoading = ref(false)

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
  await new Promise(r => setTimeout(r, 700)) // mock

  task.value = {
    internName: 'Sompong',
    title: 'Share your day',
    submittedAt: 'Today, 16.00 PM',
    bonusPoint: 2,
    description:
      'This report provides an analysis of the latest trends and statistics. The intern has conducted research and presented detailed findings on the given topic.',
    imageUrl: 'https://picsum.photos/200/200'
  }

  loading.value = false
})

const approve = async (note) => {
  actionLoading.value = true
  console.log('APPROVE', route.params.id, note)
  await new Promise(r => setTimeout(r, 600)) // mock
  actionLoading.value = false
  router.back()
}

const reject = async (note) => {
  actionLoading.value = true
  console.log('REJECT', route.params.id, note)
  await new Promise(r => setTimeout(r, 600)) // mock
  actionLoading.value = false
  router.back()
}

const goBack = () => router.back()
</script>

<style scoped>
.page {
  min-height: 100vh;
  padding: 12px 12px 80px;
  background: #6ec1ff;
}
</style>
