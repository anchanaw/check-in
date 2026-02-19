<template>
    <div class="page">
        <!-- Header -->
        <div class="top-header">
            <BackButton />
            <div class="title">Create Team</div>
        </div>

        <div class="wrapper">
            <BaseCard>
                <div class="step">Step 1 of 2</div>

                <a-form layout="vertical" @submit.prevent="createTeam">
                    <a-form-item label="Team Name" :validate-status="error ? 'error' : ''" :help="error">
                        <a-input v-model:value="teamName" placeholder="Enter team name" size="large"
                            @pressEnter="createTeam" />
                    </a-form-item>

                    <div class="hint">
                        This name will be visible to interns.
                    </div>

                    <a-button type="primary" block @click="createTeam">
                        Create Team
                    </a-button>

                </a-form>
            </BaseCard>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from '~/composables/core'
import { message } from 'ant-design-vue'
import BaseCard from '@/components/base/BaseCard.vue'
import BackButton from '@/components/base/BackButton.vue'

const { apiFetch } = useApi()
const router = useRouter()

const teamName = ref('')
const loading = ref(false)
const error = ref('')

const createTeam = async () => {
    if (!teamName.value.trim()) {
        message.error('Please enter team name')
        return
    }

    try {
        loading.value = true

        // 🔥 กลับหน้า teams พร้อม refresh
        const res: any = await apiFetch('/teams', {
            method: 'POST',
            body: { name: teamName.value }
        })

        message.success('Team created successfully')

        // 🔥 ไปหน้า invite ของทีมที่เพิ่งสร้าง
        router.push({
            path: `/mentor/teams/${res.data.id}/invite`,
            query: {
                name: teamName.value
            }
        })


    } catch (err) {
        message.error('Failed to create team')
    } finally {
        loading.value = false
    }
}

</script>

<style scoped>
.page {
    min-height: 100vh;
    padding: 16px;
    background: #6CBCFA;
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

.hint {
    font-size: 12px;
    color: #999;
    margin-bottom: 16px;
}

.create-btn {
    margin-top: 12px;
}
</style>
