<template>
  <div
    class="status-switch"
    :class="{ on: modelValue, disabled }"
    @click="toggle"
  >
    <div class="knob"></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
  disabled?: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const toggle = () => {
  if (props.disabled) return
  emit('update:modelValue', !props.modelValue)
}
</script>

<style scoped>.status-switch {
  width: 36px;
  height: 18px;
  border-radius: 999px;
  background: #d1d5db;
  position: relative;
  cursor: pointer;
  transition: background 0.2s ease;
}

.status-switch.on {
  background: #1e6fff;
}

.status-switch.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.status-switch .knob {
  width: 14px;
  height: 14px;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: transform 0.2s ease;
  box-shadow: 0 1px 3px rgba(0,0,0,0.25);
}

.status-switch.on .knob {
  transform: translateX(18px);
}
</style>