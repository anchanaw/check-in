<template>
  <div class="bonus">
    🎁 <strong>Bonus</strong><br />
    + {{ point }} points
  </div>
</template>

<script setup>
defineProps({
  point: {
    type: Number,
    default: 0
  }
})
</script>

<style scoped>
.bonus {
  background: #fff7a8;
  border-radius: 8px;
  padding: 10px;
  font-size: 13px;
  margin-bottom: 12px;
}
</style>
