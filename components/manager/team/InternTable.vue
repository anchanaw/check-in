<template>
  <a-table
    :columns="columns"
    :data-source="interns"
    :pagination="false"
    size="small"
    bordered
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'status'">
        <a-tag :color="record.status === 'active' ? 'green' : 'orange'">
          {{ record.status }}
        </a-tag>
      </template>
    </template>
  </a-table>
</template>

<script setup lang="ts">
defineProps<{ interns: any[]; loading: boolean }>()

const columns = [
  { title: 'Name', dataIndex: 'name' },
  { title: 'Score', dataIndex: 'score' },
  { title: 'Status', key: 'status' }
]
</script>
