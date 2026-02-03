<template>
  <BaseCard>
    <!-- Title -->
    <div class="title">Leave History</div>

    <!-- Header row -->
    <div class="header-row">
      <span>Reason</span>
      <span>Date</span>
      <span>Status</span>
    </div>

    <!-- Data rows -->
    <div
      v-for="item in items"
      :key="item.id"
      class="row"
    >
      <span class="reason">{{ item.reason }}</span>
      <span class="date">{{ item.date }}</span>

      <span
  class="status-tag"
  :class="statusClass(item.status)"
>
  {{ formatStatus(item.status) }}
</span>
    </div>
  </BaseCard>
</template>

<script setup>
import BaseCard from '@/components/base/BaseCard.vue'

defineProps({
  items: Array
})

const statusClass = (status) => {
  if (status === 'approved' || status === 'on-leave') return 'on-leave'
  if (status === 'pending') return 'pending'
  return ''
}

const formatStatus = (status) => {
  if (status === 'approved' || status === 'on-leave') return 'On leave'
  if (status === 'pending') return 'Pending'
  return status
}
</script>

<style scoped>
/* Title */
.title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
}

/* Header */
.header-row {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 8px;
  font-size: 13px;
  font-weight: 500;
  padding-bottom: 6px;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 6px;
}

/* Row */
.row {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 8px;
  font-size: 13px;
  padding: 6px 0;
  align-items: center;
}

/* Status tag */
.status-tag {
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
}

/* สีตามสถานะ */
.status-tag.on-leave {
  background: #3b82f6;
  color: #fff;
}

.status-tag.pending {
  background: #f59e0b;
  color: #fff;
}

/* text */
.reason {
  color: #111;
}

.date {
  color: #111;
}
</style>

