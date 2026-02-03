<template>
  <BaseCard>
    <div class="row">
      <div class="left">
        <strong>{{ task.internName }}</strong>
        <div class="task">
          📄 Task: {{ task.taskTitle }}
        </div>
      </div>

      <div class="right">
        <div class="point">+{{ task.bonusPoint }} points</div>
        <a-button
          size="small"
          type="primary"
          @click="$emit('review')"
        >
          Review
        </a-button>
      </div>
    </div>
  </BaseCard>
</template>

<script setup>
import BaseCard from '@/components/base/BaseCard.vue'

defineProps({
  task: {
    type: Object,
    required: true
  }
})

defineEmits(['review'])
</script>

<style scoped>
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.task {
  font-size: 12px;
  color: #555;
}

.right {
  text-align: right;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.point {
  color: #f59e0b;
  font-weight: 600;
}
</style>
