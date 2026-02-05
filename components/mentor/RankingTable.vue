<template>
  <div>
    <div class="header">
      <div class="title">Today Status</div>
      <div class="subtitle">Sprint 5 Jan - 17 Jan</div>
    </div>

    <a-table
      :columns="columns"
      :data-source="data"
      :loading="loading"
      size="small"
      bordered
      :pagination="false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const loading = ref(true)
const data = ref([])

const columns = [
  { title: 'Rank', dataIndex: 'rank', width: 70 },
  { title: 'Name', dataIndex: 'name' },
  { title: 'Score', dataIndex: 'score', width: 90 }
]

onMounted(async () => {
  loading.value = true

  // 🔹 mock API (แทน fetch จริง)
  await new Promise(r => setTimeout(r, 800))

  // 🔹 data ที่จะได้จาก API
  data.value = [
    { key: 1, rank: '#1', name: 'Sompong', score: '250 pts' },
    { key: 2, rank: '#2', name: 'Anon', score: '180 pts' },
    { key: 3, rank: '#3', name: 'Jane', score: '150 pts' }
  ]

  loading.value = false
})
</script>

<style scoped>
.header {
  margin-bottom: 8px;
}

.title {
  font-size: 20px;
  font-weight: 600;
}

.subtitle {
  font-size: 13px;
  font-weight: lighter;
  color: #666;
}
</style>
