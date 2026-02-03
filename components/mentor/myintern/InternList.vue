<template>
  <BaseCard>
    <a-skeleton v-if="loading" active />

    <div v-else class="content">
      <!-- Intern list box -->
      <div class="inner-box">
        <div v-for="intern in interns" :key="intern.id" class="row clickable" @click="$emit('select', intern)">
          <div class="left">
            <span :class="['dot', intern.status]" />
            <strong class="name">{{ intern.name }}</strong>
          </div>

          <div class="right">
            <span v-if="intern.time" class="time">
              {{ intern.time }}
            </span>
            <span class="order">{{ intern.order }}</span>
          </div>
        </div>
      </div>

      <!-- Legend box -->
      <div class="inner-box legend-box">
        <div class="legend-item">
          <span class="dot checked-in"></span>
          <span>Checked-in</span>
        </div>

        <div class="legend-item">
          <span class="dot leave-pending"></span>
          <span>Leave Pending</span>
        </div>

        <div class="legend-item">
          <span class="dot not-checked"></span>
          <span>Not Checked-in</span>
        </div>

        <div class="legend-item">
          <span class="dot on-leave"></span>
          <span>On Leave</span>
        </div>
      </div>
    </div>
  </BaseCard>
</template>

<script setup>
import BaseCard from '@/components/base/BaseCard.vue'

defineProps({
  loading: Boolean,
  interns: Array
})

defineEmits(['select'])
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* กล่องขาวด้านใน */
.inner-box {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

/* row ของรายชื่อ */
.row {
  display: flex;
  justify-content: space-between;
  padding: 10px 12px;
  border-bottom: 1px solid #eee;
}

.row:last-child {
  border-bottom: none;
}

.clickable {
  cursor: pointer;
}

.clickable:hover {
  background: #f5f8ff;
}

.left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.left .name {
  font-size: 16px;
  font-weight: 400;
}
.right {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
}

.time {
  color: #22c55e;
}

.order {
  color: #555;
}

/* กล่อง legend */
.legend-box {
  padding: 10px 12px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  font-size: 13px;
}

/* item แต่ละอัน */
.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

/* จุดสี */
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.checked-in {
  background: #22c55e;
}

.leave-pending {
  background: #facc15;
}

.not-checked {
  background: #9ca3af;
}

.on-leave {
  background: #3b82f6;
}
</style>
