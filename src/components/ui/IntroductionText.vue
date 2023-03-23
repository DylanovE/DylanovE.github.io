<template>
  <div>
    <h1 class="blue fs-2 fw-semibold mt-5">Welcome Wizkid!</h1>

    <h3 class="lead">
      You’ve arrived at a <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue</a> + <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> project!
    </h3>
  </div>
</template>

<style scoped>
@media (max-width: 420px) {
  h3 {
    visibility: hidden;
    display: none;
  }

  div {
    text-align: center;
  }
  
  h1 {
    padding-top: 10%;
  }
}

@media (max-width: 1024px) {
  div {
    text-align: center;
  }
}

</style>
