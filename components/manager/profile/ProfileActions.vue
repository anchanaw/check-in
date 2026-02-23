<template>
  <div class="actions">
    <a-button type="primary" block @click="goEditProfile">
      Edit Profile
    </a-button>

    <a-button block   class="company-btn" @click="goCompanySetting">
      Company Settings
    </a-button>

    <a-button danger block @click="$emit('logout')">
      Logout
    </a-button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

defineEmits(['logout'])

const router = useRouter()

const goEditProfile = () => {
  router.push('/manager/profile/edit')
}

const goCompanySetting = () => {
  router.push('/manager/profile/company_setting')
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
