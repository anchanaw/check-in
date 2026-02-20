<template>
  <div class="team-detail-page">
    <!-- Header -->
    <div class="top-header">
      <BackButton class="back-btn" />
      <span class="title">Team Detail</span>
    </div>

    <div class="content">
      <TeamInfoCard :team="team" />

      <InviteLinkCard :invite="invite" @disable="onDisableLink" @copy="onCopy" />

      <BaseCard class="table-card">
        <InternTable :interns="interns" :loading="loading" />
      </BaseCard>
    </div>

    <ManagerBottomBar />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useApi } from '~/composables/core'
import { message } from 'ant-design-vue'

import BaseCard from '@/components/base/BaseCard.vue'
import BackButton from '@/components/base/BackButton.vue'
import ManagerBottomBar from '@/components/manager/ManagerBottomBar.vue'
import TeamInfoCard from '@/components/manager/team/TeamInfoCard.vue'
import InviteLinkCard from '@/components/manager/team/InviteLinkCard.vue'
import InternTable from '@/components/manager/team/InternTable.vue'

const { apiFetch } = useApi()
const route = useRoute()
const teamId = route.params.id as string

const loading = ref(true)

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

const loadTeamDetail = async () => {
  loading.value = true

  try {
    /* ================= TEAM DETAIL ================= */
    const res: any = await apiFetch('/teams', {
      params: { page: 1, pageSize: 10 }
    })

    const teamData = res.data.teams.find(
      (t: any) => t.id === teamId
    )

    if (!teamData) {
      message.error('Team not found')
      return
    }

    team.value = {
      name: teamData.name,
      mentor: teamData.mentorName || 'Unassigned',
      status: 'active'
    }

    interns.value = (teamData.interns || []).map((i: any) => ({
      id: i.id,
      name: i.name,
      score: 0,
      status: 'active'
    }))

    /* ================= INVITE ================= */
    const inviteRes: any = await apiFetch('/auth/invites')

    const inviteList = inviteRes.data || []

    const inviteData = inviteList.find(
      (i: any) => i.teamId === teamId && i.isActive
    )

    if (inviteData) {
      invite.value = {
        url: `${window.location.origin}/register?invite=${inviteData.code}`,
        maxUses: inviteData.maxUses ?? 0,
        used: inviteData.usedCount ?? 0,
        expiresAt: inviteData.expiresAt,
        status: inviteData.isActive ? 'active' : 'inactive'
      }
    } else {
      invite.value = {
        url: '',
        maxUses: 0,
        used: 0,
        expiresAt: '',
        status: 'inactive'
      }
    }
    console.log('INVITE RES:', inviteRes)
    console.log('TEAM ID:', teamId)
    console.log(inviteRes.data[0])
  } catch (err) {
    message.error('Failed to load team detail')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadTeamDetail()
})

/* ===== ACTIONS ===== */

const onCopy = () => {
  if (!invite.value.url) return
  navigator.clipboard.writeText(invite.value.url)
  message.success('Link copied')
}

const onDisableLink = async () => {
  try {
    await apiFetch(`/auth/invites/${teamId}/status`, {
      method: 'PATCH',
      body: { isActive: false }
    })

    invite.value.status = 'inactive'
    message.success('Invite link disabled')

  } catch {
    message.error('Disable failed')
  }
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

.content>* {
  width: 100%;
  max-width: 360px;
  margin-bottom: 12px;
}

.table-card {
  padding: 0;
}
</style>
