<template>
  <BaseCard>
    <div class="row">
      <span class="label">Team</span>
      <span>{{ team.name }}</span>
    </div>

    <div class="row">
      <span class="label">Mentor</span>
      <span>{{ team.mentor }}</span>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from '@/components/base/BaseCard.vue'

defineProps<{
  team: {
    name: string
    mentor: string
    // status จะมาจาก API ภายหลัง ถ้าต้องใช้ค่อยเพิ่ม
  }
}>()
</script>

<style scoped>
.row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.label {
  color: #3b82f6;
  font-weight: 500;
}
</style>
