<template>
  <BaseCard class="card">
    <a-typography-text strong>
      Check-in Time
    </a-typography-text>

    <a-form-item label="Start Time">
      <a-time-picker
        v-model:value="localStart"
        format="HH:mm"
        style="width:100%"
      />
    </a-form-item>

    <a-form-item label="End Time">
      <a-time-picker
        v-model:value="localEnd"
        format="HH:mm"
        style="width:100%"
      />
    </a-form-item>
  </BaseCard>
</template>

<script setup>
import BaseCard from '@/components/base/BaseCard.vue'
import { computed } from 'vue'

const props = defineProps({
  start: null,
  end: null
})

const emit = defineEmits(['update:start', 'update:end'])

const localStart = computed({
  get: () => props.start,
  set: (val) => emit('update:start', val)
})

const localEnd = computed({
  get: () => props.end,
  set: (val) => emit('update:end', val)
})
</script>

<style scoped>
.card {
  margin-bottom: 16px;
}
</style>
