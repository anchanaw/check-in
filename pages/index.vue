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

onMounted(async () => {
  const inviteCode = route.query.invite as string

  // 1. ไม่มี invite → ถือว่า invalid
  if (!inviteCode) {
    inviteType.value = 'invalid'
    loading.value = false
    return
  }

  try {
    // 2. เรียก API ตรวจ invite
    const res = await $fetch<{ valid: boolean; invite_type: InviteType }>(`/api/invites/${inviteCode}`)

    if (!res.valid) {
      inviteType.value = 'invalid'
      loading.value = false
      return
    }

    inviteType.value = res.invite_type

    // 3. route ตาม invite_type
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
    }
  } catch (err) {
    inviteType.value = 'invalid'
  } finally {
    loading.value = false
  }
})
</script>

