<template>
  <div class="assignment-detail-page">
    <!-- Header -->
    <div class="header">
      <a-button type="text" shape="circle" @click="goBack">
        <ArrowLeftOutlined />
      </a-button>
    </div>

    <div class="wrapper">
      <BaseCard>
        <!-- Title -->
        <div class="title">
          <StarOutlined class="star" />
          <span>{{ task.title }}</span>
        </div>

        <!-- Bonus -->
        <AssignmentBonus :point="task.points" />

        <!-- Form -->
        <AssignmentForm @submit="onSubmit" />
      </BaseCard>
    </div>

    <BottomBar active="assignment" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeftOutlined, StarOutlined } from '@ant-design/icons-vue'
import { useApi } from '~/composables/core'

import BaseCard from '~/components/base/BaseCard.vue'
import AssignmentBonus from '~/components/intern/assignment/AssignmentBonus.vue'
import AssignmentForm from '~/components/intern/assignment/AssignmentForm.vue'
import BottomBar from '@/components/intern/BottomBar.vue'
import { message } from 'ant-design-vue'

const { apiFetch } = useApi()

const route = useRoute()
const router = useRouter()

const taskId = route.params.id as string

const task = ref({
  id: taskId,
  title: '',
  points: 0,
  description: ''
})

/* ✅ ดึงข้อมูล task */
onMounted(async () => {
  try {
    const res = await apiFetch<{ data: any }>(`/tasks/${taskId}`)
    task.value = res.data
  } catch (err) {
    console.error('Fetch task error:', err)
  }
})

const goBack = () => {
  router.back()
}

/* ✅ Submit งาน */
const onSubmit = async (formData: FormData) => {
  try {
    await apiFetch(`/tasks/${taskId}/submissions`, {
      method: 'POST',
      body: formData
    })

    router.push('/intern/assignment')
    message.success('Task submitted successfully')

  } catch (err) {
    console.error('Submit error:', err)
  }
}
</script>

<style scoped>
.assignment-detail-page {
  background-color: #6ec1ff;
  min-height: 100vh;
  padding-bottom: 72px;
}

.header {
  padding: 12px;
}

.wrapper {
  display: flex;
  justify-content: center;
  padding: 0 12px;
}

.wrapper :deep(.base-card) {
  width: 100%;
  max-width: 360px;
}

.title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  margin-bottom: 12px;
}

.star {
  color: #faad14;
}
</style>
