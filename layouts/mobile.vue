<template>
  <div class="mobile-wrapper">
    <slot />
  </div>
</template>

<style>
.mobile-wrapper {
  min-height: 100dvh;
  background: #6CBCFA;

  display: flex;
  flex-direction: column;      /* สำคัญ */
  align-items: center;         /* จัดกลางแนวนอน */
  
  padding: 32px 16px 0;     /* safe area มือถือ */
}
</style>
