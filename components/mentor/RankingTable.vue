<template>
  <div>
    <div class="header">
      <div class="title">Today Status</div>
      <div class="subtitle">
        <SprintRange />
      </div>
    </div>

    <a-table :columns="columns" :data-source="data" :loading="loading" size="small" bordered :pagination="false" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SprintRange from '@/components/base/SprintRange.vue'
import { useApi } from '~/composables/core'
const { apiFetch } = useApi()
const loading = ref(true)
const data = ref([])

const columns = [
  { title: 'Rank', dataIndex: 'rank', width: 70 },
  { title: 'Name', dataIndex: 'name' },
  { title: 'Score', dataIndex: 'score', width: 90 }
]


onMounted(async () => {
  loading.value = true
  try {
    const res = await apiFetch('/points/ranking') as any
    const rankingList = res.data

    data.value = rankingList.map((item: any, index: number) => ({
      key: item.internId,
      rank: `#${index + 1}`,
      name: `${item.firstName} ${item.lastName}`,
      score: `${item.totalPoints} pts`
    }))

  } catch (err) {
    console.error('Failed to fetch ranking:', err)
  } finally {
    loading.value = false
  }
  console.log('RANK API RESULT:', res)
  console.log('RANK DATA:', res.data)

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
