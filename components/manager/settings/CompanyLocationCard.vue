<template>
  <BaseCard class="card">
    <div class="header">
      <a-typography-text strong>
        Company Location
      </a-typography-text>
      <span class="sub">Check-in</span>
    </div>

    <a-form-item label="Latitude">
      <a-input v-model:value="localLat">
        <template #suffix>
          <EnvironmentOutlined />
        </template>
      </a-input>
    </a-form-item>

    <a-form-item label="Longitude">
      <a-input v-model:value="localLng">
        <template #suffix>
          <EnvironmentOutlined />
        </template>
      </a-input>
    </a-form-item>

    <a-form-item label="Radius (meters)">
      <a-input-number v-model:value="localRadius" :min="0" :step="10" style="width: 100%;">
        <template #suffix>
          m
        </template>
      </a-input-number>
    </a-form-item>

  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from '@/components/base/BaseCard.vue'
import { EnvironmentOutlined } from '@ant-design/icons-vue'
import { computed } from 'vue'

const props = defineProps<{
  latitude: string
  longitude: string
  radius: number
}>()

const emit = defineEmits<{
  (e: 'update:latitude', value: string): void
  (e: 'update:longitude', value: string): void
  (e: 'update:radius', value: number): void
}>()

const localLat = computed({
  get: () => props.latitude,
  set: (val: string) => emit('update:latitude', val)
})

const localLng = computed({
  get: () => props.longitude,
  set: (val: string) => emit('update:longitude', val)
})

const localRadius = computed({
  get: () => props.radius,
  set: (val: number | null) => emit('update:radius', val ?? 0)
})
</script>

<style scoped>
.card {
  margin-bottom: 16px;
}

.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.sub {
  font-size: 12px;
  color: #666;
}
</style>
