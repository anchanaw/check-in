<template>
  <BaseCard class="card">
    <a-typography-text strong>
      Company Information
    </a-typography-text>

    <a-form-item label="Company Name">
      <a-input v-model:value="localName" />
    </a-form-item>
  </BaseCard>
</template>

<script setup>
import BaseCard from '@/components/base/BaseCard.vue'
import { computed } from 'vue'

const props = defineProps({
  name: String
})

const emit = defineEmits(['update:name'])

const localName = computed({
  get: () => props.name,
  set: (val) => emit('update:name', val)
})
</script>

<style scoped>
.card {
  margin-bottom: 16px;
}
</style>
