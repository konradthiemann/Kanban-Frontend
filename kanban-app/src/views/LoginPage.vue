<template>
    <div>
      <h1>Login</h1>
      <form @submit.prevent="handleSubmit">
        <input v-model="username" placeholder="Username" />
        <input v-model="password" type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
      <router-link to="/register">Create a new account</router-link>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuth } from '../composables/useAuth';
  
  const router = useRouter();
  const { login } = useAuth();
  const username = ref('');
  const password = ref('');
  
  const handleSubmit = async () => {
    // console.log("username: ", username.value);
    // console.log("password: ", password.value);
    await login(username.value, password.value);
    router.push('/main');
  };
  </script>
  