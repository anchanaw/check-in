<template>
  <BaseCard>

    <div class="student-name">
      {{ task.studentName }}
    </div>

    <div class="row">
      <span>Task :</span>
      <span>{{ task.taskTitle }}</span>
    </div>

    <div class="row">
      <span>Submitted :</span>
      <span>{{ task.submittedDate }}</span>
    </div>

    <div class="row">
      <span>Bonus Points :</span>
      <span class="bonus">+{{ task.bonusPoints }} points</span>
    </div>

  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from '@/components/base/BaseCard.vue'
defineProps<{ task: any }>()
</script>

<style scoped>
.student-name {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
}

.row {
  font-size: 14px;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
  color: #757575;
}

.bonus {
  color: #f59e0b;
}
</style>
