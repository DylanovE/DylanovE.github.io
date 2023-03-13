<script setup>
import { reactive, computed } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const state = reactive({
  postMessage: '',
  name: '',
  role: '',
  email: '',
  roles: {
    1: 'Boss',
    2: 'Developer',
    3: 'Designer',
    4: 'Intern'
  },
});

const router = useRouter();

const errorMessage = computed(() => {
  return state.postMessage && state.postMessage !== 'Wizkid created.' ? state.postMessage : '';
});

const successMessage = computed(() => {
  return state.postMessage === 'Wizkid created.' ? 'Wizkid created successfully!' : '';
});

const createWizkid = async () => {
  try {
    await axios.post('http://localhost:8000/wizkids', {
      name: state.name,
      role: parseInt(state.role),
      email: state.email,
    });
    state.postMessage = 'Wizkid created.';
    setTimeout(() => {
      state.postMessage = '';
      router.push({ name: 'wizkids-read' });
    }, 1500);
  } catch (error) {
    console.error(error.response.data.message);
    state.postMessage = error.response.data.message || 'Oops! Something went wrong.';
  }
};
</script>

<template>
  <div class="form-container">
    <form @submit.prevent="createWizkid">
      <div class="message" :class="{ 'text-success': successMessage, 'text-danger': errorMessage }">{{ errorMessage || successMessage }}</div>
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="state.name" required>
      </div>
      <div class="form-group">
        <label for="role">Role:</label>
        <select id="role" v-model="state.role" required>
          <option value="">Select a role</option>
          <option :value="key" v-for="(value, key) in state.roles" :key="key">{{ value }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="state.email" required>
      </div>
      <div>
        <router-link :to="{ name: 'wizkids-read' }"><button type="button" class="red float-end">Cancel</button></router-link>
        <button type="submit" class="blue float-start">Create wizkid</button>
        <button type="submit" class="blue float-start">Create &#38; another wizkid</button>
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