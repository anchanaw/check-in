<template>
  <a-badge class="notification" :count="newTaskCount" :overflow-count="99">
    <a-button class="notification-btn" type="text" shape="circle" @click="goToNoti">
      <BellOutlined />
    </a-button>
  </a-badge>
  <div class="content">
    <CheckInHeader :userName="`${user.firstName} ${user.lastName}`" :date="dateTime.date" />

    <LocationCard :latitude="latitude" :longitude="longitude" />
    <CheckInStatusCard />
  </div>

  <div class="action">
    <a-button class="checkin-btn" type="primary" size="large" :loading="checking" @click="onCheckIn">
      ⭐ Check-in
    </a-button>
  </div>

  <CheckinSuccessModal :open="checkinSuccess" @close="checkinSuccess = false" />

  <CheckinFailModal :open="checkinFail" @close="checkinFail = false" />
  <BottomBar />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

import { BellOutlined } from '@ant-design/icons-vue'
import CheckInHeader from '~/components/intern/checkin/CheckInHeader.vue'
import LocationCard from '~/components/intern/checkin/LocationCard.vue'
import CheckInStatusCard from '~/components/intern/checkin/CheckInStatusCard.vue'
import CheckinSuccessModal from '~/components/intern/CheckinSuccessModal.vue'
import CheckinFailModal from '~/components/intern/CheckinFailModal.vue'
import { useCheckinApi } from '~/composables/useCheckinApi'
import BottomBar from '~/components/intern/BottomBar.vue'
import { useApi } from '~/composables/core'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'

const router = useRouter()
const { apiFetch } = useApi()
const { checkIn } = useCheckinApi()

definePageMeta({
  layout: 'mobile'
})
const latitude = ref<number | null>(null)
const longitude = ref<number | null>(null)
const locationError = ref('')
const checkinSuccess = ref(false)
const checkinFail = ref(false)

const user = ref({
  firstName: '',
  lastName: ''
})

// เวลา real-time
const now = ref(new Date())
let timer: ReturnType<typeof setInterval> | undefined
const newTaskCount = ref(0)

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

onMounted(async () => {
  try {
    const [meRes, taskRes, submissionRes]: any = await Promise.all([
      apiFetch('/auth/me'),
      apiFetch('/tasks'),
      apiFetch('/tasks/submissions/me')
    ])

    user.value.firstName = meRes?.data?.firstName || ''
    user.value.lastName = meRes?.data?.lastName || ''

    const threeDaysAgo = dayjs().subtract(3, 'day')

    const tasks = taskRes?.data?.tasks || []
    const submissionsRaw = submissionRes?.data?.submissions || submissionRes?.data || []
    const submissions = Array.isArray(submissionsRaw) ? submissionsRaw : []

    const recentTasks = tasks
      .filter((task: any) => dayjs(task.createdAt).isAfter(threeDaysAgo))
      .map((task: any) => ({
        ...task,
        status: getTaskStatus(task, submissions)
      }))
      .filter((task: any) => task.status === 'not_done')

    newTaskCount.value = recentTasks.length

  } catch (err) {
    console.error('Init page error:', err)
  }

  timer = setInterval(() => {
    now.value = new Date()
  }, 60000)
})

const dateTime = computed(() => {
  const d = now.value
  return {
    date: `${String(d.getDate()).padStart(2, '0')} | ${String(d.getMonth() + 1).padStart(2, '0')} | ${d.getFullYear()}`,
    time: `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
  }
})
const checking = ref(false)
const onCheckIn = async () => {
  try {
    checking.value = true

    const location = await getLocation()

    await checkIn({
      latitude: location.lat,
      longitude: location.lng
    })

    checkinSuccess.value = true
  } catch (error: any) {
    if (error?.data?.code === 'TEAM_REQUIRED') {
      checkinFail.value = false
      message.error('You are not assigned to a team yet.')
      return
    }

    checkinFail.value = true
  } finally {
    checking.value = false
  }
}

const goToNoti = () => {
  router.push('/intern/notifications')
}

function getTaskStatus(task: any, submissions: any[]) {
  const submission = submissions.find((s: any) => s.taskId === task.id)
  if (submission) return submission.status

  const now = new Date()
  const end = new Date(task.deadline)
  return now > end ? 'done' : 'not_done'
}
</script>


<style scoped>
.checkin-page {
  position: relative;
  inset: 0;
  display: flex;
  flex-direction: column;
}

.content {
  display: flex;
  width: 100%;
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

.notification {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

.notification-btn {
  font-size: 30px;
}
</style>
