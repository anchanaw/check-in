<template>
  <a-empty v-if="!loading && teams.length === 0" description="No teams found" />
  <a-table :columns="columns" :data-source="teams" :loading="loading" :pagination="pagination"
    @change="handleTableChange" row-key="id" bordered size="small">
    <template #bodyCell="slotProps">
      <template v-if="slotProps.column.key === 'status'">
        <a-tag color="green" class="status-tag" @click="goDetail(slotProps.record)">
          Open
        </a-tag>
      </template>
    </template>
  </a-table>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  teams: {
    id: number
    team: string
    mentor: string
    intern: number
    status: string
  }[]
  loading: boolean
  total?: number
  page?: number
  pageSize?: number
}>()

const emit = defineEmits(['page-change'])

const pagination = computed(() => ({
  current: props.page,
  pageSize: props.pageSize,
  total: props.total,
  showSizeChanger: false
}))

const handleTableChange = (pagination: any) => {
  emit('page-change', pagination.current)
}

const goDetail = (record: any) => {
  if (!record?.id) return
  navigateTo(`/manager/team/${record.id}`)
}

const columns = [
  { title: 'Team', dataIndex: 'team', key: 'team' },
  { title: 'Mentor', dataIndex: 'mentor', key: 'mentor' },
  { title: 'Intern', dataIndex: 'intern', key: 'intern', align: 'center' },
  { title: 'Status', key: 'status', align: 'center' }
]

</script>

<style scoped>
/* header */
:deep(.ant-table-thead > tr > th) {
  background: #60a5fa;
  color: #fff;
  text-align: center;
}

/* body */
:deep(.ant-table-tbody > tr > td) {
  text-align: center;
}

/* clickable status */
.status-tag {
  cursor: pointer;
}
</style>
