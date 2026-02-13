<script setup lang="ts">
import { useAuthStore } from '~/stores/auth.store'
import { navigateTo } from '#app'

const authStore = useAuthStore()

if (!authStore.access_token) {
  navigateTo('/login')
} else {
  if (authStore.role === 'manager') navigateTo('/manager')
  if (authStore.role === 'mentor') navigateTo('/mentor')
  if (authStore.role === 'intern') navigateTo('/intern')
}
</script>
