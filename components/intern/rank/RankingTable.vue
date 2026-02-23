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

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useApi } from '~/composables/core'
import SprintRange from '@/components/base/SprintRange.vue'

const { apiFetch } = useApi()
const columns = [
  { title: 'Rank', dataIndex: 'rank', width: 70 },
  { title: 'Name', dataIndex: 'name' },
  { title: 'Score', dataIndex: 'score', width: 100 }
]

interface RankingItem {
  userId: string
  firstName: string
  lastName: string
  totalPoints: number
}

interface RankingResponse {
  success: boolean
  data: RankingItem[]
}

const data = ref<Array<{ key: any; rank: string; name: string; score: string }>>([])
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  try {

    const res = await apiFetch<RankingResponse>('/points/ranking')
    const rankingList = res.data
    
    data.value = rankingList.map((item: any, index: number) => ({
      key: item.userId || item.internId,
      rank: `#${index + 1}`,
      name: `${item.firstName} ${item.lastName}`,
      score: `${item.totalPoints} pts`
    }))

  } catch (err) {
    console.error('Failed to fetch ranking:', err)
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
