<template>
    <div class="stats">
        <a-skeleton v-if="loading" active />

        <template v-else>
            <a-card size="small">
                <div class="label">Total Mentor</div>
                <div class="num">{{ stats.mentor }}</div>
            </a-card>

            <a-card size="small">
                <div class="label">Total Intern</div>
                <div class="num">{{ stats.intern }}</div>
            </a-card>

            <a-card size="small">
                <div class="label">Total Team</div>
                <div class="num">{{ stats.team }}</div>
            </a-card>
        </template>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    stats: {
        mentor: number
        intern: number
        team: number
    }
    loading: boolean
}>()
</script>

<style scoped>
.stats {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
    justify-content: space-between;
}

/* การ์ด */
:deep(.ant-card) {
    flex: 1;
    padding: 12px 8px;
    border-radius: 12px;

    /* ⭐ สลับตำแหน่ง */
    display: flex;
    flex-direction: column;
    align-items: center;
}

/* label ขึ้นบน */
.label {
    font-size: 13px;
    color: #000000;
    text-align: center;
    margin-bottom: 6px;
}

/* ตัวเลขลงล่าง */
.num {
    font-weight: 700;
    font-size: 22px;
    text-align: center;
}

</style>
