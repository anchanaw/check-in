<template>
    <div class="actions">
        <a-button type="primary" block @click="goEditProfile">
            Edit Profile
        </a-button>

        <a-button block class="leave" @click="goRequestLeave">
            Request Leave
        </a-button>

        <a-button danger block @click="handleLogout">
            Logout
        </a-button>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth.store'

defineEmits(['leave', 'logout'])

const router = useRouter()
const authStore = useAuthStore()

const goEditProfile = () => {
    router.push('/intern/edit_profile')
}

const goRequestLeave = () => {
  router.push('/intern/request_leave')
}

const handleLogout = () => {
  authStore.clearAuth()
  router.push('/login')
}
</script>

<style scoped>
.actions {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.leave {
    background: #7a6fd1;
    color: #fff;
}
</style>
