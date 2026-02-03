<template>
  <BaseCard class="team-card">
    <a-form layout="vertical">
      <a-form-item label="Team" class="team-item">
        <a-select
          allow-clear
          placeholder="Select team"
          :options="teams"
          :value="modelValue"
          @update:value="onChange"
        />
      </a-form-item>
    </a-form>
  </BaseCard>
</template>

<script setup>
import BaseCard from '@/components/base/BaseCard.vue'

const props = defineProps({
  teams: {
    type: Array,
    required: true
  },
  modelValue: {
    type: String,
    default: null
  }
})

const emit = defineEmits(['update:modelValue'])

const onChange = (value) => {
  emit('update:modelValue', value)
}
</script>

<style scoped>
/* กล่องการ์ด */
.team-card {
  font-size: 14px;
  border-radius: 14px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

/* ✅ padding ของ card */
.team-card :deep(.ant-card-body) {
  padding: 10px;
}

/* ❗ ตัด spacing ของ form */
.team-form {
  margin-bottom: 0;
}

.team-form :deep(.ant-form) {
  margin-bottom: 0;
}

/* ❗ ตัด spacing ของ form-item */
.team-item {
  margin-bottom: 0;
}

.team-item :deep(.ant-form-item-control-input) {
  margin-bottom: 0;
}

/* select */
.team-item :deep(.ant-select-selector) {
  height: 44px;
  border-radius: 10px;
  padding: 0 12px;
  display: flex;
  align-items: center;
}

/* label */
.team-item :deep(.ant-form-item-label > label) {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
}
</style>
