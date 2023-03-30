<template>
    <header>
        <div class="wrapper">
            <WizardTuxLogo />

            <HelloWorld />

            <nav class="align-items-center">
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/wizkid-manager">Wizkid manager</RouterLink>
                <RouterLink v-if="api_token" to="" @click="logout()">logout</RouterLink>
                <RouterLink v-if="!api_token" to="/login">login</RouterLink>
            </nav>
        </div>
    </header>

    <RouterView @refresh="refreshToken()" />
</template>

<script setup>
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {RouterLink, RouterView} from 'vue-router';
import HelloWorld from '@/components/ui/IntroductionText.vue';
import WizardTuxLogo from '@/components/icons/IconWizardTux.vue';
import {ref} from 'vue';

const api_token = ref(localStorage.api_token);

function logout() {
    localStorage.clear();
    refreshToken();
}

function refreshToken() {
    api_token.value = localStorage.api_token;
}
</script>
