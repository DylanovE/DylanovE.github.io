<template>
    <h1 class="text-center">
        Login
    </h1>

    <form @submit.prevent="login">
        <FormField
            v-model="email"
            :field="'Email'"
            :type="'email'"
        />

        <FormField
            v-model="password"
            :field="'Password'"
            :type="'password'"
        />

        <FormButton
            :label="'Login'"
            class="blue"
        />
    </form>
</template>

<script setup>
import FormButton from '@/components/forms/FormButton.vue';
import FormField from '@/components/forms/FormField.vue';
import axios from 'axios';
import {ref} from 'vue';
import {usePopupNotification} from '@/composables/usePopupNotification';

const apiUrl = 'http://localhost:8000/auth/login';
const {showMessage} = usePopupNotification();

if (sessionStorage.apiToken) {
    location.replace('/');
}

const email = ref('');
const password = ref('');

const login = async() => {
    try {
        const user = {email: email.value, password: password.value};
        const response = await axios.post(apiUrl, user);

        sessionStorage.apiToken = response.data.apiToken;
        showMessage('Login successful!', 'success');
        location.replace('/');
    } catch (error) {
        const message = error.response?.data?.message || 'Something went wrong! Please try again later or contact support.';
        showMessage(message, 0);
    }
};
</script>
