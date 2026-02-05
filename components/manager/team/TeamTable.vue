<template>
  <a-table
    :columns="columns"
    :data-source="teams"
    :loading="loading"
    :pagination="false"
    bordered
    size="small"
  >
    <template #bodyCell="{ column, record }">
      <!-- STATUS -->
      <template v-if="column.key === 'status'">
        <a-tag
          color="green"
          class="status-tag"
          @click="goDetail(record)"
        >
          Open
        </a-tag>
      </template>
    </template>
  </a-table>
</template>

<script setup lang="ts">

defineProps<{
  teams: {
    id: number
    team: string
    mentor: string
    intern: number
    status: string
  }[]
  loading: boolean
}>()

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
