<template>
  <div class="base-card" :style="cardStyle">
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  maxWidth: {
    type: String,
    default: '360px'
  },
  padding: {
    type: String,
    default: '24px 24px'
  }
})
const variants = {
  auth: {
    maxWidth: '320px',
    padding: '24px 20px',
    radius: '8px'
  },
  checkin: {
    maxWidth: '340px',
    padding: '10px',
    radius: '8px'
  },
  dashboard: {
    maxWidth: '352px',
    padding: '20px',
    radius: '10px'
  }
}
const cardStyle = computed(() => ({
  maxWidth: props.maxWidth,
  padding: props.padding
}))
</script>

<style scoped>
.base-card {
  width: 100%;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, .18);
}
</style>
