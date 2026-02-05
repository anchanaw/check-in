<template>
  <a-table
    :columns="columns"
    :data-source="mentors"
    :loading="loading"
    :pagination="false"
    bordered
    size="small"
  >
    <template #bodyCell="{ column, record }">
      <!-- STATUS -->
      <template v-if="column.key === 'status'">
        <a-tag
          :color="record.status === 'active' ? 'green' : 'orange'"
          class="status-tag"
          @click="emit('select', record)"
        >
          {{ record.status }}
        </a-tag>
      </template>
    </template>
  </a-table>
</template>

<script setup lang="ts">
/* ===== types ===== */
export interface Mentor {
  id: number
  name: string
  status: 'active' | 'inactive'
  // field อื่น ๆ จะมาจาก API ภายหลัง
}

/* ===== props ===== */
defineProps<{
  mentors: Mentor[]
  loading: boolean
}>()

/* ===== emits ===== */
const emit = defineEmits<{
  (e: 'select', mentor: Mentor): void
}>()

/* ===== columns ===== */
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Status',
    key: 'status',
    align: 'center'
  }
]
</script>

<style scoped>
/* table header */
:deep(.ant-table-thead > tr > th) {
  background: #60a5fa;
  color: #fff;
  text-align: center;
}

/* table body */
:deep(.ant-table-tbody > tr > td) {
  text-align: center;
}

/* clickable status */
.status-tag {
  cursor: pointer;
}
</style>
