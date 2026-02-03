<template>
  <a-form layout="vertical">
    <a-form-item label="Team *">
      <a-select
        :value="modelValue"
        placeholder="Select team"
        :options="teams"
        @update:value="$emit('update:modelValue', $event)"
      />
    </a-form-item>
  </a-form>
</template>

<script setup>
defineProps({
  modelValue: String,
  teams: {
    type: Array,
    default: () => []
  }
})

defineEmits(['update:modelValue'])
</script>
