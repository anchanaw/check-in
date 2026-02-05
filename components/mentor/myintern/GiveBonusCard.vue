<template>
  <BaseCard class="bonus-card">
    <!-- Title -->
    <div class="title">Give Bonus Points</div>
    <div class="divider" />

    <a-space direction="vertical" :size="14" style="width:100%">
      <!-- Points -->
      <div class="points-row">
        <span class="label">Points</span>

        <div class="points-stepper">
          <a-button
            class="step-btn"
            @click="decrease"
            :disabled="points <= 1"
          >
            −
          </a-button>

          <div class="points-value">{{ points }}</div>

          <a-button
            class="step-btn"
            @click="increase"
          >
            +
          </a-button>
        </div>
      </div>

      <!-- Reason -->
      <a-textarea
  v-model:value="reason"
  placeholder="Reason"
  :rows="3"
  class="reason-input"
  :status="reasonError ? 'error' : ''"
/>

<!-- error message -->
<div v-if="reasonError" class="error-text">
  Reason is required
</div>

<a-button
  type="primary"
  block
  class="submit-btn"
  :disabled="!canSubmit"
  @click="submit"
>
  Add points
</a-button>
    </a-space>
  </BaseCard>
</template>

<script setup>
import { ref, computed } from 'vue'
import BaseCard from '@/components/base/BaseCard.vue'

const points = ref(1)
const reason = ref('')

/* stepper */
const increase = () => {
  if (points.value < 10) points.value++
}

const decrease = () => {
  if (points.value > 1) points.value--
}

/* validation */
const reasonError = computed(() => {
  return reason.value.trim() === ''
})

const canSubmit = computed(() => {
  return !reasonError.value
})

const submit = () => {
  if (!canSubmit.value) return

  console.log('ADD BONUS', {
    points: points.value,
    reason: reason.value.trim()
  })

  // TODO: API
}
</script>

<style scoped>
.bonus-card {
  padding-top: 4px;
}

/* Title */
.title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 6px;
}

/* Divider */
.divider {
  height: 1px;
  background: #e5e7eb;
  margin-bottom: 12px;
}

/* Points row */
.points-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.label {
  font-size: 14px;
}

/* Stepper */
.points-stepper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.step-btn {
  width: 32px;
  height: 32px;
  padding: 0;
  font-size: 18px;
  border-radius: 6px;
}

.points-value {
  width: 36px;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
}

/* Reason */
.reason-input {
  border-radius: 10px;
  padding: 10px;
  font-size: 14px;
}

/* Submit */
.submit-btn {
  height: 44px;
  font-size: 16px;
  border-radius: 12px;
  background-color: #74C3FF;
  border: none;        /* เอาขอบออก */
  outline: none;       /* กันกรณีมีเส้นตอน focus */
}
</style>
