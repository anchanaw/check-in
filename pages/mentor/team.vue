<template>
  <a-layout class="page">
    <div class="center-wrapper">
      <div class="content">
        <a-typography-title :level="4" class="header-title">
          Intern under my supervision
        </a-typography-title>

        <div class="main-section">
          <!-- Filter -->
          <InternFilter :teams="teams" v-model="selectedTeam" />

          <!-- List -->
          <InternList :loading="loading" :interns="filteredInterns" @select="goToInternDetail" />
        </div>
      </div>
    </div>

    <MentorBottomBar />
  </a-layout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import InternFilter from '@/components/mentor/myintern/InternFilter.vue'
import InternList from '@/components/mentor/myintern/InternList.vue'
import MentorBottomBar from '@/components/mentor/MentorBottomBar.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const goToInternDetail = (intern) => {
  router.push(`/mentor/intern/${intern.id}`)
}

/* mock */
const loading = ref(true)
const selectedTeam = ref(null)

const teams = ref([
  { label: 'Team A', value: 'A' },
  { label: 'Team B', value: 'B' }
])

const interns = ref([])

onMounted(async () => {
  loading.value = true
  await new Promise(r => setTimeout(r, 700))

  interns.value = [
    { id: 1, name: 'Sompong', team: 'A', status: 'checked-in', time: '09.00 AM', order: '#1' },
    { id: 2, name: 'Anon', team: 'A', status: 'not-checked', order: '#3' },
    { id: 3, name: 'Somchai', team: 'B', status: 'leave-pending', order: '#2' },
    { id: 4, name: 'Somying', team: 'B', status: 'on-leave' }
  ]

  loading.value = false
})

const filteredInterns = computed(() => {
  if (!selectedTeam.value) return interns.value
  return interns.value.filter(i => i.team === selectedTeam.value)
})
</script>

<style scoped>
.page {
  min-height: 100vh;
  padding: 16px 16px 80px;
  background: #6ec1ff;
}

.main-section {
  display: flex;
  flex-direction: column;
  gap: 14px;   /* 👈 ระยะที่ต้องการ */
}

/* ครอบเพื่อจัดกึ่งกลาง */
.center-wrapper {
  display: flex;
  justify-content: center;
}

/* กล่องเนื้อหาหลัก */
.content {
  width: 100%;
  max-width: 360px;
  /* คุมให้เหมือนมือถือ */
}

.header-title {
  font-size: 24px;
  margin-top: 0;
  font-weight: 600;
  margin-bottom: 14px;
  text-align: center;
}
</style>
