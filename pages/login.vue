<template>
  <!-- โลโก้บนพื้นฟ้า -->
  <div class="logo">
    <img src="/logo.png" alt="A-VALUE" class="logo-img" />
  </div>

  <!-- Card เฉพาะฟอร์ม -->
  <BaseCard maxWidth="320px">
    <a-form layout="vertical" @finish="onSubmit">
      <a-form-item
        label="Username"
        name="username"
        :rules="[{ required: true, message: 'Please enter username' }]"
      >
        <a-input />
      </a-form-item>

      <a-form-item
        label="Password"
        name="password"
        :rules="[{ required: true, message: 'Please enter password' }]"
      >
        <a-input-password />
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit" block>
          Sign In
        </a-button>
      </a-form-item>
    </a-form>

    <p class="footer">
      Don’t have an account?
      <NuxtLink to="/register">Register</NuxtLink>
    </p>
  </BaseCard>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { useAuthApi } from '~/composables/useAuthApi'
import { useAuthStore } from '~/stores/auth.store'
import { useUserStore } from '~/stores/user.store'

definePageMeta({ layout: 'mobile' })

const router = useRouter()
const route = useRoute()

const { login } = useAuthApi()
const authStore = useAuthStore()
const userStore = useUserStore()

const inviteCode = route.query.invite as string | undefined

const onSubmit = async (values: any) => {
  try {
    const res: any = await login({
      username: values.username,
      password: values.password,
      ...(inviteCode && { invite_code: inviteCode }) // (optional) เฉพาะ intern flow
    })

    // 1️⃣ เก็บ token
    authStore.setTokens({
      access_token: res.access_token,
      refresh_token: res.refresh_token
    })

    // 2️⃣ เก็บ user (display only)
    userStore.setUser({
      username: res.user.username,
      display_name: res.user.display_name
    })

    // 3️⃣ redirect ตาม role
    switch (res.user.role) {
      case 'intern':
        router.push('/intern')
        break
      case 'mentor':
        router.push('/mentor')
        break
      case 'manager':
        router.push('/manager')
        break
      default:
        router.push('/login')
    }
  } catch (err) {
    alert('Username or password incorrect')
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
