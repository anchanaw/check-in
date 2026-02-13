<template>
  <CheckInHeader :userName="user.display_name" :date="dateTime.date" />
  <div class="content">
<LocationCard :latitude="latitude" :longitude="longitude" />
    <CheckInStatusCard />
  </div>

  <div class="action">
    <a-button class="checkin-btn" type="primary" size="large" @click="onCheckIn">
      ⭐ Check-in
    </a-button>
  </div>
  
  <CheckinSuccessModal :open="checkinSuccess" @close="checkinSuccess = false" />

  <CheckinFailModal :open="checkinFail" @close="checkinFail = false" />
  <BottomBar/>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

import CheckInHeader from '~/components/intern/checkin/CheckInHeader.vue'
import LocationCard from '~/components/intern/checkin/LocationCard.vue'
import CheckInStatusCard from '~/components/intern/checkin/CheckInStatusCard.vue'
import CheckinSuccessModal from '~/components/intern/CheckinSuccessModal.vue'
import CheckinFailModal from '~/components/intern/CheckinFailModal.vue'
import { useCheckinApi } from '~/composables/useCheckinApi'
import BottomBar from '~/components/intern/BottomBar.vue'

const { checkIn } = useCheckinApi()

definePageMeta({ layout: 'app' ,middleware:'auth'})

const latitude = ref<number | null>(null)
const longitude = ref<number | null>(null)
const locationError = ref('')
const checkinSuccess = ref(false)
const checkinFail = ref(false)

// mock user
const user = {
  display_name: 'Sompong'
}

// เวลา real-time
const now = ref(new Date())
let timer: number | undefined

const getLocation = () => {
  return new Promise<{ lat: number, lng: number }>((resolve, reject) => {
    if (!import.meta.client) {
      reject('Not running in browser')
      return
    }

    if (!navigator.geolocation) {
      reject('Geolocation not supported')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject('Permission denied')
            break
          case error.POSITION_UNAVAILABLE:
            reject('Location unavailable')
            break
          case error.TIMEOUT:
            reject('Location timeout')
            break
          default:
            reject('Unknown error')
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    )
  })
}


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
const onCheckIn = async () => {
  try {
    const location = await getLocation()

    latitude.value = location.lat
    longitude.value = location.lng

    console.log('LAT:', latitude.value)
    console.log('LNG:', longitude.value)

    await checkIn({
      latitude: latitude.value!,
      longitude: longitude.value!
    })

    checkinSuccess.value = true

  } catch (error: any) {
    console.error(error)
    locationError.value = error?.data?.message || String(error)
    checkinFail.value = true
  }
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
