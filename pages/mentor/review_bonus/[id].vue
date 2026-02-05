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

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import BackButton from '@/components/base/BackButton.vue'
import BonusTaskSummaryCard from '@/components/mentor/bonus/BonusTaskSummaryCard.vue'
import BonusTaskContentWithAction from '@/components/mentor/bonus/BonusTaskContentWithAction.vue'
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
