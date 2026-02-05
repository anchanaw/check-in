<template>
  <a-table
    class="task-table"
    :columns="columns"
    :data-source="tasks"
    :loading="loading"
    bordered
    :pagination="false"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'status'">
        <StatusSwitch
          v-model="record.active"
          @update:modelValue="onToggleStatus(record)"
        />
      </template>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import StatusSwitch from '@/components/base/StatusSwitch.vue'

type Task = {
  id: number
  key: number
  title: string
  bonus: string
  deadline: string
  active: boolean
}

const loading = ref(true)
const tasks = ref<Task[]>([])

const onToggleStatus = (record: Task) => {
  console.log(
    `PATCH /tasks/${record.id}`,
    { active: record.active }
  )

  /**
   * TODO:
   * await api.patch(`/tasks/${record.id}`, {
   *   active: record.active
   * })
   */
}

const columns = [
  { title: 'Task title', dataIndex: 'title' },
  { title: 'Bonus', dataIndex: 'bonus', width: 60, align: 'center' },
  { title: 'Dead line', dataIndex: 'deadline', width: 80, align: 'center' },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'active',
    width: 70,
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
      bonus: '+2',
      deadline: '26/1/26',
      active: true
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