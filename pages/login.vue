<template>
  <!-- โลโก้บนพื้นฟ้า -->
  <div class="logo">
    <img src="/logo.png" alt="A-VALUE" class="logo-img" />
  </div>

  <!-- Card เฉพาะฟอร์ม -->
  <BaseCard maxWidth="320px">
    <a-form layout="vertical" @finish="onSubmit">
      <a-form-item
        label="Username"
        name="username"
        :rules="[{ required: true, message: 'Please enter username' }]"
      >
        <a-input />
      </a-form-item>

      <a-form-item
        label="Password"
        name="password"
        :rules="[{ required: true, message: 'Please enter password' }]"
      >
        <a-input-password />
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit" block>
          Sign In
        </a-button>
      </a-form-item>
    </a-form>

    <p class="footer">
      Don’t have an account?
      <NuxtLink to="/register">Register</NuxtLink>
    </p>
  </BaseCard>
</template>

<script setup>
definePageMeta({
  layout: 'mobile'
})

const onSubmit = (values) => {
  console.log('login values:', values)
}
</script>

<style scoped>
.logo {
  display: flex;
  justify-content: center;
  margin-top: 113px;
  margin-bottom: 90px;
}

.logo-img {
  height: 48px;
  max-width: auto;
  object-fit: contain;
}

.footer {
  text-align: center;
  font-size: 14px;
  margin-top: 16px;
}

.footer a {
  color: #6CBCFA;
  text-decoration: underline;
}
</style>
