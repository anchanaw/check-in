<template>
  <BaseCard>
    <a-skeleton v-if="loading" active />

    <div v-else class="summary">
      <strong>{{ task.internName }}</strong>

      <div class="muted">Task : {{ task.title }}</div>

      <div class="row">
        <span>Submitted :</span>
        <span>{{ task.submittedAt }}</span>
      </div>

      <div class="row highlight">
        <span>Bonus Points :</span>
        <span>+{{ task.bonusPoint }} points</span>
      </div>
    </div>
  </BaseCard>
</template>

<script setup>
import BaseCard from '@/components/base/BaseCard.vue'
defineProps({ task: Object, loading: Boolean })
</script>

<style scoped>
.summary {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
}
.muted {
  color: #666;
}
.row {
  display: flex;
  justify-content: space-between;
}
.highlight {
  color: #f59e0b;
  font-weight: 600;
}
</style>
