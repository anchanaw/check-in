<template>
    <div class="page">
        <div class="top-header">
            <BackButton />
            <div class="title">Create Invite Link</div>
        </div>

        <div class="wrapper">
            <BaseCard>
                <div class="step">Step 2 of 2</div>

                <div class="team-name">
                    Team: <strong>{{ teamName }}</strong>
                </div>

                <a-form layout="vertical">
                    <a-form-item label="Max Uses">
                        <a-input-number v-model:value="maxUses" :min="1" style="width: 100%" size="large" />
                    </a-form-item>

                    <a-form-item label="Expire At (Optional)">
                        <a-date-picker v-model:value="expiredAt" picker="month" style="width: 100%" size="large" />
                    </a-form-item>

                    <a-button type="primary" block size="large" :loading="loading" @click="createInvite">
                        Generate Link
                    </a-button>
                </a-form>

                <!-- Result -->
                <div v-if="inviteLink" class="result-card">
                    <div class="label">Invite Link</div>

                    <div class="link-row">
                        <a-input :value="inviteLink" readonly />
                        <a-button @click="copyLink">Copy</a-button>
                    </div>

                    <div class="meta">
                        Used: 0 / {{ maxUses }}
                    </div>

                    <a-button type="default" block class="view-team-btn" @click="goToTeam">
                        View Team
                    </a-button>
                </div>
            </BaseCard>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useApi } from '~/composables/core'
import { message } from 'ant-design-vue'
import BaseCard from '@/components/base/BaseCard.vue'
import BackButton from '@/components/base/BackButton.vue'
import { useRouter } from 'vue-router'

const { apiFetch } = useApi()
const route = useRoute()
const router = useRouter()

const teamId = route.params.id as string
const teamName = ref('')
const maxUses = ref(1)
const expiredAt = ref(null)
const inviteLink = ref('')
const loading = ref(false)

onMounted(async () => {
    // fallback กรณีไม่มี GET /teams/:id
    teamName.value = `Team ID: ${teamId}`
})

const generateCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase()
}

const createInvite = async () => {
    try {
        loading.value = true
        const code = generateCode()

        await apiFetch('/auth/invites', {
            method: 'POST',
            body: {
                code,
                role: 'intern',
                type: 'registration',
                maxUses: maxUses.value,
            }
        })

        inviteLink.value = `${window.location.origin}/invite/${code}`
        message.success('Invite link created')
    } catch (err) {
        message.error('Failed to create invite')
    } finally {
        loading.value = false
    }
}

const copyLink = () => {
    navigator.clipboard.writeText(inviteLink.value)
    message.success('Copied!')
}
const goToTeam = () => {
    router.push(`/mentor/teams/${teamId}`)
}
</script>

<style scoped>
.page {
    min-height: 100vh;
    background: #6CBCFA;
    padding: 16px;
}

.top-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
}

.title {
    font-size: 18px;
    font-weight: 600;
}

.wrapper {
    max-width: 480px;
    margin: auto;
}

.step {
    font-size: 13px;
    color: #888;
    margin-bottom: 12px;
}

.team-name {
    margin-bottom: 16px;
    font-size: 14px;
}

.result-card {
    margin-top: 20px;
    padding: 12px;
    border-radius: 8px;
    background: #f7f7f7;
}

.label {
    font-weight: 600;
    margin-bottom: 8px;
}

.link-row {
    display: flex;
    gap: 8px;
}

.meta {
    margin-top: 8px;
    font-size: 13px;
    color: #666;
}

.view-team-btn {
    margin-top: 12px;
}
</style>
