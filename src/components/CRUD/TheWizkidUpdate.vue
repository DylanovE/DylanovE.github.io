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
  <div class="update-container">
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