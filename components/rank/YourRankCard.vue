<template>
  <div>
    <div class="title mb">Your Rank</div>

    <a-table
      :columns="columns"
      :data-source="data"
      size="small"
      bordered
      pagination="false"
      show-header="false"
    />
  </div>
</template>

<script setup>
const columns = [
  { dataIndex: 'rank', width: 70 },
  { dataIndex: 'name' },
  { dataIndex: 'score', width: 90 }
]

const data = [
  { key: 1, rank: '#1', name: 'Sompong', score: '250 pts' }
]
</script>

<style scoped>
.title {
  font-weight: 600;
}

.mb {
  margin-bottom: 8px;
}
</style>
