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
import { ref, onMounted } from 'vue'
import axios from '@/utils/axios'

const columns = [
  { dataIndex: 'rank', width: 70 },
  { dataIndex: 'name' },
  { dataIndex: 'score', width: 90 }
]

const data = ref([])

onMounted(async () => {
  try {
    const res = await axios.get('/points/ranking')

    const rankingList = res.data

    // 🔥 สมมติ backend ส่งแบบนี้:
    // [{ userId, name, totalPoints }]

    const myUserId = 1 // 👈 เปลี่ยนเป็น authStore.user.id

    const myIndex = rankingList.findIndex(
      (u) => u.userId === myUserId
    )

    if (myIndex !== -1) {
      const me = rankingList[myIndex]

      data.value = [
        {
          key: me.userId,
          rank: `#${myIndex + 1}`,
          name: me.name,
          score: `${me.totalPoints} pts`
        }
      ]
    }

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
