<template>
  <BaseCard class="bonus-card">
    <div class="row">
      <!-- LEFT -->
      <div class="left">
        <div class="name">{{ task.internName }}</div>
        <div class="task">
          <img src="/icons/book.svg" class="task-icon" />
          <span>Task : {{ task.taskTitle }}</span>
        </div>

      </div>

      <!-- RIGHT -->
      <div class="right">
        <div class="point">+{{ task.bonusPoint }} points</div>
        <a-button size="middle" type="primary" class="review-btn" @click="$emit('review')">
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
.bonus-card {
  padding: 10px !important;
  max-width: 362px;
  /* กำหนดความกว้างการ์ด */
  margin: 0 auto;
}

/* layout หลัก */
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* กึ่งกลางแนวตั้ง */
  min-height: 60px;
  /* กันยุบ ทำให้ดูบาลานซ์ */
}

/* ฝั่งซ้าย */
.left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* กึ่งกลางเสมอ */
  gap: 17px;
}

/* ฝั่งขวา */
.right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* กึ่งกลางเสมอ */
  align-items: flex-end;
  gap: 8px;
}

.name {
  font-size: 20px;
  font-weight: 600;
}

/* task */
.task {
  font-size: 15px;
  color: #6b7280;
  display: flex;
  align-items: center;
  margin-left: 10px;
}

/* ฝั่งขวา */
.right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.point {
  font-size: 20px;
  font-weight: 600;
  color: #faad14;
}

/* ปุ่ม review */
.review-btn {
  max-width: 71px;
  height: 32px;
  border-radius: 8px;
  font-size: 16px;
  background-color: #74c3ff;
  border: none;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

.task-icon {
  width: 24px;
  height: 24px;
}
</style>
