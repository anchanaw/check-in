<template>
  <BaseCard>
    <a-typography-text strong>History</a-typography-text>

    <div v-for="item in items" :key="item.id" class="row">
      <span class="green">+{{ item.point }} {{ item.reason }}</span>
      <span>{{ item.date }}</span>
    </div>
  </BaseCard>
</template>

<script setup>
import BaseCard from '@/components/base/BaseCard.vue'
defineProps({ items: Array })
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
