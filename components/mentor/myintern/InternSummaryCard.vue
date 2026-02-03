<template>
  <BaseCard>
    <a-skeleton v-if="loading" active />

    <div v-else class="summary">
      <!-- Checked-in -->
      <div class="row">
        <div class="left">
          <img src="/icons/check.svg" class="icon" />
          <span class="label">Today checked-in</span>
        </div>
        <span class="value">{{ data.checkinTime }}</span>
      </div>

      <!-- Rank -->
      <div class="row">
        <div class="left">
          <img src="/icons/trophy.svg" class="icon" />
          <span class="label">Rank</span>
        </div>
        <span class="value">{{ data.rank }}</span>
      </div>

      <!-- Total -->
      <div class="row">
        <div class="left">
          <img src="/icons/total.svg" class="icon" />
          <span class="label">Total Hours</span>
        </div>
        <span class="value">{{ data.totalPoints }} pts</span>
      </div>

      <!-- Average -->
      <div class="row">
        <div class="left">
          <img src="/icons/clock.svg" class="icon" />
          <span class="label">Average check-in time</span>
        </div>
        <span class="value">{{ data.avgTime }}</span>
      </div>
    </div>
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
.summary {
  display: flex;
  flex-direction: column;
}

/* row */
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.row:last-child {
  border-bottom: none;
}

/* ฝั่งซ้าย */
.left {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* icon */
.icon {
  width: 22px;
  height: 22px;
}

/* label */
.label {
  font-size: 16px;
  color: #111;
}

/* value */
.value {
  font-size: 14px;
  font-weight: 500;
}
</style>
