<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div
    class="mobile-wrapper"
    :class="{ 'no-padding': route.meta.noPadding }"
  >
    <slot />
  </div>
</template>

<style>
.mobile-wrapper {
  min-height: 100dvh;
  background: #6CBCFA;

  display: flex;
  flex-direction: column;   /* layout แบบ mobile */
  align-items: center;      /* จัด content กลางแนวนอน */

  padding: 32px 16px 0;     /* default safe area */
  box-sizing: border-box;
}

/* ⭐ ใช้เฉพาะหน้าที่ประกาศ noPadding */
.mobile-wrapper.no-padding {
  padding: 0;
}
</style>
