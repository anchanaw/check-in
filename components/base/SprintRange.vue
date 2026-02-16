<template>
  <div class="sprint-range">
    {{ sprintText }}
  </div>
</template>

<script setup>
import { computed } from 'vue'
import dayjs from 'dayjs'

/**
 * Anchor Date
 * 👉 กำหนดวันเริ่ม Sprint รอบแรก
 * เช่น 6 Jan 2025 (วันจันทร์)
 */
const anchor = dayjs('2026-02-16')

// จำนวนวันต่อ sprint
const SPRINT_LENGTH = 14

const sprintText = computed(() => {
  const today = dayjs()

  // จำนวนวันผ่านไปจาก anchor
  const diffDays = today.diff(anchor, 'day')

  // หา sprint index ปัจจุบัน
  const sprintIndex = Math.floor(diffDays / SPRINT_LENGTH)

  // คำนวณวันเริ่ม sprint ปัจจุบัน
  const sprintStart = anchor.add(sprintIndex * SPRINT_LENGTH, 'day')

  // วันจบ = ศุกร์ของสัปดาห์ถัดไป (start + 11)
  const sprintEnd = sprintStart.add(11, 'day')

  const formatThai = (date) => {
    const yearBE = date.year() + 543
    return date.format(`DD/MM/${yearBE}`)
  }

  return `${formatThai(sprintStart)} - ${formatThai(sprintEnd)}`
})
</script>

<style scoped>
.sprint-range {
  font-size: 12px;
  color: #666;
}
</style>
