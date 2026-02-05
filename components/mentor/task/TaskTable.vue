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
        <div
          class="status-toggle"
          :class="{ on: record.active }"
          @click="toggleStatus(record)"
        >
          <div class="knob"></div>
        </div>
      </template>
    </template>
  </a-table>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const loading = ref(true)
const tasks = ref([])

const toggleStatus = (record) => {
  record.active = !record.active
  console.log('PATCH /tasks/' + record.id, record.active)
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

.status-toggle {
  width: 30px;
  height: 48px;
  border-radius: 999px;
  background: #e5e7eb;
  display: flex;
  justify-content: center;
  padding: 4px;
  cursor: pointer;
  transition: background-color 0.25s ease;
}

.status-toggle.on {
  background: #3b82f6;
}

.status-toggle .knob {
  width: 18px;
  height: 18px;
  background: #fff;
  border-radius: 50%;
  transition: transform 0.25s ease;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.status-toggle.on .knob {
  transform: translateY(22px);
}

</style>