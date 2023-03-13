<script setup>
  import axios from 'axios';
  import {ref } from 'vue'  
  import { useRoute } from 'vue-router'

  const route = useRoute()

  const roles = {
    1: 'Boss',
    2: 'Developer',
    3: 'Designer',
    4: 'Intern'
  }

  const name = ref(route.query.name)
  const role = ref(route.query.role)
  const email = ref('') // Set the email to an empty string since it is not being passed in

  const postMessage = ref('')


  async function updateWizkid() {
  try {
    await axios.put(`http://localhost:8000/wizkids/${Number(route.params.wizkidId)}`, {
      name: name.value,
      role: Number(role.value)
    })
    postMessage.value = 'Wizkid updated successfully!'
    setTimeout(() => {
      this.postMessage = '';
      route.push({ name: 'wizkids-read' });
    }, 1500);
  } catch (error) {
      console.error(error.response.data.message);
      this.postMessage = error.response.data.message || 'Oops! Something went wrong.';
  }
}

</script>

<template>
  <div class="form-container">
    <form @submit.prevent="updateWizkid">
      <div class="message" :class="{ 'text-success': postMessage === 'Wizkid updated successfully!', 'text-danger': postMessage !== 'Wizkid updated successfully!' }">{{ postMessage }}</div>
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="name">
      </div>
      <div class="form-group">
        <label for="role">Role:</label>
        <select id="role" v-model="role">
          <option value="" disabled>Select a role</option>
          <option :value="key" v-for="(value, key) in roles" :key="key">{{ value }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" disabled>
      </div>
      <div>
        <button type="submit" class="blue">Update Wizkid</button>
        <router-link :to="{ name: 'wizkids-read' }"><button type="button" class="red float-end">Cancel</button></router-link>
      </div>

    </form>
  </div>
</template>

<style scoped>
.message {
  font-size: 0.76rem;
  align-self: center;
}

.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  background-color: var(--vt-c-black-soft);
  border: 1px solid var(--color-border);
  border-radius: 5px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
}

input,
select {
  background-color: var(--vt-c-black);
  color: var(--vt-c-text-dark-2);
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 5px;
  font-size: 1rem;
}

button {
  background-color: rgba(0, 0, 0, 0);
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}

button:hover {
  color: rgb(0, 38, 255);
}
</style>