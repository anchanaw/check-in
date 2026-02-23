<script setup lang="ts">
import { useRoute } from 'vue-router'
import { navigateTo } from '#app'

const route = useRoute()
const inviteCode = route.query.code as string

const goLogin = () => {
  navigateTo(`/login?code=${inviteCode}`)
}

const goRegister = () => {
  navigateTo(`/register?code=${inviteCode}`)
}
</script>

<template>
  <div class="invite-page">
    <div class="logo">A-VALUE</div>

    <div class="card">
      <h2>Welcome to A-VALUE</h2>
      <p>Let’s get you started</p>

      <button class="btn primary" @click="goLogin">
        Continue with my account
      </button>

      <button class="btn success" @click="goRegister">
        I’m new here
      </button>
    </div>
  </div>
</template>

<style scoped>
.invite-page {
  min-height: 100vh;
  background: #6aa7d6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  color: white;
  font-size: 28px;
  font-weight: 300;
  margin-bottom: 40px;
  letter-spacing: 2px;
}

.card {
  background: #f1f1f1;
  padding: 40px 30px;
  border-radius: 20px;
  width: 320px;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.card h2 {
  margin-bottom: 8px;
}

.card p {
  color: #666;
  margin-bottom: 30px;
}

.btn {
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 10px;
  margin-bottom: 15px;
  font-size: 15px;
  cursor: pointer;
  transition: 0.2s;
}

.primary {
  background: #2d2d2d;
  color: white;
}

.success {
  background: #2eb872;
  color: white;
}

.btn:hover {
  opacity: 0.9;
}
</style>