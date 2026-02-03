<template>
  <BaseCard>
    <a-skeleton v-if="loading" active />

    <a-space v-else direction="vertical" size="small">
      <div class="row">
        <span>Today checked-in</span>
        <span class="green">✔ {{ data.checkinTime }}</span>
      </div>
      <div class="row">
        <span>Rank</span>
        <strong>{{ data.rank }}</strong>
      </div>
      <div class="row">
        <span>Total Hours</span>
        <strong>{{ data.totalPoints }} pts</strong>
      </div>
      <div class="row">
        <span>Average check-in time</span>
        <strong>{{ data.avgTime }}</strong>
      </div>
    </a-space>
  </BaseCard>
</template>

<script setup>
import BaseCard from '@/components/base/BaseCard.vue'

defineProps({
  data: Object,
  loading: Boolean
})
</script>

<style scoped>
.row {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
}
.green {
  color: #22c55e;
}
</style>
