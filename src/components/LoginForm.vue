<template>
    <div class="container">
      <div class="row">
        <div class="col-md-4 offset-md-4">
          <h1 class="text-center">Login</h1>
          <form @submit.prevent="login">
            <div class="form-group">
              <label for="username">Username</label>
              <input id="username" v-model="username" type="text" class="form-control" required>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input id="password" v-model="password" type="password" class="form-control"  required>
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
import { ref } from 'vue';

const username = ref('');
const password = ref('');

const login = async () => {
  try {
    const response = await fetch('http://localhost:8000/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value
      })
    });

    const data = await response.json();

    if (response.ok) {
      // login successful, redirect to dashboard
      window.location.href = '/dashboard';
    } else {
      // login failed, display error message
      alert(data.message);
    }
  } catch (error) {
    console.error(error);
    alert('An error occurred while logging in. Please try again later.');
  }
};
</script>
