<template>
    <div class="success-wrapper">
        <ClientOnly>
            <div ref="anim" class="lottie" />
        </ClientOnly>

        <h1>{{ title }}</h1>

        <button class="btn" @click="$emit('action')">
            {{ buttonText }}
        </button>
    </div>
</template>

<script setup>
import lottie from 'lottie-web'
import { onMounted, ref } from 'vue'
import successAnim from '@/assets/lottie/success.json'

const anim = ref(null)

defineProps({
    title: { type: String, default: 'Successful!' },
    buttonText: { type: String, default: 'Continue' }
})

onMounted(async () => {
  await nextTick()
  if (!anim.value) return

  lottie.loadAnimation({
    container: anim.value,
    renderer: 'svg',
    loop: false,
    autoplay: true,
    animationData: successAnim
  })
})
</script>

<style scoped>
.success-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.lottie {
    width: 200px;
    height: 200px;
    margin-bottom: 16px;
}

.btn {
    min-width: 220px;
    background: #2F2F2F;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 12px 16px;
}
</style>
