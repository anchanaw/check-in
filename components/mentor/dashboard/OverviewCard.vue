<template>
  <BaseCard>
    <a-typography-text strong class="overview-title">Overview</a-typography-text>

    <a-skeleton v-if="loading" active />

    <div v-else class="list">
      <div class="row">
        <span>Intern in team</span>
        <span>{{ data.internCount }}</span>
      </div>
      <div class="row">
        <span>Task to review</span>
        <span>{{ data.taskToReview }}</span>
      </div>
      <div class="row">
        <span>Leave requests</span>
        <span>{{ data.leaveRequests }}</span>
      </div>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
interface OverviewData {
  internCount: number
  taskToReview: number
  leaveRequests: number
}

defineProps<{
  loading: boolean
  data: OverviewData
}>()
</script>


<style scoped>
.list {
  margin-top: 12px;
}
.row {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
}

.overview-title {
  font-size: 20px;
}
</style>
