<template>
  <div>
    <div class="header">
      <div class="title">Today Status</div>
      <div class="subtitle">
        <SprintRange />
      </div>
    </div>

    <a-table :columns="columns" :data-source="data" :loading="loading" size="small" bordered pagination="false" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import SprintRange from '@/components/base/SprintRange.vue'

const columns = [
  { title: 'Rank', dataIndex: 'rank', width: 70 },
  { title: 'Name', dataIndex: 'name' },
  { title: 'Score', dataIndex: 'score', width: 100 }
]

const data = ref([])
const loading = ref(false)

onMounted(async () => {
  try {
    loading.value = true

    const res = await axios.get('/points/ranking')

    // 🔥 สมมติ backend ส่งแบบนี้:
    // [
    //   { userId: 1, name: "Sompong", totalPoints: 250 }
    // ]

    data.value = res.data.map((user, index) => ({
      key: user.userId,
      rank: `#${index + 1}`,
      name: user.name,
      score: `${user.totalPoints} pts`
    }))

  } catch (err) {
    console.error('Ranking error:', err)
  } finally {
    loading.value = false
  }
})
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
