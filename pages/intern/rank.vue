<template>
  <div class="ranking-page">
    <h2 class="page-title">Ranking</h2>

    <div class="wrapper">
      <!-- Today Status Ranking -->
      <BaseCard>
        <RankingTable />
      </BaseCard>

      <!-- Your Rank -->
      <BaseCard>
        <YourRankCard />
      </BaseCard>
    </div>

    <!-- bottom bar ของเดิม -->
    <BottomBar active="ranking" />
  </div>
</template>

<script setup>
import BaseCard from '@/components/BaseCard.vue'
import RankingTable from '~/components/rank/RankingTable.vue'
import YourRankCard from '~/components/rank/YourRankCard.vue'
import BottomBar from '@/components/BottomBar.vue'
</script>

<style scoped>
.ranking-page {
  background-color: #6ec1ff;
  min-height: 100vh;
  padding: 12px;
  padding-bottom: 72px; /* เผื่อ bottom bar */
}

.page-title {
  text-align: center;
  font-weight: 600;
  margin-bottom: 12px;
}

/* กลางแนวนอน */
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

/* จำกัดความกว้าง card */
.wrapper :deep(.base-card) {
  width: 100%;
  max-width: 360px;
}
</style>
