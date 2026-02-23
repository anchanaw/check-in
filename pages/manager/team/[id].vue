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

interface Invite {
  id: string | null
  url: string
  maxUses: number
  used: number
  expiresAt: string
  status: 'Active' | 'Disabled'
}

const invite = ref<Invite>({
  id: null,
  url: '',
  maxUses: 0,
  used: 0,
  expiresAt: '',
  status: 'Disabled'
})


const interns = ref<any[]>([])
console.log('ROUTE PARAM:', route.params)
const loadTeamDetail = async () => {
  loading.value = true

  try {
    /* ================= TEAM DETAIL ================= */
    let foundTeam: any = null
    let currentPage = 1
    let totalPages = 1

    do {
      const res: any = await apiFetch('/teams', {
        params: { page: currentPage, pageSize: 50 }
      })

      const teamList = res.data?.teams || []
      totalPages = res.data?.totalPages || 1

      foundTeam = teamList.find(
        (t: any) => String(t.id) === String(teamId)
      )

      currentPage++

    } while (!foundTeam && currentPage <= totalPages)

    if (!foundTeam) {
      message.error('Team not found')
      return
    }

    /* ===== FETCH MENTOR NAME ===== */
    let mentorName = 'Unassigned'

    if (foundTeam.mentorId) {
      try {
        const mentorRes: any = await apiFetch(
          `/users/${foundTeam.mentorId}`
        )

        const mentorData = mentorRes.data

        mentorName = `${mentorData.firstName} ${mentorData.lastName}`
      } catch (err) {
        console.error('Failed to load mentor:', err)
        mentorName = 'Unassigned'
      }
    }

    /* ===== SET TEAM ===== */
    team.value = {
      name: foundTeam.name,
      mentor: mentorName,
      status: 'active'
    }

    /* ===== SET INTERNS ===== */
    interns.value = (foundTeam.interns || []).map((i: any) => ({
      id: i.id,
      name: i.name,
      score: 0,
      status: 'active'
    }))
    /* ================= INVITE ================= */
    const inviteRes: any = await apiFetch('/auth/invites')
    const inviteList = inviteRes.data || []

    const inviteData = inviteList.find(
      (i: any) => String(i.teamId) === String(teamId)
    )
    console.log('INVITE LIST:', inviteList)
    console.log('CURRENT TEAM ID:', teamId)
    if (inviteData) {
      invite.value = {
        id: inviteData.id, // 🔥 เก็บ id ไว้ใช้ disable
        url: `${window.location.origin}/invite?code=${inviteData.code}`,
        maxUses: inviteData.maxUses ?? 0,
        used: inviteData.usesCount ?? 0,
        expiresAt: inviteData.expiresAt,
        status: inviteData.isActive ? 'Active' : 'Disabled'
      }
    } else {
      invite.value = {
        id: null,
        url: '',
        maxUses: 0,
        used: 0,
        expiresAt: '',
        status: 'Disabled'
      }
    }
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
    if (!invite.value.id) return

    await apiFetch(`/auth/invites/${invite.value.id}/status`, {
      method: 'PATCH',
      body: { isActive: false }
    })

    invite.value.status = 'Disabled'
    message.success('Invite link disabled')

  } catch (err) {
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
