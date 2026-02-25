<template>
  <div class="actions">
    <a-button type="primary" block @click="goEditProfile">
      Edit Profile
    </a-button>

    <a-button block   class="company-btn" @click="goCompanySetting">
      Company Settings
    </a-button>

    <a-button danger block @click="logout">
      Logout
    </a-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Modal } from 'ant-design-vue'
import { useAuthStore } from '@/stores/auth.store'

const emit = defineEmits<{                           
  (e: 'logout'): void
}>()

const router = useRouter()
const authStore = useAuthStore()  

const goEditProfile = () => {
  router.push('/manager/profile/edit')
}

const goCompanySetting = () => {
  router.push('/manager/profile/company_setting')
}
const logout = () => {
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

.company-btn {
  background: #6b4eff;
  border: none;
  color: #fff;
  font-weight: 500;
  transition: 0.3s ease;
}

.company-btn:hover {
  background: #5a3fe0;
}

</style>
