<template>
    <div class="invite-page">
        <!-- Header -->
        <div class="top-header">
            <a-button type="text" shape="circle" @click="goBack">
                <ArrowLeftOutlined />
            </a-button>
            <span class="header-title">Invite Intern</span>
        </div>

        <div class="wrapper">
            <BaseCard>
                <!-- Team select -->
                <InviteTeamSelect v-model="team" :teams="teams" />

                <!-- Invite link info -->
                <InviteLinkCard :invite="invite" @copy="copyLink" @disable="disableLink" />

                <!-- Create link -->
                <a-button type="primary" block class="create-btn" @click="createLink">
                    Create Link
                </a-button>
            </BaseCard>
        </div>

        <MentorBottomBar active="profile" />
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { ArrowLeftOutlined } from '@ant-design/icons-vue'
import { useRouter } from 'vue-router'

import BaseCard from '~/components/base/BaseCard.vue'
import InviteTeamSelect from '~/components/mentor/invite/InviteTeamSelect.vue'
import InviteLinkCard from '~/components/mentor/invite/InviteLinkCard.vue'
import MentorBottomBar from '@/components/mentor/MentorBottomBar.vue'

/**
 * TODO:
 * - GET /teams
 * - POST /invite-links
 */

const goBack = () => history.back()

// 🔹 mock teams
const teams = [
    { label: 'Frontend Development', value: 'frontend' },
    { label: 'Backend Development', value: 'backend' }
]
const router = useRouter()
const team = ref(null)

// 🔹 mock invite link
const invite = reactive({
    link: 'https://your.app/invite/SEwUVZAn4MUyN',
    maxUses: 5,
    expiresAt: '20 Jan 2026',
    used: 1,
    status: 'Active'
})

const createLink = () => {
    console.log('create invite link for team:', team.value)
    router.push('/mentor/create_link')
    // TODO: POST /invite-links
}

const copyLink = () => {
    navigator.clipboard.writeText(invite.link)
}

const disableLink = () => {
    invite.status = 'Disabled'
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
