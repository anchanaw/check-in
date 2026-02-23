<template>
  <div>
    <div class="title mb">Your Rank</div>

    <a-table :columns="columns" :data-source="data" size="small" bordered pagination="false" show-header="false" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useApi } from '~/composables/core'

const { apiFetch } = useApi()

interface MeResponse {
  success: boolean
  data: {
    id: string
  }
}

interface RankingItem {
  userId: string
  firstName: string
  lastName: string
  totalPoints: number
}

const columns = [
  { dataIndex: 'rank', width: 70 },
  { dataIndex: 'name' },
  { dataIndex: 'score', width: 90 }
]

const data = ref<any[]>([])

onMounted(async () => {
  try {
    const meRes = await apiFetch<{ data: { id: string } }>('/auth/me')
    const myUserId = meRes.data.id

    const rankRes = await apiFetch<{ data: any[] }>('/points/ranking')
    const rankingList = rankRes.data

    const myIndex = rankingList.findIndex(
      (u) => String(u.internId) === String(myUserId)
    )

    if (myIndex >= 0) {
      const me = rankingList[myIndex]!

      data.value = [
        {
          key: me.internId,
          rank: `#${myIndex + 1}`,
          name: `${me.firstName} ${me.lastName}`,
          score: `${me.totalPoints} pts`
        }
      ]
    } else {
      data.value = []
    }
    console.log('myUserId:', myUserId)
    console.log('rankingList:', rankingList)
  } catch (err) {
    console.error(err)
  }

})
</script>

<style scoped>
.title {
  font-weight: 600;
}

.mb {
  margin-bottom: 8px;
}
</style>
