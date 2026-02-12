<template>
  <!-- โลโก้บนพื้นฟ้า -->
  <div class="logo">
    <img src="/logo.png" alt="A-VALUE" class="logo-img" />
  </div>

  <!-- Card เฉพาะฟอร์ม -->
  <BaseCard maxWidth="320px">
    <a-form :model="formState" layout="vertical" @finish="onSubmit">
      <a-form-item label="Email" name="identifier" :rules="[{ required: true, message: 'Please enter email' }]">
        <a-input v-model:value="formState.identifier" />
      </a-form-item>

      <a-form-item label="Password" name="password" :rules="[{ required: true, message: 'Please enter password' }]">
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
        <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit" block>
          Sign In
        </a-button>
      </a-form-item>
    </a-form>

  </BaseCard>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRoute, navigateTo } from '#app'
import { useAuthApi } from '~/composables/useAuthApi'
import { useAuthStore } from '~/stores/auth.store'
import type { UserRole } from '~/types/auth'

definePageMeta({ layout: 'mobile' })

const route = useRoute()
const { loginManager } = useAuthApi() // 👈 ใช้ manager endpoint
const authStore = useAuthStore()

const inviteCode = route.query.invite as string | undefined

const formState = reactive({
  identifier: '',
  password: '',
  remember: false
})

const onSubmit = async (values: {
  identifier: string
  password: string
}) => {
  try {
    const identifier = values.identifier.trim()

    // 🔐 1️⃣ ยิง manager endpoint
    const res = await loginManager({
      email: identifier,
      password: values.password
    })

    const tokens = res.data as unknown as {
      access_token: string
      refresh_token: string
    }

    if (!tokens?.access_token) {
      alert('Invalid login response')
      return
    }

    // 🔥 2️⃣ hard code role
    const role: UserRole = 'manager'

    // 🔐 3️⃣ set auth
    authStore.setAuth({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      role
    })

    // 🔐 4️⃣ redirect
    return navigateTo('/manager')

  } catch (err: any) {
    console.error(err)
    alert(err?.data?.message || 'login error')
  }
}
</script>


<style scoped>
.logo {
  display: flex;
  justify-content: center;
  margin-top: 113px;
  margin-bottom: 90px;
}

.logo-img {
  height: 48px;
  max-width: auto;
  object-fit: contain;
}

.footer {
  text-align: center;
  font-size: 14px;
  margin-top: 16px;
}

.footer a {
  color: #6CBCFA;
  text-decoration: underline;
}
</style>
