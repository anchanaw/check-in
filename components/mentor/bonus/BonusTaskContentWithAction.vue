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
                    <a-button danger class="action-btn reject" :loading="loading" @click="$emit('reject', note)">
                        Reject
                    </a-button>

                    <a-button type="primary" class="action-btn approve" :loading="loading"
                        @click="$emit('approve', note)">
                        Approve & Add points
                    </a-button>
                </div>
            </div>
        </div>
    </BaseCard>
</template>

<script setup>
import { ref } from 'vue'
import BaseCard from '@/components/base/BaseCard.vue'

defineProps({
    task: {
        type: Object,
        required: true
    },
    loading: Boolean
})

defineEmits(['approve', 'reject'])

const note = ref('')
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