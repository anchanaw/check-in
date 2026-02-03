<template>
  <BaseCard>
    <a-typography-text strong>Leave History</a-typography-text>

    <div v-for="item in items" :key="item.id" class="row">
      <span>{{ item.reason }}</span>
      <span>{{ item.date }}</span>
      <a-tag :color="item.status === 'approved' ? 'green' : 'orange'">
        {{ item.status }}
      </a-tag>
    </div>
  </BaseCard>
</template>

<script setup>
import BaseCard from '@/components/base/BaseCard.vue'
defineProps({ items: Array })
</script>

<style scoped>
.row {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 6px;
  font-size: 13px;
}
</style>
