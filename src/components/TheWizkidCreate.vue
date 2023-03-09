<template>
  <form @submit.prevent="submitForm">
    <label>
      Name:
      <input v-model="name" type="text" required>
    </label>
    <br>
    <label>
      Role:
      <select v-model="role" required>
        <option value="">Select a role</option>
        <option v-for="roleOption in roleOptions" :key="roleOption.value" :value="roleOption.value">
          {{ roleOption.label }}
        </option>
      </select>
    </label>
    <br>
    <label>
      Email:
      <input v-model="email" type="email" required>
    </label>
    <br>
    <label>
      Phone number:
      <input v-model="phoneNumber" type="text">
    </label>
    <br>
    <label>
      Profile picture (Base64-encoded):
      <input v-model="profilePicture" type="text">
    </label>
    <br>
    <button type="submit">Create Wizkid</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'

export default {
  setup() {
    const name = ref('')
    const role = ref('')
    const email = ref('')
    const phoneNumber = ref('')
    const profilePicture = ref('')
    const roleOptions = [
      { value: '1', label: 'Admin' },
      { value: '2', label: 'Editor' },
      { value: '3', label: 'User' },
    ]

    const submitForm = async () => {
      try {
        const response = await axios.post('localhost:8000/wizkids', {
          name: name.value,
          role: role.value,
          email: email.value,
          phone_number: phoneNumber.value,
          profile_picture: profilePicture.value,
        })
        console.log('Wizkid created:', response.data)
        // reset form fields on successful submission
        name.value = ''
        role.value = ''
        email.value = ''
        phoneNumber.value = ''
        profilePicture.value = ''
      } catch (error) {
        console.error('Error creating wizkid:', error)
      }
    }

    return {
      name,
      role,
      email,
      phoneNumber,
      profilePicture,
      roleOptions,
      submitForm,
    }
  },
}
</script>
