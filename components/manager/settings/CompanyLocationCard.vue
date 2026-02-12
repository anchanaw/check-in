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
  </BaseCard>
</template>

<script setup>
import BaseCard from '@/components/base/BaseCard.vue'
import { EnvironmentOutlined } from '@ant-design/icons-vue'
import { computed } from 'vue'

const props = defineProps({
  latitude: String,
  longitude: String
})

const emit = defineEmits(['update:latitude', 'update:longitude'])

const localLat = computed({
  get: () => props.latitude,
  set: (val) => emit('update:latitude', val)
})

const localLng = computed({
  get: () => props.longitude,
  set: (val) => emit('update:longitude', val)
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
