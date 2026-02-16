<template>
  <div class="tasks-page">
    <!-- Header -->
    <div class="top-header">
      <span class="header-title">Tasks</span>
    </div>

    <!-- Content -->
    <div class="wrapper">
      <BaseCard class="tasks-card">
        <TaskTable />

        <div class="footer">
          <a-button type="primary" class="create-btn" @click="openCreate">
            Create Task
          </a-button>
        </div>
      </BaseCard>
    </div>

    <!-- Create Task Modal -->
    <CreateTaskModal :open="createOpen" @close="createOpen = false" @save="onSaveTask" />

    <MentorBottomBar active="/mentor" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import BaseCard from '@/components/base/BaseCard.vue'
import TaskTable from '@/components/mentor/task/TaskTable.vue'
import CreateTaskModal from '@/components/mentor/task/CreateTaskModal.vue'
import MentorBottomBar from '@/components/mentor/MentorBottomBar.vue'

const createOpen = ref(false)

const openCreate = () => {
  createOpen.value = true
}

const onSaveTask = async (payload) => {
  try {
    console.log('save task:', payload)

    await axios.post(
      `/tasks/${taskId}/submissions`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )

    createOpen.value = false

    // 🔥 รีโหลดตารางหลังสร้างสำเร็จ
    window.location.reload()

  } catch (error) {
    console.error('Create task error:', error)
  }
}
</script>

<style scoped>
.tasks-page {
  background-color: #6ec1ff;
  min-height: 100vh;
  padding-bottom: 80px;
}

/* ===== Header ===== */
.top-header {
  background: #74c3ff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-title {
  font-weight: 600;
  font-size: 24px;
  margin-bottom: 33px;
}

/* ===== Content ===== */
.wrapper {
  display: flex;
  justify-content: center;
  padding: 12px;
}

/* การ์ดขาว */
.tasks-card {
  width: 100%;
  max-width: 360px;
}

/* override padding BaseCard ถ้าจำเป็น */
.tasks-card :deep(.base-card) {
  padding: 12px;
}

/* footer ปุ่ม */
.footer {
  margin-top: 12px;
  display: flex;
  justify-content: flex-start;
}

.create-btn {
  border-radius: 8px;
  height: 36px;
  font-size: 14px;
}
</style>
