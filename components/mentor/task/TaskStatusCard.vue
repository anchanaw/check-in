<template>
  <BaseCard class="status-card" v-if="status === 'approved'">
    <div class="status-row">

      <div class="status-icon">
        <img src="/icons/check.svg" class="icon-img" />
      </div>

      <div>
        <div class="status-text">
          Status : Approved
        </div>
        <div class="review-text">
          Reviewed By Mentor
        </div>
      </div>

    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from '@/components/base/BaseCard.vue'

defineProps<{
  status: 'approved'
}>()
</script>

<style scoped>
.status-card {
  background: rgba(195, 255, 204, 0.66);
  border-radius: 16px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
  padding: 12px 16px !important;
}

.status-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.status-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-img {
  width: 20px;
  height: 20px;
}

.status-text {
  font-weight: 500;
  font-size: 16px;
  color: #0B6719;
}

.review-text {
  font-size: 13px;
  font-weight: 400;
  color: #000000;
}
</style>
