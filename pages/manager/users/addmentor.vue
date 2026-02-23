<template>
  <div class="invite-page">
    <div class="top-header">
      <BackButton />
      <span class="title">Invite Mentor</span>
    </div>

    <div class="content">
      <BaseCard>

        <a-button type="primary" block :loading="loading" @click="onSubmit">
          Generate Invite Link
        </a-button>

        <div v-if="inviteLink" class="result">
          <a-divider />

          <div class="row">
            <span class="label">Registration Link</span>
          </div>

          <a-typography-text copyable class="link-box">
            {{ inviteLink }}
          </a-typography-text>

          <div class="preview">
            <a-tag color="blue">Preview URL</a-tag>
            <div class="preview-url">
              {{ inviteLink }}
            </div>
          </div>

        </div>

      </BaseCard>
    </div>

    <ManagerBottomBar />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import { useRuntimeConfig } from '#app'
import { useApiFetch } from '~/composables/useApiFetch'
import BaseCard from '@/components/base/BaseCard.vue'
import BackButton from '@/components/base/BackButton.vue'
import ManagerBottomBar from '@/components/manager/ManagerBottomBar.vue'

const loading = ref(false)
const inviteLink = ref('')

const config = useRuntimeConfig()

const onSubmit = async () => {
  try {
    loading.value = true

    const res: any = await useApiFetch('/auth/invites', {
      method: 'POST',
      body: {
        code: `MENTOR-${Date.now()}`,
        role: 'mentor',
        type: 'registration',
        maxUses: 1
      }
    })

    const code = res?.data?.code
    // 🔥 สร้างลิงก์สมัครจริง
    inviteLink.value = `${window.location.origin}/register?code=${code}`
    message.success('Invite link created successfully')

  } catch (err) {
    console.error(err)
    message.error('Failed to create invite')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.result {
  margin-top: 16px;
}

.row {
  margin-bottom: 8px;
}

.label {
  font-weight: 600;
}

.link-box {
  display: block;
  background: #f5f5f5;
  padding: 10px;
  border-radius: 6px;
  word-break: break-all;
}

.preview {
  margin-top: 12px;
}

.preview-url {
  font-size: 13px;
  color: #888;
  word-break: break-all;
}
</style>