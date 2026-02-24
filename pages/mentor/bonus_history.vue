<template>
    <a-layout class="page">

        <!-- Header -->
        <div class="top-header">
            <div class="back">
                <BackButton />
            </div>

            <div class="title">Point History</div>
        </div>

        <!-- Tabs -->
        <div class="tabs-wrapper">
            <a-tabs v-model:activeKey="activeTab" class="full-tabs">
                <a-tab-pane key="all" tab="All" />
                <a-tab-pane key="task" tab="Task" />
                <a-tab-pane key="bonus" tab="Bonus" />
            </a-tabs>
        </div>

        <!-- Content -->
        <div class="content">
            <a-spin :spinning="loading">

                <BonusHistoryItem v-for="item in filteredItems" :key="item.id" :item="item" />

            </a-spin>
        </div>

    </a-layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'
import { useApi } from '~/composables/core'
import BackButton from '@/components/base/BackButton.vue'
import BonusHistoryItem from '@/components/mentor/bonus/BonusHistoryItem.vue'

const route = useRoute()

console.log('ROUTE PARAMS:', route.params)
console.log('INTERN ID FROM ROUTE:', route.params.id)
const { apiFetch } = useApi()

const activeTab = ref('all')
const loading = ref(true)

interface HistoryItem {
    id: string
    sourceId: string
    eventType: 'task' | 'mentor_add' | 'mentor_remove'
    title: string
    subtitle: string
    date: string
    points: number
}

const items = ref<HistoryItem[]>([])

const mapEventType = (
    item: any
): 'task' | 'mentor_add' | 'mentor_remove' => {

    if (item.eventType === 'BONUS_POINT') {
        return 'mentor_add'
    }

    if (item.eventType === 'MANUAL_POINT' && item.points > 0) {
        return 'mentor_add'
    }

    if (item.eventType === 'MANUAL_POINT' && item.points < 0) {
        return 'mentor_remove'
    }

    return 'task'
}

onMounted(async () => {
    try {
        loading.value = true

        const internId = route.query.id as string
        console.log('FETCHING POINTS FOR INTERN:', internId)

        const res = await apiFetch(
            `/users/interns/${internId}/points`
        ) as any
        console.log('POINT API RESPONSE:', res)
        console.log('POINT DATA:', res?.data)
        const history = res?.data || []

        items.value = history.map((item: any) => ({
            id: item.id,               // point id
            sourceId: item.sourceId,   // 👈 submission id / bonus id
            eventType: mapEventType(item),
            title: mapTitle(item),
            subtitle: item.reason || '-',
            date: dayjs(item.createdAt).add(7, 'hour').format('DD MMM YYYY'),
            points: item.points
        }))

    } catch (err) {
        console.error('Point history error:', err)
    } finally {
        loading.value = false
    }
})

/* ===== map title ตาม eventType ===== */
const mapTitle = (item: any) => {
    if (item.eventType === 'BONUS_POINT') {
        return 'Bonus Points'
    }

    if (item.eventType === 'MANUAL_POINT') {
        return item.points > 0
            ? 'Manual Points'
            : 'Points Deducted'
    }

    return 'Points Update'
}

/* ===== filter tabs ===== */
const filteredItems = computed(() => {
    if (activeTab.value === 'all') {
        return items.value
    }

    if (activeTab.value === 'task') {
        return items.value.filter(
            i => i.eventType === 'task'
        )
    }

    if (activeTab.value === 'bonus') {
        return items.value.filter(
            i =>
                i.eventType === 'mentor_add' ||
                i.eventType === 'mentor_remove'
        )
    }

    return []
})
</script>

<style scoped>
.page {
    min-height: 100vh;
    background: #6ec1ff;
    padding-bottom: 40px;
}

.top-header {
    position: relative;
    height: 70px;
    background: #ffffff;

    display: flex;
    align-items: center;
    justify-content: center;
}

.back {
    position: absolute;
    left: 16px;
}

.title {
    font-size: 24px;
    font-weight: 600;
}

.tabs-wrapper {
    background: #ffffff;
}

/* ทำให้ nav เต็มจอ */
:deep(.full-tabs .ant-tabs-nav) {
    margin: 0;
}

/* ทำให้แท็บกระจายเท่ากัน */
:deep(.full-tabs .ant-tabs-nav-list) {
    width: 100%;
    display: flex;
}

:deep(.full-tabs .ant-tabs-tab) {
    flex: 1;
    justify-content: center;
    margin: 0 !important;
}

/* เส้น active ให้เต็มช่อง */
:deep(.full-tabs .ant-tabs-ink-bar) {
    height: 3px;
}

.content {
    padding: 16px;
}
</style>
