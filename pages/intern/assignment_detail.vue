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
          <span>{{ assignment.title }}</span>
        </div>

        <!-- Bonus -->
        <AssignmentBonus :point="assignment.point" />

        <!-- Form -->
        <AssignmentForm @submit="onSubmit" />
      </BaseCard>
    </div>

    <BottomBar active="assignment" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeftOutlined, StarOutlined } from '@ant-design/icons-vue'

import BaseCard from '@/components/BaseCard.vue'
import AssignmentBonus from '~/components/assignment/AssignmentBonus.vue'
import AssignmentForm from '~/components/assignment/AssignmentForm.vue'
import BottomBar from '@/components/BottomBar.vue'

// 🔹 route & router
const route = useRoute()
const router = useRouter()

// 🔹 assignment id จาก URL
const assignmentId = route.params.id

/**
 * TODO:
 * GET /assignments/:id
 */
const assignment = ref({
  id: assignmentId,
  title: '',
  point: 0
})

onMounted(() => {
  // 🔸 mock data (แทน API)
  assignment.value = {
    id: assignmentId,
    title: 'Share your day',
    point: 3
  }

  // 🔸 ของจริงในอนาคต
  // fetchAssignmentById(assignmentId)
})

const goBack = () => {
  router.back()
}

const onSubmit = (payload) => {
  console.log('submit assignment:', {
    assignmentId,
    ...payload
  })

  /**
   * TODO:
   * POST /assignments/:id/submit
   * body: { description, image }
   */

  // ตัวอย่าง flow หลัง submit
  // router.push('/assignments')
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
