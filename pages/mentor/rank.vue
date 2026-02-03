<template>
  <div class="ranking-page">
    <h2 class="page-title">Ranking</h2>

    <div class="wrapper">
      <BaseCard>
        <RankingTable />
      </BaseCard>
    </div>

    <BottomBar active="ranking" />
  </div>
</template>

<script setup>
import BaseCard from '~/components/base/BaseCard.vue'
import RankingTable from '~/components/mentor/RankingTable.vue'
import BottomBar from '@/components/mentor/MentorBottomBar.vue'
</script>

<style scoped>
.ranking-page {
  background-color: #6ec1ff;
  min-height: 100vh;
  padding: 12px;
  padding-bottom: 72px; /* กัน bottom bar */
}

.page-title {
  text-align: center;
  font-weight: 600;
  margin-bottom: 12px;
}

.wrapper {
  display: flex;
  justify-content: center;
}

.wrapper :deep(.base-card) {
  width: 100%;
  max-width: 360px;
}
</style>
