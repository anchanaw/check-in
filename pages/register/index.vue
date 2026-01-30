<template>
    <header class="register-header">
        <!-- top bar -->
        <div class="top-bar">
            <div class="title">Create Your Account</div>
        </div>

        <p class="subtitle">
            Invited by Mentor : {{ mentorDisplayName }}<br />
            From {{ teamToken }}
        </p>
    </header>

    <!-- Form Card -->
    <BaseCard maxWidth="320px">
        <a-form layout="vertical" @finish="onSubmit">
            <!-- First / Last Name -->
            <a-form-item label="First Name" name="firstName" :rules="req">
                <a-input placeholder="Value" />
            </a-form-item>

            <a-form-item label="Last Name" name="lastName" :rules="req">
                <a-input placeholder="Value" />
            </a-form-item>

            <!-- Display Name -->
            <a-form-item label="Display Name" name="displayName" :rules="req">
                <a-input placeholder="Value" />
            </a-form-item>

            <!-- Email -->
            <a-form-item label="Email" name="email" :rules="[
                { required: true, message: 'Email is required' },
                { type: 'email', message: 'Invalid email' }
            ]">
                <a-input placeholder="Value" />
            </a-form-item>

            <!-- Password -->
            <a-form-item label="Password" name="password" :rules="req">
                <a-input-password placeholder="Value" />
            </a-form-item>

            <a-form-item label="Confirm Password" name="confirmPassword" :rules="[
                { required: true, message: 'Confirm password' },
                { validator: validateConfirm }
            ]">
                <a-input-password placeholder="Value" />
            </a-form-item>

            <!-- Gender -->
            <a-form-item label="Gender" name="gender">
                <a-select placeholder="Select">
                    <a-select-option value="male">Male</a-select-option>
                    <a-select-option value="female">Female</a-select-option>
                    <a-select-option value="other">Other</a-select-option>
                </a-select>
            </a-form-item>

            <!-- Date of Birth -->
            <a-form-item label="Date of Birth" name="dob">
                <a-date-picker class="full-width" placeholder="Select date" />
            </a-form-item>

            <!-- University -->
            <a-form-item label="University" name="university">
                <a-input placeholder="Value" />
            </a-form-item>

            <!-- Student ID -->
            <a-form-item label="Student ID" name="studentId">
                <a-input placeholder="Value" />
            </a-form-item>

            <!-- Submit -->
            <a-form-item>
                <a-button type="primary" html-type="submit" block>
                    Sign Up
                </a-button>
            </a-form-item>
            <div class="login-link">Already have an account?
                <NuxtLink to="/login">Sign In</NuxtLink>
            </div>
        </a-form>
    </BaseCard>
</template>

<script setup lang="ts">
import { useRoute, navigateTo } from '#app'
import { ref, onMounted } from 'vue'
import { useInviteApi } from '~/composables/useInviteApi'

const { validate } = useInviteApi()

definePageMeta({ layout: 'mobile' })

// 1️⃣ รับ invite จาก URL
const route = useRoute()
const inviteCode = ref<string | null>(null)

// ใช้แสดงใน subtitle (display only)
const mentorDisplayName = ref<string>('') // users.display_name
const teamToken = ref<string>('')          // team.token

onMounted(async () => {
    inviteCode.value = route.query.invite as string

    // กันเข้าหน้านี้ตรง ๆ
    if (!inviteCode.value) {
        navigateTo('/')
        return
    }

    try {
        const res: any = await $fetch(`/api/invites/${inviteCode.value}`)

        if (!res.valid) {
            navigateTo('/')
            return
        }

        // ✅ map ตาม Data Dictionary
        mentorDisplayName.value = res.mentor?.display_name ?? ''
        teamToken.value = res.team?.token ?? ''
    } catch (e) {
        navigateTo('/')
    }
})

// 2️⃣ validation rules
const req = [{ required: true, message: 'Required' }]

const validateConfirm = ({ getFieldValue }: { getFieldValue: (name: string) => any }) => ({
    validator(_: any, value: any) {
        if (!value || value === getFieldValue('password')) {
            return Promise.resolve()
        }
        return Promise.reject('Passwords do not match')
    }
})

// 3️⃣ submit → เรียก API
const loading = ref(false)

const onSubmit = async (values: any) => {
    loading.value = true

    try {
        await $fetch('/api/auth/register', {
            method: 'POST',
            body: {
                invite_code: inviteCode.value,

                // required
                email: values.email,
                password: values.password,
                first_name: values.firstName,
                last_name: values.lastName,

                // optional (ตรง data dic)
                display_name: values.displayName,
                gender: values.gender,
                birth_date: values.dob
                    ? values.dob.format('YYYY-MM-DD')
                    : null,
                university: values.university,
                student_id: values.studentId
            }
        })

        navigateTo('/register/success')
    } catch (err) {
        alert('สมัครไม่สำเร็จ หรือ invite หมดอายุ')
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
