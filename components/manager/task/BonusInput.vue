<template>
  <div class="bonus-input">
    <a-button size="small" @click="decrease">−</a-button>

    <a-input-number
      v-model:value="localValue"
      :min="0"
      :controls="false"
      size="small"
      class="input"
      @change="handleChange"
    />

    <a-button size="small" @click="increase">+</a-button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    default: 1
  }
})

const emit = defineEmits(['update:modelValue'])

const localValue = computed({
  get: () => props.modelValue,
  set: (val: number) => {
    if (val >= 0) emit('update:modelValue', val)
  }
})

const increase = () => {
  emit('update:modelValue', props.modelValue + 1)
}

const decrease = () => {
  if (props.modelValue > 0) {
    emit('update:modelValue', props.modelValue - 1)
  }
}

const handleChange = (val: number | null) => {
  if (val === null || val < 0) {
    emit('update:modelValue', 0)
  }
}
</script>

<style scoped>
.bonus-input {
  display: flex;
  align-items: center;     /* กึ่งกลางแนวตั้ง */
  justify-content: center; /* กึ่งกลางแนวนอน */
  gap: 8px;
}

.input {
  width: 60px;
}

/* จัดข้อความใน input ให้อยู่กลาง */
:deep(.ant-input-number-input) {
  text-align: center;
}
</style>