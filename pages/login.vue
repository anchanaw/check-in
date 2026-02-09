<template>
  <!-- โลโก้บนพื้นฟ้า -->
  <div class="logo">
    <img src="/logo.png" alt="A-VALUE" class="logo-img" />
  </div>

  <!-- Card เฉพาะฟอร์ม -->
  <BaseCard maxWidth="320px">
    <a-form :model="formState" layout="vertical" @finish="onSubmit">
      <a-form-item
        label="Username"
        name="username"
        :rules="[{ required: true, message: 'Please enter username' }]"
      >
        <a-input v-model:value="formState.username" />
      </a-form-item>

      <a-form-item
        label="Password"
        name="password"
        :rules="[{ required: true, message: 'Please enter password' }]"
      >
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

    <p class="footer">
      Don’t have an account?
      <NuxtLink to="/register">Register</NuxtLink>
    </p>
  </BaseCard>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRoute, navigateTo } from '#app'
import { useAuthApi } from '~/composables/useAuthApi'

definePageMeta({ layout: 'mobile' })

const route = useRoute()
const { login } = useAuthApi()

const inviteCode = route.query.invite as string | undefined

const formState = reactive({
  username: '',
  password: '',
  remember: false
})

const onSubmit = async (values: {
  username: string
  password: string
}) => {
  try {
    const res = await login({
      username: values.username,
      password: values.password,
      ...(inviteCode && { invite_code: inviteCode })
    })

    // 🚦 redirect ตาม role (auth ถูก set แล้วใน useAuthApi)
    switch (res.user.role) {
      case 'intern':
        return navigateTo('/intern')
      case 'manager':
        return navigateTo('/manager')
      default:
        return navigateTo('/login')
    }
  } catch (err) {
    alert('Username or password incorrect')
  }
    console.log('LOGIN CLICKED', values)
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
