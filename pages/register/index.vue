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

            <a-form-item label="Gender" name="gender">
                <a-select placeholder="Select">
                    <a-select-option value="male">Male</a-select-option>
                    <a-select-option value="female">Female</a-select-option>
                    <a-select-option value="other">Other</a-select-option>
                </a-select>
            </a-form-item>

            <a-form-item label="Date of Birth" name="dob">
                <a-date-picker class="full-width" placeholder="Select date" />
            </a-form-item>

            <a-form-item label="University" name="university">
                <a-input placeholder="Value" />
            </a-form-item>

            <a-form-item label="Student ID" name="studentId">
                <a-input placeholder="Value" />
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
import { ref, onMounted, computed } from 'vue'
import { useInviteApi } from '~/composables/useInviteApi'
import { useAuthApi } from '~/composables/useAuthApi'

definePageMeta({ layout: 'mobile' })

const route = useRoute()
const { validate } = useInviteApi()
const { register } = useAuthApi()

// query params
const token = ref<string | null>(null)
const invite = ref<string | null>(null)

// display (invite only)
const mentorDisplayName = ref('')
const teamToken = ref('')

// detect mode
const mode = computed<'token' | 'invite' | 'invalid'>(() => {
  if (token.value) return 'token'
  if (invite.value) return 'invite'
  return 'invalid'
})

onMounted(async () => {
  token.value = route.query.token as string || null
  invite.value = route.query.invite as string || null

  if (mode.value === 'invalid') {
    navigateTo('/login')
    return
  }

  // invite flow → validate
  if (mode.value === 'invite') {
    try {
      const res: any = await validate(invite.value!)

      if (!res.valid) {
        navigateTo('/login')
        return
      }

      mentorDisplayName.value = res.mentor?.display_name ?? ''
      teamToken.value = res.team?.token ?? ''
    } catch {
      navigateTo('/login')
    }
  }
})

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

const loading = ref(false)

const onSubmit = async (values: any) => {
  loading.value = true

  try {
    const payload: any = {
      email: values.email,
      username: values.email,
      password: values.password,
      first_name: values.firstName,
      last_name: values.lastName,
      display_name: values.displayName,
      gender: values.gender,
      birth_date: values.dob
        ? values.dob.format('YYYY-MM-DD')
        : null,
      university: values.university,
      student_id: values.studentId
    }

    // attach token / invite
    if (mode.value === 'token') {
      payload.token = token.value
    }

    if (mode.value === 'invite') {
      payload.invite_code = invite.value
    }

    await register(payload)

    navigateTo('/register/success')
  } catch (err) {
    alert('สมัครไม่สำเร็จ หรือ invite / token ไม่ถูกต้อง')
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
