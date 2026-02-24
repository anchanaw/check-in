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
import { ref, onMounted } from 'vue'

const latitude = ref<number | null>(null)
const longitude = ref<number | null>(null)
const loading = ref(false)

const getLocation = () => {
  if (!navigator.geolocation) {
    alert('Geolocation not supported')
    return
  }

  loading.value = true

  navigator.geolocation.getCurrentPosition(
    (position) => {
      latitude.value = position.coords.latitude
      longitude.value = position.coords.longitude
      loading.value = false
    },
    (error) => {
      console.error(error)
      alert('Unable to retrieve location')
      loading.value = false
    }
  )
}

onMounted(() => {
  getLocation()
})

const handleReset = () => {
  getLocation()   // 🔥 ดึงใหม่
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
