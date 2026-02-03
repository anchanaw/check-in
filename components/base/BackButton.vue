<template>
  <a-button
    type="text"
    shape="circle"
    class="back-btn"
    @click="goBack"
  >
    <img
      src="/icons/arrow_back.png"
      alt="back"
      class="back-icon"
    />
  </a-button>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.back-btn {
  padding: 0;
}

/* คุมขนาดไอคอน */
.back-icon {
  width: 24px;
  height: 24px;
}
</style>
