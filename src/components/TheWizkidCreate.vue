<template>
  <div class="form-container">
    <form @submit.prevent="createWizkid">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="name" required>
      </div>
      <div class="form-group">
        <label for="role">Role:</label>
        <input type="number" id="role" v-model="role" required>
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <button type="submit">Create Wizkid</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      role: null,
      email: '',
    };
  },
  methods: {
    async createWizkid() {
      try {
        axios.post('http://localhost:8000/wizkids', {
          name: this.name,
          role: parseInt(this.role),
          email: this.email,
        });
        alert('Wizkid created successfully!');
      } catch (error) {
        alert('Oops! Something went wrong.');
      }
    },
  },
};
</script>

<style>
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
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
}

input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

button[type="submit"] {
  background-color: #008CBA;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #005F6B;
}
</style>
