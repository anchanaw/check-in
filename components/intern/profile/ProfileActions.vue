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
import { Modal } from 'ant-design-vue'
import { useAuthStore } from '~/stores/auth.store'

const emit = defineEmits(['leave', 'logout'])

const router = useRouter()
const authStore = useAuthStore()

const goEditProfile = () => {
    router.push('/intern/profile/edit')
}

const goRequestLeave = () => {
  router.push('/intern/profile/request_leave')
}

const handleLogout = () => {
  Modal.confirm({
    title: 'Are you sure you want to logout?',
    onOk() {
      authStore.clearAuth()
      emit('logout')
      router.replace('/login')
    }
  })
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
