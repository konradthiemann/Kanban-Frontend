<template>
  <VContainer
    style="padding: 0;"
  >
    <VCard
      style="min-width: 300px;"
    >
      <VCardTitle class="headline">Register</VCardTitle>
      <VCardText>
        <VForm @submit.prevent="handleRegister">
          <VTextField
            v-model="username"
            label="Username"
            class="pb-2"
            :error="!!errorResponse?.username"
            :error-messages="errorResponse?.username?.[0]"
            required
          ></VTextField>
          <VTextField
            v-model="email"
            label="Email"
            class="pb-2"
            :error="!!errorResponse?.email"
            :error-messages="errorResponse?.email?.[0]"
            required
          ></VTextField>
          <VTextField
            v-model="first_name"
            label="First Name"
            class="pb-2"
            :error="!!errorResponse?.first_name"
            :error-messages="errorResponse?.first_name?.[0]"
            required
          />
          <VTextField
            v-model="last_name"
            label="Last Name"
            class="pb-2"
            :error="!!errorResponse?.last_name"
            :error-messages="errorResponse?.last_name?.[0]"
            required
          />
          <VTextField
            v-model="password"
            label="Password"
            type="password"
            class="pb-2"
            :error="!!errorResponse?.password"
            :error-messages="errorResponse?.password?.[0]"
            required
          ></VTextField>
          <VTextField
            v-model="confirm_password"
            label="Confirm Password"
            type="password"
            class="pb-2"
            :error="!!errorResponse?.confirmPassword"
            :error-messages="errorResponse?.confirmPassword?.[0]"
            required
          ></VTextField>
          <VBtn type="submit" color="primary" class="mt-3">Register</VBtn>
        </VForm>
      </VCardText>
    </VCard>
  </VContainer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { register } = useAuth()

const username = ref('');
const first_name = ref('')
const last_name = ref('')
const email = ref('');
const password = ref('');
const confirm_password = ref('');
const errorResponse = ref<any>();

const handleRegister = async () => {
  try {
    const response = await register({
      username: username.value,
      email: email.value,
      first_name: first_name.value,
      last_name: last_name.value,
      password: password.value,
      confirm_password: confirm_password.value,
    });
    console.log('response',response)
    if (!response) return
    router.push('/')
  } catch (error: any) {
    console.log('i got an error',error)
    errorResponse.value = error.response.data;

  }
};
</script>

<style scoped>
.headline {
  font-size: 1.5em;
  font-weight: bold;
}
.mt-3 {
  margin-top: 1rem;
}
</style>