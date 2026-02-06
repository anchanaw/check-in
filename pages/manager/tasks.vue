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
          <a-button
            type="primary"
            class="create-btn"
            @click="openCreate"
          >
            Create Task
          </a-button>
        </div>
      </BaseCard>
    </div>

    <!-- Create Task Modal -->
    <CreateTaskModal
      :open="createOpen"
      @close="createOpen = false"
      @save="onSaveTask"
    />

    <BottomBar active="tasks" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseCard from '@/components/base/BaseCard.vue'
import TaskTable from '@/components/manager/task/TaskTable.vue'
import CreateTaskModal from '@/components/manager/task/CreateTaskModal.vue'
import BottomBar from '@/components/manager/ManagerBottomBar.vue'

const createOpen = ref(false)

const openCreate = () => {
  createOpen.value = true
}

const onSaveTask = (payload) => {
  console.log('save task:', payload)
  createOpen.value = false
  /**
   * TODO:
   * POST /tasks
   */
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
  margin-top: 10px;
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
