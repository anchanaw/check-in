<template>
    <BaseCard class="item-card">

        <div class="row">

            <!-- Icon -->
            <div class="icon">
                <img v-if="item.eventType === 'task'" src="/icons/task.svg" class="icon-img" />

                <img v-else-if="item.eventType === 'mentor_add'" src="/icons/add.svg" class="icon-img" />

                <img v-else src="/icons/remove.svg" class="icon-img" />
            </div>

            <!-- Content -->
            <div class="info">

                <div class="top-line">
                    <span :class="['points', item.points < 0 ? 'minus' : 'plus']">
                        {{ formattedPoints }}
                    </span>

                    <span class="title">
                        {{ item.title }}
                    </span>
                </div>

                <div class="subtitle">
                    {{ item.subtitle }}
                </div>

                <div class="date">
                    {{ item.date }}
                </div>

            </div>

            <!-- Arrow -->
            <div class="arrow" @click.stop="goDetail">
                ›
            </div>
        </div>

    </BaseCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseCard from '@/components/base/BaseCard.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps<{
    internId: string
    item: {
        id: string
        sourceId?: string
        eventType: 'task' | 'mentor_add' | 'mentor_remove'
        title: string
        subtitle: string
        date: string
        points: number
    }
}>()

const formattedPoints = computed(() => {
    return props.item.points > 0
        ? `+${props.item.points}`
        : props.item.points
})

const goDetail = () => {
    if (props.item.eventType === 'task' && props.item.sourceId) {
        router.push(`/mentor/task_history/${props.item.sourceId}`)
    } else {
        router.push({
            path: `/mentor/points_detail/${props.item.id}`,
            query: { internId: props.internId }
        })
    }
}

</script>

<style scoped>
.item-card {
    margin-bottom: 16px;
    border-radius: 16px;
    background: #f3f4f6;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.row {
    display: flex;
    align-items: center;
    gap: 14px;
}

.icon {
    width: 28px;
    display: flex;
    justify-content: center;
}

.icon-img {
    width: 20px;
    height: 20px;
}

.info {
    flex: 1;
}

.top-line {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    font-weight: 600;
}

.points {
    font-size: 18px;
    font-weight: 700;
}

.points.plus {
    color: #22c55e;
}

.points.minus {
    color: #ef4444;
}

.subtitle {
    font-size: 13px;
    color: #555;
}

.date {
    font-size: 12px;
    color: #888;
}

.arrow {
    font-size: 24px;
    color: #000000;
}
</style>
