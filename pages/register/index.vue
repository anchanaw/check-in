<template>
    <header class="register-header">
        <div class="top-bar">
            <div class="title">Create Your Account</div>
        </div>

        <p class="subtitle">
            You're registering via invitation
        </p>
    </header>

    <BaseCard maxWidth="320px">
        <a-form layout="vertical" :model="formState" :rules="rules" @finish="onSubmit">

            <a-form-item label="First Name" name="firstName">
                <a-input v-model:value="formState.firstName" />
            </a-form-item>

            <a-form-item label="Last Name" name="lastName">
                <a-input v-model:value="formState.lastName" />
            </a-form-item>

            <a-form-item label="Email" name="email">
                <a-input v-model:value="formState.email" />
            </a-form-item>

            <a-form-item label="Password" name="password">
                <a-input-password v-model:value="formState.password" />
            </a-form-item>

            <a-form-item label="Confirm Password" name="confirmPassword">
                <a-input-password v-model:value="formState.confirmPassword" />
            </a-form-item>

            <!-- optional -->
            <a-form-item label="Gender" name="gender">
                <a-select v-model:value="formState.gender">
                    <a-select-option value="male">Male</a-select-option>
                    <a-select-option value="female">Female</a-select-option>
                </a-select>
            </a-form-item>

            <a-form-item label="Date of Birth" name="dateOfBirth">
                <a-date-picker v-model:value="formState.dateOfBirth" style="width:100%" />
            </a-form-item>

            <a-form-item v-if="showInternFields" label="Student ID" name="studentId">
                <a-input v-model:value="formState.studentId" />
            </a-form-item>

            <a-form-item v-if="showInternFields" label="University" name="university">
                <a-input v-model:value="formState.university" />
            </a-form-item>

            <a-form-item>
                <a-button type="primary" html-type="submit" block :loading="loading">
                    Sign Up
                </a-button>
            </a-form-item>

        </a-form>
    </BaseCard>
</template>

<script setup lang="ts">
import { useRoute, navigateTo } from '#app'
import { ref, computed, watch } from 'vue'
import { useApi } from '~/composables/core'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'

definePageMeta({ layout: 'mobile' })

const route = useRoute()
const { apiFetch } = useApi()

const inviteCode = route.query.code as string | undefined
if (!inviteCode) {
    navigateTo('/invite')
}

const loading = ref(false)
const role = ref<'intern' | 'mentor' | null>(null)
const showInternFields = computed(() => role.value !== 'mentor')

const roleFromQuery = route.query.role
if (roleFromQuery === 'intern' || roleFromQuery === 'mentor') {
    role.value = roleFromQuery
}

// Fallback: infer role from invite code pattern when role query is not provided.
if (!role.value && typeof inviteCode === 'string') {
    const normalizedCode = inviteCode.toUpperCase()
    if (normalizedCode.startsWith('MENTOR-')) {
        role.value = 'mentor'
    } else if (normalizedCode.startsWith('INTERN-')) {
        role.value = 'intern'
    }
}

watch(role, (next) => {
    if (next === 'mentor') {
        formState.value.studentId = ''
        formState.value.university = ''
    }
})

// form model
const formState = ref({
    firstName: '',
    lastName: '',
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    dateOfBirth: null as Date | null,
    studentId: '',
    university: ''
})

const rules = computed(() => ({
    firstName: [
        { required: true, message: 'First name is required' }
    ],
    lastName: [
        { required: true, message: 'Last name is required' }
    ],
    email: [
        { required: true, message: 'Email is required' },
        { type: 'email', message: 'Invalid email' }
    ],
    password: [
        { required: true, message: 'Password is required' },
        { min: 6, message: 'Minimum 6 characters' }
    ],
    confirmPassword: [
        { required: true, message: 'Confirm password' },
        {
            validator: async (_: any, value: string) => {
                if (!value) return Promise.reject('Confirm password')
                if (value !== formState.value.password)
                    return Promise.reject('Passwords do not match')
                return Promise.resolve()
            }
        }
    ],
    gender: [
        { required: true, message: 'Gender is required' }
    ],
    dateOfBirth: [
        { required: true, message: 'Date of birth is required' }
    ],
    studentId:
        role.value === 'intern'
            ? [{ required: true, message: 'Student ID required' }]
            : [],
    university:
        role.value === 'intern'
            ? [{ required: true, message: 'University required' }]
            : []
}))
const disabledDate = (current: Dayjs) => {
    return current && current > dayjs().endOf('day')
}
const onSubmit = async () => {
    loading.value = true

    try {
        await apiFetch('/auth/register', {
            method: 'POST',
            body: {
                inviteCode,
                email: formState.value.email,
                password: formState.value.password,
                firstName: formState.value.firstName,
                lastName: formState.value.lastName,
                gender: formState.value.gender || null,
                dateOfBirth: formState.value.dateOfBirth
                    ? formState.value.dateOfBirth.toISOString()
                    : null,
                studentId: formState.value.studentId || null,
                university: formState.value.university || null
            }
        })
        console.log('Sending inviteCode:', inviteCode)
        navigateTo(`/login?code=${inviteCode}`)
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
