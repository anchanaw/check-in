<template>
  <nav class="bottom-bar">
    <NuxtLink v-for="item in items" :key="item.label" :to="item.to" class="tab" :class="{ active: isActive(item) }">
      <div class="icon-wrapper">
        <div class="icon" :style="{ maskImage: `url(${item.icon})` }"></div>

        <!-- 👇 ตัวนี้สำคัญ -->
        <span class="underline"></span>
      </div>

      <span class="label">{{ item.label }}</span>
    </NuxtLink>

  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()

const items = [
  { label: 'CHECK-IN', to: '/intern', match: '/intern', icon: '/icons/intern/checkin.svg' },
  { label: 'DASHBOARD', to: '/intern/dashboard', match: '/intern/dashboard', icon: '/icons/intern/dashboard.svg' },
  { label: 'RANKING', to: '/intern/rank', match: '/intern/rank', icon: '/icons/intern/rank.svg' },
  { label: 'ASSIGNMENT', to: '/intern/assignment', match: '/intern/assignment', icon: '/icons/intern/assignment.svg' },
  { label: 'PROFILE', to: '/intern/profile', match: '/intern/profile', icon: '/icons/intern/profile.svg' },
]

const isActive = (item) => {
  if (item.match === '/intern') return route.path === '/intern'
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

  flex-shrink: 0;
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

/* ACTIVE STATE */
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

.icon {
  transition: background-color 0.2s ease;
}
</style>