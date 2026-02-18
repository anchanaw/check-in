<template>
    <BaseCard>
        <div class="card-inner">
            <!-- CONTENT -->
            <a-skeleton v-if="loading" active />

            <div v-else>
                <!-- Descriptions -->
                <div class="section-title">Descriptions</div>
                <div class="desc">
                    {{ task.description }}
                </div>

                <div class="divider"></div>

                <!-- Image -->
                <div class="section-title">Image</div>
                <img v-if="task.imageUrl" :src="task.imageUrl" class="image" />

                <!-- Note -->
                <div class="section-title">
                    Note <span class="optional">(Optional)</span>
                </div>
                <a-textarea v-model:value="note" rows="3" placeholder="" />

                <!-- Actions -->
                <div class="actions">
                    <a-button danger class="action-btn reject" :loading="submitting" @click="reviewTask('rejected')">
                        Reject
                    </a-button>

                    <a-button type="primary" class="action-btn approve" :loading="submitting"
                        @click="reviewTask('approved')">
                        Approve & Add points
                    </a-button>
                </div>
            </div>
        </div>
    </BaseCard>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import { useApi } from '~/composables/core'
import BaseCard from '@/components/base/BaseCard.vue'

const { apiFetch } = useApi()

const props = defineProps<{
  task: {
    id: string
    description: string
    imageUrl?: string
  }
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'updated'): void
}>()

const note = ref('')
const submitting = ref(false)

const reviewTask = async (status: 'approved' | 'rejected') => {
  if (submitting.value) return

  if (!props.task?.id) {
    message.error('Invalid task ID')
    return
  }

  try {
    submitting.value = true

    await apiFetch(`/tasks/submissions/${props.task.id}/review`, {
      method: 'PATCH',
      body: {
        status,
        note: note.value?.trim() || undefined // ส่งเฉพาะถ้ามีค่า
      }
    })

    message.success(
      status === 'approved'
        ? 'Task approved successfully'
        : 'Task rejected successfully'
    )

    note.value = '' // reset note
    emit('updated') // refresh parent list

  } catch (err: any) {
    console.error('Review error:', err)
    message.error(err?.message || 'Failed to update task')
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
/* 🔥 หลบ padding เดิมของ BaseCard (24px) */
.card-inner {
    margin: -24px;
    padding: 12px;
}

/* Section title */
.section-title {
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 6px;
}

/* Description text */
.desc {
    font-size: 13px;
    color: #374151;
    line-height: 1.5;
    margin-bottom: 10px;
}

/* Divider */
.divider {
    height: 1px;
    background: #e5e7eb;
    margin: 12px 0;
}

/* Image */
.image {
    width: 90px;
    height: 90px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 14px;
}

/* Optional */
.optional {
    font-size: 12px;
    color: #9ca3af;
}

/* Actions */
.actions {
    display: flex;
    gap: 12px;
    margin-top: 16px;
    display: flex;
    justify-content: space-between;
}

.action-btn {
    flex: 1;
    height: 42px;
    border-radius: 10px;
    font-size: 14px;
}

.reject {
    max-width: 85px;
    background-color: #FA2822;
    color: white;
    border: none;
}

.approve {
    max-width: 180px;
    background-color: #74c3ff;
    border: none;
}
</style>