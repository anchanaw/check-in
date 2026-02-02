<template>
  <div class="h-screen flex items-center justify-center bg-gray-50">
    <div class="flex flex-col items-center gap-4">
      <!-- Spinner -->
      <div
        class="h-10 w-10 rounded-full border-4 border-gray-300 border-t-gray-600 animate-spin"
      />

      <!-- Text -->
      <p class="text-gray-600 text-sm">
        กำลังตรวจสอบลิงก์ของคุณ…
      </p>

      <!-- Sub text -->
      <p class="text-gray-400 text-xs">
        กรุณารอสักครู่
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, navigateTo } from '#app'
import { onMounted } from 'vue'

const route = useRoute()

onMounted(() => {
  const token = route.query.token as string | undefined

  if (!token) {
    navigateTo('/login')
    return
  }

  const path = route.fullPath

  if (path.includes('/auth/register')) {
    navigateTo(`/register?token=${token}`)
    return
  }

  if (path.includes('/auth/login')) {
    navigateTo(`/login?token=${token}`)
    return
  }

  navigateTo('/login')
})
</script>
