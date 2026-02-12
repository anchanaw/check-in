<template>
  <div class="page">

    <!-- Logo -->
    <div class="logo">
  <img src="/public/logo.png" alt="A-VALUE Logo" class="logo-img" />
</div>

    <!-- Card -->
    <BaseCard class="card">

      <a-typography-title :level="4" class="title">
        Welcome to A-VALUE
      </a-typography-title>

      <a-typography-text type="secondary">
        Let’s get you started
      </a-typography-text>

      <div class="actions">
        <a-button
          type="primary"
          block
          size="large"
          @click="goLogin"
        >
          Continue with my account
        </a-button>

        <a-button
          block
          size="large"
          class="register-btn"
          @click="goRegister"
        >
          I’m new here
        </a-button>
      </div>

    </BaseCard>

  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import BaseCard from '@/components/base/BaseCard.vue'

const route = useRoute()
const router = useRouter()

const loading = ref(false)
const token = route.params.token as string

onMounted(async () => {
  loading.value = true
  try {
    console.log('Invite token:', token)

    // 🔜 ต่อ API ตรงนี้
    // await apiFetch('/invite/validate', {
    //   method: 'POST',
    //   body: { token }
    // })

  } finally {
    loading.value = false
  }
})

const goLogin = () => {
  router.push(`/login?invite=${token}`)
}

const goRegister = () => {
  router.push(`/register?invite=${token}`)
}
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: linear-gradient(180deg, #6CBCFA 0%, #6CBCFA 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 120px;
}

.logo {
  margin-bottom: 40px;
  text-align: center;
}

.logo-img {
  width: 250px;   /* ปรับได้ตามความสวย */
  height: auto;
}

.card {
  width: 90%;
  max-width: 360px;
  border-radius: 16px;
  text-align: center;
}

.title {
  margin-bottom: 4px !important;
}

.actions {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.register-btn {
  background: #1fb57a;
  color: #fff;
  border: none;
}

.register-btn:hover {
  background: #18a56e;
}
</style>