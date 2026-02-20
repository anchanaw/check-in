<template>
  <a-table
    :columns="columns"
    :data-source="tasks"
    :loading="loading"
    row-key="id"
  >
    <template #bodyCell="{ column, record }">
      
      <!-- Format points -->
      <template v-if="column.dataIndex === 'points'">
        +{{ record.points }}
      </template>

      <!-- Format deadline -->
      <template v-if="column.dataIndex === 'deadline'">
        {{ formatDate(record.deadline) }}
      </template>


    </template>
  </a-table>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useApi } from '~/composables/core'
import { message } from 'ant-design-vue'
import type { TableColumnsType } from 'ant-design-vue'

const { apiFetch } = useApi()

type Task = {
  id: string
  title: string
  description: string
  points: number
  deadline: string
  isBonus: boolean
}

const loading = ref(true)
const tasks = ref<Task[]>([])

/* =========================
   LOAD TASKS
========================= */
const loadTasks = async () => {
  try {
    loading.value = true
    const res: any = await apiFetch('/tasks')
    tasks.value = res.data
  } catch (err) {
    console.error(err)
    message.error('Failed to load tasks')
  } finally {
    loading.value = false
  }
}

/* =========================
   TOGGLE BONUS
========================= */
const onToggleStatus = async (record: Task) => {
  try {
    await apiFetch(`/tasks/${record.id}`, {
      method: 'PATCH',
      body: {
        isBonus: record.isBonus
      }
    })

    message.success('Task updated')

  } catch (err) {
    message.error('Update failed')

    // rollback ถ้า error
    record.isBonus = !record.isBonus
  }
}

/* =========================
   FORMAT DATE
========================= */
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString()
}
const columns: TableColumnsType<any> = [
  {
    title: 'Task title',
    dataIndex: 'title'
  },
  {
    title: 'Points',
    dataIndex: 'points',
    width: 80,
    align: 'center'
  },
  {
    title: 'Deadline',
    dataIndex: 'deadline',
    width: 120,
    align: 'center'
  },

]
onMounted(loadTasks)
</script>

<style scoped>
.task-table :deep(.ant-table-tbody > tr > td) {
  height: 56px;
  vertical-align: middle;
}
</style>