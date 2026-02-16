<template>
  <div class="bonus-input">
    <a-button size="small" @click="decrease">−</a-button>
    <span class="value">{{ modelValue }}</span>
    <a-button size="small" @click="increase">+</a-button>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Number,
    default: 1
  }
})

const emit = defineEmits(['update:modelValue'])

const increase = () => {
  emit('update:modelValue', props.modelValue + 1)
}

const decrease = () => {
  if (props.modelValue > 0) {
    emit('update:modelValue', props.modelValue - 1)
  }
}
</script>

<style scoped>
.bonus-input {
  display: flex;
  align-items: center;
  gap: 12px;
}

.value {
  min-width: 24px;
  text-align: center;
  font-weight: 600;
}
</style>
