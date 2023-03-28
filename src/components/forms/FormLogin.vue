<template>
    <h1 class="text-center">Login</h1>
    <form @submit.prevent="attemptLogin">
        <FormField v-model="email" :field="'Email'" :type="'email'" />
        <FormField v-model="password" :field="'Password'" :type="'password'" />
        <FormButton :label="'Login'" class="blue" />
    </form>
</template>

<script setup>
import FormButton from '@/components/forms/formComponents/FormButton.vue';
import FormField from '@/components/forms/formComponents/FormField.vue';
import {ref} from 'vue';
import {useApi} from '@/composables/useApi';
import {usePopupNotification} from '@/composables/usePopupNotification';

const {showMessage} = usePopupNotification();
const {login} = useApi();

const email = ref('');
const password = ref('');

const attemptLogin = async() => {
    const wizkid = {
        email: email.value,
        password: password.value,
    };

    const response = await login(wizkid);
    try {
        sessionStorage.apiToken = response.data.apiToken;
        showMessage('successfully logged in.', 'success');
    } catch (error) {
        showMessage(response.response.data.message);
    }
};
</script>
