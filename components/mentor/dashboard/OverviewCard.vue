<template>
  <BaseCard>
    <h3 class="title">Overview</h3>

    <div
      v-for="item in overview"
      :key="item.label"
      class="row"
    >
      <span>{{ item.label }}</span>
      <span class="value">{{ item.value }}</span>
    </div>
  </BaseCard>
</template>

<script setup>
import BaseCard from '@/components/base/BaseCard.vue'

const overview = ref([
  { label: 'Intern in team :', value: 5 },
  { label: 'Task to review :', value: 3 },
  { label: 'Leave requests :', value: 1 }
])

// TODO: replace with API
</script>

<style scoped>
.title {
  font-weight: 600;
  margin-bottom: 12px;
}

.row {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  border-bottom: 1px solid #f0f0f0;
  font-size: 14px;
}

.row:last-child {
  border-bottom: none;
}

.value {
  font-weight: 500;
}
</style>
