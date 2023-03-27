<template>
    <div class="wizkids login-form mt-4">
      <h1 class="text-center">Login</h1>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">email</label>
          <input id="email" v-model="email" type="email" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input id="password" v-model="password" type="password" class="form-control"  required>
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
    </div>
</template>
  
<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { usePopupNotification } from '@/composables/usePopupNotification';
  
  if (sessionStorage.apiToken) {
        location.replace('/');
      }

  const { showMessage } = usePopupNotification();

  const apiUrl = 'http://localhost:8000/auth/login';  

  const email = ref('')
  const password = ref('')

  const login = async () => {
      try {
        const user = { email: email.value, password: password.value };

        const response = await axios.post(apiUrl, user);
        console.log(response)
        showMessage('login successful!', 'success');
        sessionStorage.apiToken = response.data.apiToken
        location.replace('/');
      } catch (error) {
        showMessage(error.response.data.message, 0);
      }
  };
</script>
