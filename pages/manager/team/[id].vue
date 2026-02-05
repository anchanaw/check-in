<template>
  <div class="team-detail-page">
    <!-- Header -->
    <div class="top-header">
      <BackButton class="back-btn" />
      <span class="title">Team Detail</span>
    </div>

    <div class="content">
      <TeamInfoCard :team="team" />

      <InviteLinkCard
        :invite="invite"
        @disable="onDisableLink"
        @copy="onCopy"
      />

      <BaseCard class="table-card">
        <InternTable
          :interns="interns"
          :loading="loading"
        />
      </BaseCard>
    </div>

    <ManagerBottomBar />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

import BaseCard from '@/components/base/BaseCard.vue'
import BackButton from '@/components/base/BackButton.vue'
import ManagerBottomBar from '@/components/manager/ManagerBottomBar.vue'

import TeamInfoCard from '@/components/manager/team/TeamInfoCard.vue'
import InviteLinkCard from '@/components/manager/team/InviteLinkCard.vue'
import InternTable from '@/components/manager/team/InternTable.vue'

const route = useRoute()
const teamId = route.params.id

const loading = ref(true)

/* ===== mock state (ตรง API) ===== */
const team = ref({
  name: '',
  mentor: '',
  status: 'active'
})

const invite = ref({
  url: '',
  maxUses: 0,
  expiresAt: '',
  used: 0,
  status: 'active'
})

const interns = ref<any[]>([])

onMounted(async () => {
  await new Promise(r => setTimeout(r, 700))

  /**
   * TODO: GET /manager/team/:id
   */
  team.value = {
    name: 'Frontend Development',
    mentor: 'Sommai',
    status: 'active'
  }

  invite.value = {
    url: 'https://your.link/xxxx',
    maxUses: 10,
    expiresAt: '2026-01-01',
    used: 3,
    status: 'active'
  }

  interns.value = [
    { name: 'Sompong', score: 250, status: 'active' },
    { name: 'Anon', score: 180, status: 'active' },
    { name: 'Amorn', score: 90, status: 'inactive' }
  ]

  loading.value = false
})

/* ===== actions ===== */
const onCopy = () => {
  navigator.clipboard.writeText(invite.value.url)
}

const onDisableLink = () => {
  console.log('PATCH /invite/disable')
}
</script>

<style scoped>
.team-detail-page {
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
  font-size: 16px;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
}

.content > * {
  width: 100%;
  max-width: 360px;
  margin-bottom: 12px;
}

.table-card {
  padding: 0;
}
</style>
