<template>
  <div class="tasks-page">
    <!-- Header -->
    <div class="top-header">
      <span class="header-title">Tasks</span>
    </div>

    <div class="wrapper">
      <BaseCard>
        <TaskTable />

        <a-button
          type="primary"
          class="create-btn"
          @click="openCreate"
        >
          Create Task
        </a-button>
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
import TaskTable from '@/components/mentor/task/TaskTable.vue'
import CreateTaskModal from '@/components/mentor/task/CreateTaskModal.vue'
import BottomBar from '@/components/mentor/MentorBottomBar.vue'

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
  padding-bottom: 72px;
}

.top-header {
  text-align: center;
  padding: 12px;
}

.header-title {
  font-weight: 600;
  font-size: 18px;
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

.create-btn {
  margin-top: 12px;
}
</style>
