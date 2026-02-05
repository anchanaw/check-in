<template>
  <BaseCard>
    <div class="summary-wrapper">
      <a-skeleton v-if="loading" active />

      <div v-else class="summary">
        <div class="name">{{ task.internName }}</div>

        <div class="task">Task : {{ task.title }}</div>

        <div class="divider"></div>

        <div class="row">
          <span class="label">Submitted :</span>
          <span>{{ task.submittedAt }}</span>
        </div>

        <div class="divider"></div>

        <div class="row">
          <span class="label">Bonus Points :</span>
          <span class="point">+{{ task.bonusPoint }} points</span>
        </div>
      </div>
    </div>
  </BaseCard>
</template>


<script setup>
import BaseCard from '@/components/base/BaseCard.vue'
defineProps({ task: Object, loading: Boolean })
</script>

<style scoped>
/* 🔥 หลบ padding เดิมของ BaseCard (24px) */
.summary-wrapper {
  margin: -24px;     /* ลบ padding เดิม */
  padding: 10px;     /* ใส่ padding ใหม่ที่ต้องการ */
}

/* เนื้อหา */
.summary {
  display: flex;
  flex-direction: column;
  font-size: 14px;
}

/* ชื่อ */
.name {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 4px;
}

/* task */
.task {
  color: #6b7280;
  margin-left: 10px;
}

/* เส้นคั่น */
.divider {
  height: 1px;
  background: #e5e7eb;
  margin: 8px 0;
}

/* แถวข้อมูล */
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* label */
.label {
  color: #6b7280;
  margin-left: 10px;
}

/* bonus point */
.point {
  color: #f59e0b;
  font-weight: 700;
}

</style>
