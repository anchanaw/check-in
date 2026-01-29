<script setup lang="ts">
import { ref } from 'vue'
import { navigateTo } from '#app'


type InviteType = 'register' | 'team_change' | 'intern' | 'invalid' | null

const inviteType = ref<InviteType>(null)

const goRegister = () => {
  inviteType.value = 'register'
  setTimeout(() => {
    navigateTo('/register?invite=MOCK_REGISTER')
  }, 700)
}

const goTeamChange = () => {
  inviteType.value = 'team_change'
  setTimeout(() => {
    navigateTo('/login?invite=MOCK_TEAM_CHANGE')
  }, 700)
}

const goIntern = () => {
  inviteType.value = 'intern'
  setTimeout(() => {
    navigateTo('/intern')
  }, 700)
}

const goInvalid = () => {
  inviteType.value = 'invalid'
}
</script>

<template>
  <div class="h-screen flex flex-col items-center justify-center gap-6 px-6 text-center">
    <h1 class="text-xl font-semibold">
      Index Dispatcher (Mock)
    </h1>

    <p class="text-gray-500 text-sm">
      หน้านี้เป็นจุดกลางสำหรับตัดสินใจ route จาก invite / auth context
    </p>

    <!-- Demo Buttons -->
    <div class="w-full max-w-xs flex flex-col gap-3">
      <button class="bg-blue-500 text-white py-2 rounded" @click="goRegister">
        Mock Invite: register
      </button>

      <button class="bg-green-500 text-white py-2 rounded" @click="goTeamChange">
        Mock Invite: team_change
      </button>

      <button class="bg-purple-500 text-white py-2 rounded" @click="goIntern">
        Mock: Intern (already login)
      </button>

      <button class="bg-red-500 text-white py-2 rounded" @click="goInvalid">
        Mock: invalid / expired
      </button>
    </div>

    <!-- Status -->
    <div class="text-sm text-gray-600 mt-4">
      <template v-if="!inviteType">
        ยังไม่ได้เลือก mock state
      </template>

      <template v-else-if="inviteType === 'register'">
        invite_type = <b>register</b> → ไปหน้า Register
      </template>

      <template v-else-if="inviteType === 'team_change'">
        invite_type = <b>team_change</b> → ไปหน้า Login
      </template>

      <template v-else-if="inviteType === 'intern'">
        ผู้ใช้ login แล้ว → ไปหน้า Intern Dashboard
      </template>

      <template v-else>
        ❌ Invite ไม่ถูกต้องหรือหมดอายุ
      </template>
    </div>
  </div>
</template>
