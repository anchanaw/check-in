<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth.store'

const auth = useAuthStore()

onMounted(() => {
  auth.initAuth()
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.app-layout {
  min-height: 100dvh;
  background: #6CBCFA;
}

/* 🔥 ตัวนี้คือหัวใจ */
.app-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;      /* ⬅️ ทุกอย่างอยู่กลาง */
  padding-bottom: 0;     
}
</style>
