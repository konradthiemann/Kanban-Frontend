<template>
    <div>
      <h1>Register</h1>
      <form 
        @submit.prevent="handleSubmit"
        class="register-form"
        >
        <input v-model="username" placeholder="Username" />
        <input v-model="firstName" placeholder="First Name" />
        <input v-model="lastName" placeholder="Last Name" />
        <input v-model="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Password" />
        <button type="submit">Register</button>
      </form>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuth } from '../composables/useAuth';
  
  const router = useRouter();
  const { register } = useAuth();
  const username = ref('');
  const firstName = ref('');
  const lastName = ref('');
  const email = ref('');
  const password = ref('');
  
  const handleSubmit = async () => {
    const response = await register({ 
      username: username.value,
      first_name: firstName.value,
      last_name: lastName.value,
      email: email.value,
      password: password.value
    });
    console.log(response);
    if (!response) return; 
    router.push('/');
  };
  </script>
  
  <style scoped>
  .register-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  </style>
  ```