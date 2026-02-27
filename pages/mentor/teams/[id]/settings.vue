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

                <!-- 🔄 Loading -->
                <div v-if="loading">
                    <a-skeleton active :paragraph="{ rows: 3 }" />
                </div>

                <!-- ❗ Error -->
                <div v-else-if="error" class="error-state">
                    {{ error }}
                </div>

                <!-- ✅ Normal Content -->
                <div v-else>
                    <h3>{{ teamName }}</h3>

                    <InviteLinkCard v-if="invite" :invite="{
                        id: invite.id,
                        link: `${baseUrl}/invite?code=${invite.code}`,
                        maxUses: toNumber(invite.maxUses),
                        used: toNumber(invite.usesCount),
                        status:
                            invite.isActive === false
                                ? 'Disabled'
                                : toNumber(invite.usesCount) >= toNumber(invite.maxUses)
                                    ? 'Used'
                                    : 'Active'
                    }" @copy="copyLink" @disable="disableInvite" />

                    <div v-else>
                        No active invite link
                    </div>

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
const loading = ref(true)
const error = ref<string | null>(null)
const baseUrl = import.meta.client ? window.location.origin : ''
const toNumber = (value: unknown) => Number(value ?? 0)

const loadData = async () => {
    try {
        loading.value = true
        error.value = null

        // ===== LOAD TEAM NAME =====
        const firstPageRes: any = await apiFetch('/teams?page=1&pageSize=10')

        let allTeams = [...firstPageRes.data.teams]
        const totalPages = firstPageRes.data.totalPages

        if (totalPages > 1) {
            const otherPages = await Promise.all(
                Array.from({ length: totalPages - 1 }, (_, i) =>
                    apiFetch(`/teams?page=${i + 2}&pageSize=10`)
                )
            )

            otherPages.forEach((res: any) => {
                allTeams = [...allTeams, ...res.data.teams]
            })
        }

        const currentTeam = allTeams.find(
            (t: any) => String(t.id) === String(teamId)
        )

        teamName.value = currentTeam?.name || 'Unknown Team'

        // ===== LOAD INVITES =====
        const inviteRes: any = await apiFetch('/auth/invites')

        const inviteList = inviteRes.data || []
        const teamInvites = inviteList.filter(
            (i: any) =>
                String(i.teamId) === String(teamId) &&
                i.type === 'join_team' &&
                i.role === 'intern'
        )

        // Prefer a currently usable invite, then fall back to any invite in this team.
        invite.value =
            teamInvites.find(
                (i: any) =>
                    i.isActive !== false &&
                    toNumber(i.usesCount) < toNumber(i.maxUses)
            ) ||
            teamInvites[0] ||
            null

    } catch (err) {
        console.error(err)
        error.value = 'Failed to load settings'
    } finally {
        loading.value = false
    }
}

onMounted(loadData)


const copyLink = () => {
    if (!invite.value) return
    const link = `${baseUrl}/invite?code=${invite.value.code}`
    navigator.clipboard.writeText(link)
    message.success('Link copied')
}

const disableInvite = async () => {
  if (!invite.value) return

  try {
    await apiFetch(`/auth/invites/${invite.value.id}/status`, {
      method: 'PATCH',
      body: { isActive: false }
    })

    invite.value.isActive = false

    message.success('Invite disabled successfully')

  } catch (err: any) {
    message.error(
      err?.data?.error?.message || 'Failed to disable invite'
    )
  }
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

.error-state {
    text-align: center;
    padding: 16px;
    color: red;
}
</style>
