<script>
import axios from 'axios';

export default {
  data() {
    return {
      postMessage: '',
      name: '',
      role: '',
      email: '',
      roles: {
        1: 'Boss',
        2: 'Developer',
        3: 'Designer',
        10: 'Intern'
      },
      message: '',
    };
  },
  
  computed: {
    errorMessage() {
      return this.postMessage;
    },
    successMessage() {
      return this.postMessage === 'Wizkid updated.' ? 'Wizkid updated successfully!' : 'kebab?';
    },
  },

  methods: {
    async updateWizkid() {
      try {
        console.log('Attempting to updated wizkid...');
        await axios.post('http://localhost:8000/wizkids', {
          name: this.name,
          role: parseInt(this.role),
          email: this.email,
        });
        console.log('Wizkid updated successfully!');
        this.postMessage = 'Wizkid updated successfully!';
      } catch (error) {
        console.error(error.response.data.message);
        this.postMessage = error.response.data.message || 'Oops! Something went wrong.';
      }
    },
  },
};
</script>

<template>
  <div class="form-container">
    <form @submit.prevent="updateWizkid">
      <div class="message" :class="{ 'text-success': postMessage === 'Wizkid updated successfully!', 'text-danger': postMessage !== 'Wizkid updated successfully!' }">{{ postMessage }}</div>
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="name" required>
      </div>
      <div class="form-group">
        <label for="role">Role:</label>
        <select id="role" v-model="role" required>
          <option value="">Select a role</option>
          <option :value="key" v-for="(value, key) in roles" :key="key">{{ value }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <button type="submit" class="blue">Update Wizkid</button>
      <RouterLink :to="{ name: 'wizkids-read' }"><button type="button" class="red">Cancel</button></RouterLink>
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