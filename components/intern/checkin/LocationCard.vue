<template>
  <BaseCard class="card" variant="checkin">
    <h3>Location</h3>

    <a-form layout="vertical">
      <a-form-item label="Latitude">
        <a-input :value="latitude ?? ''" disabled />
      </a-form-item>

      <a-form-item label="Longitude">
        <a-input :value="longitude ?? ''" disabled />
      </a-form-item>

      <a-button
        class="reset-btn"
        type="primary"
        size="small"
        @click="handleReset"
      >
        Reset
      </a-button>
    </a-form>
  </BaseCard>
</template>

<script setup lang="ts">
const props = defineProps<{
  latitude: number | null
  longitude: number | null
}>()

const emit = defineEmits<{
  (e: 'reset'): void
}>()

const handleReset = () => {
  emit('reset')
}
</script>

<style scoped>
.card {
  width: 100%;
}

.reset-btn {
  width: 67px;
  height: 40px;
  background-color: #74C3FF;
  border-radius: 8px;
  border-color: #74C3FF;
}
</style>
