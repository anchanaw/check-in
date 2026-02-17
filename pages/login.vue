<template>
  <div class="login-page">
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
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { navigateTo } from '#app'
import { useApi } from '~/composables/core'
import { useAuthStore } from '~/stores/auth.store'
import form from 'ant-design-vue/es/form'

const { apiFetch } = useApi()
const authStore = useAuthStore()

const formState = reactive({
  identifier: '',
  password: '',
  remember: false
})

const onSubmit = async () => {
  try {
    const res: any = await apiFetch('/auth/login', {
      method: 'POST',
      body: {
        email: formState.identifier.trim(),
        password: formState.password
      }
    })

    // 🔥 ใช้ค่าจาก response โดยตรง
    const token = res.data.token
    const role = res.data.user.role.toLowerCase()

    // set auth ก่อน
    authStore.setAuth(token, role, formState.remember)

    // redirect
    if (role === 'manager') return navigateTo('/manager')
    if (role === 'mentor') return navigateTo('/mentor')
    if (role === 'intern') return navigateTo('/intern')

  } catch (err: any) {
    alert(err?.data?.message || 'Login failed')
  }
}

</script>

<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;
  min-height: 100vh;
  background-color: #6CBCFA;
}

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
