<template>
    <div class="edit-profile-page">
        <!-- Header -->
        <div class="top-header">
            <a-button type="text" shape="circle" @click="goBack">
                <ArrowLeftOutlined />
            </a-button>
            <span class="header-title">Edit Profile</span>
        </div>

        <div class="wrapper">
            <BaseCard>
                <EditProfileHeader :user="user" :avatar="form.avatarPreview" @updateAvatar="onAvatarChange" />
                <EditProfileForm :formData="form" @save="onSave" @cancel="onCancel" />
            </BaseCard>
        </div>

    </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { ArrowLeftOutlined } from '@ant-design/icons-vue'

import BaseCard from '@/components/BaseCard.vue'
import EditProfileHeader from '~/components/profile/EditProfileHeader.vue'
import EditProfileForm from '~/components/profile/EditProfileForm.vue'
import BottomBar from '@/components/BottomBar.vue'

/**
 * TODO:
 * - GET /me
 * - PUT /me
 */
const user = reactive({
    name: 'Sompong',
    role: 'Intern · Team Frontend Development'
})

const form = reactive({
    avatar: null,
    avatarPreview: null,
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    university: '',
    studentId: ''
})
const onAvatarChange = (file) => {
    form.avatar = file
    form.avatarPreview = URL.createObjectURL(file)
}
onMounted(() => {
    // 🔹 mock data (แทน API)
    form.username = 'sompong.dev'
    form.email = 'sompong@email.com'
    form.firstName = 'Sompong'
    form.lastName = 'Jaidee'
    form.gender = 'Male'
    form.dob = '2000-01-01'
    form.university = 'ABC University'
    form.studentId = '64123456'
})

const goBack = () => {
    history.back()
}

const onSave = (payload) => {
    console.log('save profile:', payload)
    /**
     * TODO:
     * PUT /me
     * body: payload
     */
}

const onCancel = () => {
    history.back()
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
