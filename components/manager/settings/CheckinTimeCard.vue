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

<script setup lang="ts">
import BaseCard from '@/components/base/BaseCard.vue'
import { computed } from 'vue'
import type { Dayjs } from 'dayjs'

const props = defineProps<{
  start: Dayjs | null
  end: Dayjs | null
}>()

const emit = defineEmits<{
  (e: 'update:start', value: Dayjs | null): void
  (e: 'update:end', value: Dayjs | null): void
}>()

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
