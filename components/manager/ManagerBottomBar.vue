<template>
  <nav class="bottom-bar">
    <NuxtLink
      v-for="item in items"
      :key="item.label"
      :to="item.to"
      class="tab"
      :class="{ active: isActive(item) }"
    >
      <div class="icon-wrapper">
        <div
          class="icon"
          :style="{ maskImage: `url(${item.icon})` }"
        ></div>
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
 * Manager navigation (ตามรูป)
 */
const items = [
  {
    label: 'DASHBOARD',
    to: '/manager',
    match: '/manager',
    icon: '/icons/manager/dashboard.svg'
  },
  {
    label: 'TEAMS',
    to: '/manager/team',
    match: '/manager/team',
    icon: '/icons/manager/team.svg'
  },
  {
    label: 'USERS',
    to: '/manager/users',
    match: '/manager/users',
    icon: '/icons/manager/users.svg'
  },
  {
    label: 'TASKS',
    to: '/manager/tasks',
    match: '/manager/tasks',
    icon: '/icons/manager/task.svg'
  },
  {
    label: 'PROFILE',
    to: '/manager/profile',
    match: '/manager/profile',
    icon: '/icons/manager/profile.svg'
  }
]

const isActive = (item) => {
  // dashboard ต้อง exact
  if (item.match === '/manager') {
    return route.path === '/manager'
  }
  return route.path.startsWith(item.match)
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
