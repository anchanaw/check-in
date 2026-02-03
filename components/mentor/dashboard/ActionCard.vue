<template>
  <BaseCard>
    <h3 class="title">Actions</h3>

    <a-button
      v-for="action in actions"
      :key="action.label"
      type="primary"
      block
      class="action-btn"
      @click="go(action.route)"
    >
      <span>{{ action.label }}</span>
      <span>›</span>
    </a-button>
  </BaseCard>
</template>

<script setup>
import { useRouter } from 'vue-router'
import BaseCard from '@/components/base/BaseCard.vue'

const router = useRouter()

const actions = [
  {
    label: '📨 Tasks',
    route: '/mentor/tasks'
  },
  {
    label: '👤 View intern list',
    route: '/mentor/team'
  },
  {
    label: '⭐ Review bonus tasks',
    route: '/mentor/bonus'
  },
  {
    label: '📄 Review leave requests',
    route: '/mentor/leave_request'
  }
]

const go = (route) => {
  router.push(route)
}
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
