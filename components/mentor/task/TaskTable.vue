<template>
  <a-table
    :columns="columns"
    :data-source="tasks"
    :loading="loading"
  >
    <template #bodyCell="{ column, record }">
      <!-- format points -->
      <template v-if="column.dataIndex === 'points'">
        +{{ record.points }}
      </template>

      <!-- switch -->
      <template v-if="column.key === 'status'">
        <StatusSwitch
          v-model="record.isBonus"
          @update:modelValue="() => onToggleStatus(record)"
        />
      </template>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import StatusSwitch from '@/components/base/StatusSwitch.vue'

type Task = {
  id: number
  key: number
  title: string
  points: number
  deadline: string
  isBonus: boolean
}

const loading = ref(true)
const tasks = ref<Task[]>([])

const onToggleStatus = async (record: Task) => {
  try {
    await axios.patch(`/tasks/${record.id}`, {
      isBonus: record.isBonus
    })

    console.log('Updated!')
  } catch (err) {
    console.error(err)
  }
}

const columns = [
  { title: 'Task title', dataIndex: 'title' },

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

  {
    title: 'Status',
    key: 'status',
    dataIndex: 'isBonus',
    width: 80,
    align: 'center'
  }
]


onMounted(async () => {
  await new Promise(r => setTimeout(r, 800))

  tasks.value = [
    {
      id: 1,
      key: 1,
      title: 'Share your day',
      points: 2,
      deadline: '26/1/26',
      isBonus: true
    }
  ]

  loading.value = false
})
</script>

<style scoped>
/* ===== TABLE ===== */
.task-table :deep(.ant-table-tbody > tr > td) {
  height: 56px;
  vertical-align: middle;
  overflow: visible;
}


</style>