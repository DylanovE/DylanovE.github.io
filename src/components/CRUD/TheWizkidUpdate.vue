<template>
  <div class="overlay" @click="$emit('close')">
    <div class="form-card" @click.stop>
      <form>
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
      </form>
    </div>
  </div>
</template>