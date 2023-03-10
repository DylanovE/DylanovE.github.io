<template>
  <div>
    <button @click="createWizkid">Create Wizkid</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  methods: {
    async createWizkid() {
      try {
        const response = await axios.post('http://localhost:8000/wizkids', {
          name: 'derp',
          role: 2,
          email: 'derp@gmail.com',
        });
        console.log(response.data);
        // Do something with the response, such as redirect to the new wizkid's page
      } catch (error) {
        console.error(error);
        // Handle error
      }
    },
  },
};
</script>