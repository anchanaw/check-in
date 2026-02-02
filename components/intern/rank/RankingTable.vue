<template>
  <div>
    <div class="header">
      <div class="title">Today Status</div>
      <div class="subtitle">Sprint 5 Jan - 17 Jan</div>
    </div>

    <a-table
      :columns="columns"
      :data-source="data"
      size="small"
      bordered
      pagination="false"
    />
  </div>
</template>

<script setup>
const columns = [
  { title: 'Rank', dataIndex: 'rank', width: 70 },
  { title: 'Name', dataIndex: 'name' },
  { title: 'Score', dataIndex: 'score', width: 90 }
]

const data = [
  { key: 1, rank: '#1', name: 'Sompong', score: '250 pts' },
  { key: 2, rank: '#2', name: 'Anon', score: '' },
  { key: 3, rank: '#3', name: 'Jane', score: '' }
]
</script>

<style scoped>
.header {
  margin-bottom: 8px;
}

.title {
  font-weight: 600;
}

.subtitle {
  font-size: 12px;
  color: #666;
}
</style>
