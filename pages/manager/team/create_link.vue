<template>
  <div class="create-link-page">
    <!-- Header -->
    <div class="top-header">
      <BackButton class="back-btn" />
      <span class="title">Create Link</span>
    </div>

    <div class="content">
      <LinkFormCard :teams="teams" :mentors="mentors" :interns="interns" :loading="loading" @submit="onSubmit" />
    </div>

    <ManagerBottomBar />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ManagerBottomBar from '@/components/manager/ManagerBottomBar.vue'
import LinkFormCard from '@/components/manager/createlink/LinkFormCard.vue'
import BackButton from '@/components/base/BackButton.vue'

/* ===== types ===== */
interface Team {
  id: number
  name: string
}

interface Mentor {
  id: number
  name: string
}

interface Intern {
  id: number
  name: string
}

/* ===== state ===== */
const loading = ref(false)
const teams = ref<Team[]>([])
const mentors = ref<Mentor[]>([])
const interns = ref<Intern[]>([])

/* ===== helper ===== */
const generateCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
}

/* ===== GET init data ===== */
onMounted(async () => {
  try {
    loading.value = true

    const token = localStorage.getItem('token')

    const res: any = await $fetch('/manager/create-link/init', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    teams.value = res.teams
    mentors.value = res.mentors
    interns.value = res.interns

  } catch (err) {
    console.error('Init load error:', err)
  } finally {
    loading.value = false
  }
})

/* ===== SUBMIT ===== */
const onSubmit = async (payload: {
  team_id: number
  mentor_id: number
  intern_ids: number[]
  link_name?: string | null
  max_uses?: number | null
  expired_at?: string | null
}) => {
  try {
    loading.value = true

    const token = localStorage.getItem('token')

    // ✅ ใช้ team_id ที่เลือกมาเลย
    const inviteRes = await $fetch('/auth/invites', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: {
        code: generateCode(),
        role: 'intern',
        type: 'registration',
        maxUses: payload.max_uses || 1,
        teamId: payload.team_id
      }
    })

    console.log('Invite created:', inviteRes)

    alert('สร้างลิงก์สำเร็จ 🎉')

  } catch (err: any) {
    console.error('Create link error:', err)

    if (err?.data?.message) {
      alert(err.data.message)
    } else {
      alert('เกิดข้อผิดพลาด')
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.create-link-page {
  background: #74c3ff;
  min-height: 100vh;
  padding-bottom: 90px;
}

.top-header {
  position: relative;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.back-btn {
  position: absolute;
  left: 12px;
}

.title {
  font-size: 24px;
  font-weight: 600;
}

.content {
  display: flex;
  justify-content: center;
  padding: 12px;
}
</style>
