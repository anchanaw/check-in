<template>
  <div class="dashboard-page">
    <h2 class="page-title">Dashboard</h2>

    <!-- content กลางแนวนอน -->
    <div class="wrapper">
      <!-- Today Status -->
      <BaseCard>
        <TodayStatusCard />
      </BaseCard>

      <!-- Check-in History -->
      <BaseCard class="mt">
        <CheckinHistoryTable />
      </BaseCard>
    </div>

    <!-- bottom bar ของเดิม -->
    <BottomBar active="dashboard" />
  </div>
</template>

<script setup>
import BaseCard from '~/components/base/BaseCard.vue'
import TodayStatusCard from '@/components/dashboard/TodayStatusCard.vue'
import CheckinHistoryTable from '@/components/dashboard/CheckinHistoryTable.vue'
import BottomBar from '@/components/BottomBar.vue'
</script>

<style scoped>
.dashboard-page {
  background-color: #6ec1ff;
  min-height: 100vh;
  padding: 12px;
  padding-bottom: 72px; /* เผื่อ bottom bar */
}

/* ⭐ ตัวนี้คือหัวใจ */
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center; /* กลางแนวนอน */
  gap: 12px;
}

/* จำกัดความกว้าง card ให้เหมือนมือถือจริง */
.wrapper :deep(.base-card) {
  width: 100%;
  max-width: 360px;
}

.page-title {
  text-align: center;
  font-weight: 600;
  margin-bottom: 12px;
}

.mt {
  margin-top: 12px;
}
</style>
