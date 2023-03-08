<script setup>
defineProps({
  "title": {
    type: String,
    required: true
  },
  "msg": {
    type: String,
    required: true
  },
})

</script>

<template>
  <div>
    <h1 class="blue fs-2 fw-semibold mt-5">Welcome Wizkid!</h1>

    <h3 class="lead">
      You’ve arrived at a <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue</a> + <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> project!
    </h3>
  </div>
</template>
