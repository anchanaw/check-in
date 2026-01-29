<template>
  <SuccessState
    title="Successful!"
    buttonText="Continue to Login"
    @action="goLogin"
  />
</template>

<script setup>
definePageMeta({ layout: 'mobile' })

const router = useRouter()
const goLogin = () => {
  router.push('/login')
}
</script>
