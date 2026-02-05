<template>
    <div class="stats">
        <a-skeleton v-if="loading" active />

        <template v-else>
            <a-card size="small">
                <div class="num">{{ stats.mentor }}</div>
                <div class="label">Total Mentor</div>
            </a-card>

            <a-card size="small">
                <div class="num">{{ stats.intern }}</div>
                <div class="label">Total Intern</div>
            </a-card>

            <a-card size="small">
                <div class="num">{{ stats.team }}</div>
                <div class="label">Total Team</div>
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
    gap: 8px;
    margin-bottom: 12px;
    justify-content: space-between;
}

.num {
    text-align: center;
    font-weight: 600;
}

.label {
    font-size: 11px;
    color: #666;
    text-align: center;
}
</style>
