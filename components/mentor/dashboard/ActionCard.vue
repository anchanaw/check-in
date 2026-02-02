<template>
  <BaseCard>
    <h3 class="title">Actions</h3>

    <a-button
      v-for="action in actions"
      :key="action.label"
      type="primary"
      block
      class="action-btn"
    >
      <span>{{ action.label }}</span>
      <span>›</span>
    </a-button>
  </BaseCard>
</template>

<script setup>
import BaseCard from '@/components/base/BaseCard.vue'

const actions = ref([
  { label: '📨 Tasks' },
  { label: '👤 View intern list' },
  { label: '⭐ Review bonus tasks' },
  { label: '📄 Review leave requests' }
])

// TODO: link route / API later
</script>

<style scoped>
.title {
  font-weight: 600;
  margin-bottom: 12px;
}

.action-btn {
  margin-bottom: 8px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.action-btn:last-child {
  margin-bottom: 0;
}
</style>
