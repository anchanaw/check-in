<template>
    <nav class="bottom-bar">
        <NuxtLink v-for="item in items" :key="item.label" :to="item.to" class="tab" :class="{ active: isActive(item) }">
            <div class="icon-wrapper">
                <div class="icon" :style="{ maskImage: `url(${item.icon})` }"></div>

                <span class="underline"></span>
            </div>

            <span class="label">{{ item.label }}</span>
        </NuxtLink>
    </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()

/**
 * Mentor navigation
 */
const items = [
    {
        label: 'DASHBOARD',
        to: '/mentor',
        match: '/mentor',
        group: ['dashboard', 'tasks'],
        icon: '/icons/mentor/dashboard.svg'
    },
    {
        label: 'INTERN',
        to: '/mentor/teams',
        match: '/mentor/teams',
        group: ['review_bonus', 'team'],
        icon: '/icons/mentor/intern.svg'
    },
    {
        label: 'BONUS',
        to: '/mentor/bonus',
        match: '/mentor/bonus',
        group: ['bonus'],
        icon: '/icons/mentor/bonus.svg'
    },
    {
        label: 'RANKING',
        to: '/mentor/rank',
        match: '/mentor/rank',
        group: ['rank'],
        icon: '/icons/mentor/rank.svg'
    },
    {
        label: 'PROFILE',
        to: '/mentor/profile',
        match: '/mentor/profile',
        group: ['invite_intern', 'profile'],
        icon: '/icons/mentor/profile.svg'
    }
]

const isActive = (item) => {
  const current = route.path.split('/')[2] // เอา segment หลัง /mentor

  if (!current) return item.to === '/mentor'

  return item.group.includes(current)
}

</script>

<style scoped>
.bottom-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    height: calc(64px + env(safe-area-inset-bottom));
    padding-bottom: env(safe-area-inset-bottom);

    background: #fff;
    border-top: 1px solid #eee;

    display: flex;
}

.tab {
    flex: 1;
    min-width: 0;
    text-decoration: none;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 4px;
    padding: 6px 0;

    font-size: 10px;
    color: #000;
}

/* icon (mask method) */
.icon {
    width: 22px;
    height: 22px;
    background-color: #000;

    mask-size: contain;
    mask-repeat: no-repeat;
    mask-position: center;

    -webkit-mask-size: contain;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center;

    transition: background-color 0.2s ease;
}

.icon-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
}

/* label */
.label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    opacity: 0.6;
}

/* ACTIVE */
.tab.active .icon {
    background-color: #2563eb;
}

.tab.active .label {
    color: #2563eb;
    opacity: 1;
}

.tab.active .underline {
    background: #2563eb;
}

.underline {
    width: 18px;
    height: 2px;
    margin-top: 4px;
    border-radius: 1px;
    background: transparent;
    transition: background-color 0.2s ease;
}
</style>
