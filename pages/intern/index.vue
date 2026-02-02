<template>
  <CheckInHeader :userName="user.display_name" :date="dateTime.date" />
  <div class="content">
    <LocationCard />
    <CheckInStatusCard />
  </div>

  <div class="action">
    <a-button class="checkin-btn" type="primary" size="large" @click="onCheckIn">
      ⭐ Check-in
    </a-button>
  </div>

  <a-button type="primary" @click="checkinSuccess = true">
    Mock Success
  </a-button>

  <a-button danger @click="checkinFail = true">
    Mock Fail
  </a-button>

  <CheckinSuccessModal :open="checkinSuccess" @close="checkinSuccess = false" />

  <CheckinFailModal :open="checkinFail" @close="checkinFail = false" />
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

import CheckInHeader from '~/components/checkin/CheckInHeader.vue'
import LocationCard from '~/components/checkin/LocationCard.vue'
import CheckInStatusCard from '~/components/checkin/CheckInStatusCard.vue'
import CheckinSuccessModal from '~/components/intern/CheckinSuccessModal.vue'
import CheckinFailModal from '~/components/intern/CheckinFailModal.vue'
import { useCheckinApi } from '~/composables/useCheckinApi'

const { checkIn } = useCheckinApi()

definePageMeta({ layout: 'app' ,middleware:'auth'})

const checkinSuccess = ref(false)
const checkinFail = ref(false)

// mock user
const user = {
  display_name: 'Sompong'
}

// เวลา real-time
const now = ref(new Date())
let timer

onMounted(() => {
  timer = setInterval(() => {
    now.value = new Date()
  }, 60000)
})

onUnmounted(() => {
  clearInterval(timer)
})

const dateTime = computed(() => {
  const d = now.value
  return {
    date: `${String(d.getDate()).padStart(2, '0')} | ${String(d.getMonth() + 1).padStart(2, '0')} | ${d.getFullYear()}`,
    time: `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
  }
})

const onCheckIn = () => {
  // mock result (รอ API)
  const success = Math.random() > 0.5
  success ? checkinSuccess.value = true : checkinFail.value = true
}
</script>


<style scoped>
.content {
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.action {
  margin: 24px 0 63px;
  display: flex;
  justify-content: center;
}

.checkin-btn {
  width: 135px;
  height: 47px;
  background: #0FDC19;
  color: #fff;
  border: none;
  margin-top: 79px;
  margin-bottom: 60px;
  padding: 12px 28px;
  border-radius: 8px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
