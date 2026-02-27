<template>
    <div class="edit-profile-page">
        <!-- Header -->
        <div class="top-header">
            <BackButton />
            <span class="header-title">Edit Profile</span>
        </div>

        <div class="wrapper">
            <BaseCard>
                <EditProfileHeader :user="user" :avatar="form.avatarPreview" @updateAvatar="onAvatarChange" />
                <EditProfileForm :formData="form" @save="onSave" @cancel="onCancel"
                    @changePassword="onChangePassword" />
            </BaseCard>
        </div>
    </div>
</template>


<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from '~/composables/core'
import { useAuthStore } from '~/stores/auth.store'
import { message } from 'ant-design-vue'

import BaseCard from '~/components/base/BaseCard.vue'
import EditProfileHeader from '~/components/intern/profile/EditProfileHeader.vue'
import EditProfileForm from '~/components/intern/profile/EditProfileForm.vue'
import BackButton from '~/components/base/BackButton.vue'

const { apiFetch } = useApi()
const router = useRouter()
const auth = useAuthStore()

const user = reactive({
    name: '',
    role: 'Intern'
})

const form = reactive({
    avatar: null as File | null,
    avatarPreview: null as string | null,
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    university: '',
    studentId: ''
})
const initialForm = reactive({
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    university: '',
    studentId: ''
})

interface MeResponse {
    success: boolean
    data: {
        id: string
        email: string
        role: string
        firstName: string
        lastName: string
        gender?: string | null
        dateOfBirth?: string | null
        profileImageUrl?: string | null
        studentId?: string | null
        university?: string | null
    } | null
}

onMounted(async () => {
    try {
        if (!auth.access_token) return

        const res = await apiFetch < MeResponse > ('/auth/me')

        // 🔥 กัน null ตรงนี้ (ป้องกัน 500)
        if (!res?.data) {
            message.error('Failed to load profile')
            return
        }

        const data = res.data

        user.name = `${data.firstName} ${data.lastName}`

        form.email = data.email
        form.firstName = data.firstName
        form.lastName = data.lastName
        form.gender = data.gender ?? ''
        form.university = data.university ?? ''
        form.studentId = data.studentId ?? ''

        if (data.dateOfBirth) {
            const iso = new Date(data.dateOfBirth).toISOString()
            form.dob = iso.split('T')[0] || ''
        } else {
            form.dob = ''
        }

        initialForm.firstName = form.firstName
        initialForm.lastName = form.lastName
        initialForm.gender = form.gender
        initialForm.dob = form.dob
        initialForm.university = form.university
        initialForm.studentId = form.studentId

        // โหลดรูป
        try {
            const imgRes = await apiFetch < any > ('/auth/profile/image-signed-url')
            form.avatarPreview =
                imgRes?.data?.signedUrl ||
                imgRes?.data?.url ||
                data.profileImageUrl ||
                null
        } catch {
            form.avatarPreview = null
        }

    } catch (err) {
        console.error('Edit profile load error:', err)
    }
})

/* ------------------ AVATAR CHANGE ------------------ */
const onAvatarChange = (file: File) => {
    form.avatar = file
    form.avatarPreview = URL.createObjectURL(file)
}

/* ------------------ SAVE ------------------ */
const onSave = async (payload: any) => {
    try {
        const hasAvatarChange = !!form.avatar
        const body: Record<string, any> = {}

        if ((payload.firstName ?? '') !== initialForm.firstName) {
            body.firstName = payload.firstName ?? ''
        }
        if ((payload.lastName ?? '') !== initialForm.lastName) {
            body.lastName = payload.lastName ?? ''
        }
        if ((payload.gender || '') !== initialForm.gender) {
            body.gender = payload.gender || null
        }
        if ((payload.university ?? '') !== initialForm.university) {
            body.university = payload.university ?? ''
        }
        if ((payload.studentId ?? '') !== initialForm.studentId) {
            body.studentId = payload.studentId ?? ''
        }
        if ((payload.dob || '') !== initialForm.dob) {
            body.dateOfBirth = payload.dob
                ? new Date(payload.dob).toISOString()
                : null
        }

        if (Object.keys(body).length === 0 && !hasAvatarChange) {
            message.info('No changes to save')
            return
        }

        if (Object.keys(body).length > 0) {
            await apiFetch('/auth/profile', {
                method: 'PATCH',
                body
            })

            initialForm.firstName = payload.firstName ?? ''
            initialForm.lastName = payload.lastName ?? ''
            initialForm.gender = payload.gender || ''
            initialForm.dob = payload.dob || ''
            initialForm.university = payload.university ?? ''
            initialForm.studentId = payload.studentId ?? ''
        }

        // upload avatar
        if (form.avatar) {
            const formData = new FormData()
            formData.append('file', form.avatar)

            await apiFetch('/auth/profile/image', {
                method: 'POST',
                body: formData
            })
            form.avatar = null
        }

        message.success('Profile updated successfully')

        // 🔥 แก้ path ให้ถูก (intern)
        router.push('/intern/profile')

    } catch (err) {
        console.error('Update profile error:', err)
        message.error('Failed to update profile')
    }
}

const onCancel = () => router.back()

const onChangePassword = () => {
    // 🔥 แก้ path
    router.push('/intern/profile/change_password')
}
</script>

<style scoped>
.edit-profile-page {
    background-color: #6ec1ff;
    min-height: 100vh;
    padding-bottom: 72px;
}

.top-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px;
}

.header-title {
    font-weight: 600;
}

.wrapper {
    display: flex;
    justify-content: center;
    padding: 0 12px;
}

.wrapper :deep(.base-card) {
    width: 100%;
    max-width: 360px;
}
</style>
