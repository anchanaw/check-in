<template>
  <BaseCard>
    <a-form layout="vertical">
      <a-form-item label="Team">
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
