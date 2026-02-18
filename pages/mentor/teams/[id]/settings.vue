<template>
    <div class="invite-page">
        <!-- Header -->
        <div class="top-header">
            <a-button type="text" shape="circle" @click="goBack">
                <BackButton />
            </a-button>
            <span class="header-title">Team Settings</span>
        </div>

        <div class="wrapper">
            <BaseCard>
                <h3>{{ teamName }}</h3>

                <InviteLinkCard v-if="invite" :invite="{
                    link: `${baseUrl}/register?code=${invite.code}`,
                    maxUses: invite.maxUses,
                    used: invite.usesCount,
                    status: invite.usesCount >= invite.maxUses ? 'Used' : 'Active'
                }" @copy="copyLink" />

                <div v-else>
                    No active invite link
                </div>

            </BaseCard>

        </div>

        <MentorBottomBar active="profile" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useApi } from '~/composables/core'
import { message } from 'ant-design-vue'

import BaseCard from '~/components/base/BaseCard.vue'
import InviteLinkCard from '~/components/mentor/invite/InviteLinkCard.vue'
import MentorBottomBar from '@/components/mentor/MentorBottomBar.vue'
import BackButton from '~/components/base/BackButton.vue'

const { apiFetch } = useApi()
const route = useRoute()
const router = useRouter()

const teamId = route.params.id as string

const goBack = () => {
    router.back()
}

const teamName = ref('')
const invite = ref<any | null>(null)
const baseUrl = import.meta.client ? window.location.origin : ''

const loadData = async () => {
  try {
    // 1️⃣ โหลด interns ทั้งหมด
    const internRes = await apiFetch('/users/interns') as { data: any[] }

    const allTeams = internRes.data
      .flatMap((i: any) => i.teams || [])

    const foundTeam = allTeams.find(
      (t: any) => String(t.id) === String(teamId)
    )

    teamName.value = foundTeam?.name || 'Unknown Team'

    // 2️⃣ โหลด invite ทั้งหมด
    const inviteRes = await apiFetch('/auth/invites') as { data: any[] }

    invite.value = inviteRes.data.find(
      (i: any) =>
        String(i.teamId) === String(teamId) &&
        i.usesCount < i.maxUses
    ) || null

  } catch (err) {
    console.error(err)
  }
}

onMounted(loadData)

const copyLink = () => {
    if (!invite.value) return
    const link = `${window.location.origin}/register?code=${invite.value.code}`
    navigator.clipboard.writeText(link)
    message.success('Link copied')
}
</script>

<style scoped>
.invite-page {
    background-color: #6ec1ff;
    min-height: 100vh;
    padding-bottom: 72px;
}

.top-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px;
}

.header-title {
    font-weight: 600;
}

.wrapper {
    display: flex;
    justify-content: center;
    padding: 0 12px;
}

.wrapper :deep(.base-card) {
    width: 100%;
    max-width: 360px;
}

.create-btn {
    margin-top: 16px;
}
</style>
