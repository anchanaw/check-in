<template>
  <SuccessState
    title="Successful!"
    buttonText="Continue to Login"
    @action="goLogin"
  />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

definePageMeta({ layout: 'mobile' })

const router = useRouter()

// ใช้ username ตาม data dic
const registeredUsername =
  sessionStorage.getItem('registered_username')

// กันเข้าหน้านี้มั่ว
if (!registeredUsername) {
  router.replace('/register')
}

const goLogin = () => {
  router.push('/login')
}
</script>
