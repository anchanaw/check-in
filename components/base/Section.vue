<template>
  <div class="section">
    <div class="title">{{ title }}</div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({ title: String })
</script>

<style scoped>
.section {
  margin-bottom: 12px;
}

.title {
  font-weight: 600;
  margin-bottom: 6px;
}

.content {
  background: #f8fbff;
  padding: 8px;
  border-radius: 8px;
}
</style>
