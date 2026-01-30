<template>
  <div class="h-screen flex items-center justify-center text-center px-6">
    <div v-if="loading" class="text-gray-500">
      กำลังตรวจสอบคำเชิญ…
    </div>

    <div v-else-if="inviteType === 'invalid'" class="text-red-500">
      ❌ ลิงก์เชิญไม่ถูกต้องหรือหมดอายุ
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, navigateTo } from '#app'

type InviteType = 'register' | 'team_change' | 'intern' | 'invalid'

const route = useRoute()
const inviteType = ref<InviteType>('invalid')
const loading = ref(true)

const IS_DEV = import.meta.env.DEV

onMounted(async () => {
  const inviteCode = route.query.invite as string | undefined

  // 🟡 DEV: ไม่มี invite → ไป login ได้
  if (!inviteCode && IS_DEV) {
    navigateTo('/login')
    return
  }

  // 🔴 PROD: ไม่มี invite → invalid
  if (!inviteCode) {
    inviteType.value = 'invalid'
    loading.value = false
    return
  }

 // 🟡 DEV MOCK
if (IS_DEV) {
  inviteType.value = 'register'
  // เปลี่ยนค่าเพื่อเทส:
  // inviteType.value = 'team_change'
  // inviteType.value = 'intern'
  // inviteType.value = 'invalid'

  loading.value = false

  switch (inviteType.value) {
    case 'register':
      navigateTo(`/register?invite=${inviteCode}`)
      break

    case 'team_change':
      navigateTo(`/login?invite=${inviteCode}`)
      break

    case 'intern':
      navigateTo('/intern')
      break

    default:
      inviteType.value = 'invalid'
      break
  }

  return
}


  // 🔴 REAL API (backend มาแล้ว)
  try {
    const res = await $fetch<{ valid: boolean; invite_type: InviteType }>(
      `/api/invites/${inviteCode}`
    )

    if (!res.valid) {
      inviteType.value = 'invalid'
      loading.value = false
      return
    }

    inviteType.value = res.invite_type

    switch (res.invite_type) {
      case 'register':
        navigateTo(`/register?invite=${inviteCode}`)
        break
      case 'team_change':
        navigateTo(`/login?invite=${inviteCode}`)
        break
      case 'intern':
        navigateTo('/intern')
        break
      default:
        inviteType.value = 'invalid'
        break
    }
  } catch {
    inviteType.value = 'invalid'
  } finally {
    loading.value = false
  }
})
</script>
