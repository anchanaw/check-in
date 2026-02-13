<template>
    <header class="register-header">
        <div class="top-bar">
            <div class="title">Create Your Account</div>
        </div>

        <p class="subtitle" v-if="mode === 'invite'">
            Invited by Mentor : {{ mentorDisplayName }}<br />
            From {{ teamToken }}
        </p>

        <p class="subtitle" v-else-if="mode === 'token'">
            Invitation Token Active
        </p>
    </header>

    <BaseCard maxWidth="320px">
        <a-form layout="vertical" @finish="onSubmit">
            <a-form-item label="First Name" name="firstName" :rules="req">
                <a-input placeholder="Value" />
            </a-form-item>

            <a-form-item label="Last Name" name="lastName" :rules="req">
                <a-input placeholder="Value" />
            </a-form-item>

            <a-form-item label="Display Name" name="displayName" :rules="req">
                <a-input placeholder="Value" />
            </a-form-item>

            <a-form-item label="Email" name="email" :rules="[
                { required: true, message: 'Email is required' },
                { type: 'email', message: 'Invalid email' }
            ]">
                <a-input placeholder="Value" />
            </a-form-item>

            <a-form-item label="Password" name="password" :rules="req">
                <a-input-password placeholder="Value" />
            </a-form-item>

            <a-form-item label="Confirm Password" name="confirmPassword" :rules="[
                { required: true, message: 'Confirm password' },
                { validator: validateConfirm }
            ]">
                <a-input-password placeholder="Value" />
            </a-form-item>

            <a-form-item>
                <a-button type="primary" html-type="submit" block :loading="loading">
                    Sign Up
                </a-button>
            </a-form-item>

            <div class="login-link">
                Already have an account?
                <NuxtLink to="/login">Sign In</NuxtLink>
            </div>
        </a-form>
    </BaseCard>
</template>
<script setup lang="ts">
import { useRoute, navigateTo } from '#app'
import { ref } from 'vue'
import { useApi } from '~/composables/core'

definePageMeta({ layout: 'mobile' })

const route = useRoute()
const { apiFetch } = useApi()

// 🔥 รับ invite จาก query เท่านั้น
const inviteCode = route.query.invite as string | undefined
const mentorDisplayName = ref('')
const teamToken = ref('')
const mode = ref<'invite' | 'token' | null>(null)

if (!inviteCode) {
  navigateTo('/login')
}

const loading = ref(false)

// validation
const req = [{ required: true, message: 'Required' }]

const validateConfirm = ({ getFieldValue }: { getFieldValue: (name: string) => any }) => ({
  validator(_: any, value: any) {
    if (!value || value === getFieldValue('password')) {
      return Promise.resolve()
    }
    return Promise.reject('Passwords do not match')
  }
})

const onSubmit = async (values: any) => {
  loading.value = true

  try {
    await apiFetch('/auth/register', {
      method: 'POST',
      body: {
        inviteCode,                 // 🔥 สำคัญมาก
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName
      }
    })

    // สมัครเสร็จ → ไป login
    navigateTo('/login')

  } catch (err: any) {
    alert(err?.data?.message || 'Register failed')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-header {
    width: 100%;
    background: #6CBCFA;
    padding-bottom: 16px;
}

/* top bar */
.top-bar {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.title {
    font-size: 18px;
    font-weight: 600;
}

/* subtitle */
.subtitle {
    margin: 4px 16px 0;
    text-align: center;
    font-size: 14px;
    line-height: 1.4;
}

.login-link {
    margin-top: 16px;
    text-align: center;
    font-size: 14px;
}

.login-link a {
    color: #6CBCFA;
    text-decoration: underline;
}
</style>
