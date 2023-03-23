<template>
  <header>

    <WizardTuxLogo/>

    <div class="wrapper">
      <TheHelloWorld/>

      <nav class="align-items-center">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/wizkids-manager">Wizkids manager</RouterLink>
        <RouterLink v-if="isLoggedIn" to="" @click="logout()">logout</RouterLink>
        <RouterLink v-if="!isLoggedIn" to="/login">login</RouterLink>
        
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import TheHelloWorld from '@/components/TheHelloWorld.vue'
import WizardTuxLogo from '@/components/WizardTuxLogo.vue'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

const isLoggedIn = !!sessionStorage.apiToken

function logout() {
  sessionStorage.clear()
  location.reload();
}
</script>

<style scoped>
.dropdown-menu.show {
  background-color: var(--color-background-mute);
  min-width: 0;
}

.dropdown-menu li {
  margin: 0 0 0.5rem 0;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;

}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
