<template>
    <div class="page-wrapper">

        <!-- Top Bar -->
        <div class="top-bar">
            <BackButton />
            <span>Create Invite</span>
        </div>

        <div class="card-container">
            <a-card class="invite-card">

                <div class="card-header">
                    <h2>Create Invite Link</h2>
                    <p>Generate a link for interns to join a team</p>
                </div>

                <!-- Team -->
                <!-- Team (Auto from previous page) -->
                <!-- Team -->
                <div class="field">
                    <label>Team</label>
                    <a-input :value="teamName" disabled size="large" />
                </div>

                <!-- 🔥 แสดง Team ID -->
                <div class="field">
                    <label>Team ID</label>
                    <a-input :value="teamId" disabled size="large" />
                </div>

                <!-- Max Uses -->
                <div class="field">
                    <label>Max Uses (Optional)</label>
                    <a-input-number v-model:value="maxUses" :min="1" style="width:100%" size="large" />
                </div>

                <!-- Expire -->
                <div class="field">
                    <label>Expire Date (Optional)</label>
                    <a-date-picker v-model:value="expiredAt" style="width:100%" size="large" />
                </div>

                <a-button type="primary" block size="large" class="create-btn" :loading="loading" :disabled="!teamId"
                    @click="createInvite">
                    Generate Link
                </a-button>

                <!-- Result -->
                <!-- Result -->
                <div v-if="inviteLink" class="result-box">
                    <p>Invite Link:</p>
                    <div class="invite-row">
                        <a-input :value="inviteLink" readonly />
                        <a-button @click="copyLink">Copy</a-button>
                    </div>
                </div>
                <a-button block size="large" class="back-team-btn" @click="goBackToTeam">
                    ← Back to Teams
                </a-button>
            </a-card>
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import { useRoute, useRouter } from 'vue-router'
import BackButton from '~/components/base/BackButton.vue'
import { useApiFetch } from '~/composables/useApiFetch'

const api = useApiFetch
const route = useRoute()
const router = useRouter()

const loading = ref(false)

const teamId = ref<string | null>(null)
const teamName = ref<string>('')

const maxUses = ref<number | null>(1)
const expiredAt = ref<any>(null)
const inviteCode = ref<string | null>(null)
const inviteLink = ref<string | null>(null)
/* =============================
   Load Team From Query
============================= */
onMounted(() => {
    if (!route.query.teamId || !route.query.teamName) {
        message.error('Invalid access')
        router.replace('/manager')
        return
    }

    teamId.value = String(route.query.teamId)
    teamName.value = String(route.query.teamName)
})
/* =============================
   Generate Code
============================= */
const generateCode = () =>
    Math.random().toString(36).substring(2, 8).toUpperCase()

/* =============================
   Create Invite
============================= */
const createInvite = async () => {
    try {
        if (!teamId.value) {
            message.warning('Team not found')
            return
        }

        loading.value = true

        const code = generateCode()

        await api('/auth/invites', {
            method: 'POST',
            body: {
                code,
                role: 'intern',
                type: 'registration',
                maxUses: maxUses.value,
                expiredAt: expiredAt.value
                    ? expiredAt.value.toISOString()
                    : null
            }
        })

        // 🔥 สร้างลิงก์เต็ม
        inviteLink.value = `${window.location.origin}/invite?code=${code}`

        message.success('Invite created successfully 🎉')

    } catch (err: any) {
        message.error(err?.data?.message || 'Failed to create invite')
    } finally {
        loading.value = false
    }
}

/* =============================
   Copy Code
============================= */
const copyLink = async () => {
    if (!inviteLink.value) return
    await navigator.clipboard.writeText(inviteLink.value)
    message.success('Link copied to clipboard')
}

const goBackToTeam = () => {
  router.push('/manager/team')
}
</script>

<style scoped>
.page-wrapper {
    min-height: 100vh;
    background: linear-gradient(180deg, #6fb1fc 0%, #f5f7fa 40%);
}

.top-bar {
    height: 60px;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0 16px;
    font-size: 18px;
    font-weight: 600;
    color: white;
}

.card-container {
    display: flex;
    justify-content: center;
    padding: 20px 16px 60px;
}

.invite-card {
    width: 100%;
    max-width: 420px;
    border-radius: 20px;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
}

.card-header {
    margin-bottom: 24px;
}

.field {
    margin-bottom: 20px;
}

.create-btn {
    height: 48px;
    border-radius: 12px;
    font-weight: 600;
}

.result-box {
    margin-top: 24px;
    padding: 16px;
    background: #f5f7fa;
    border-radius: 12px;
}

.invite-row {
    display: flex;
    gap: 8px;
}

.back-team-btn {
  margin-top: 12px;
  background: #f5f5f5;
  border: none;
}

.back-team-btn:hover {
  background: #e8e8e8;
}
</style>