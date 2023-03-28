<template>
    <h1 class="text-center">Login</h1>
    <form @submit.prevent="attemptLogin">
        <form-field v-model="email" :field="'Email'" :type="'email'" :pattern="'[^@\s]+@[^@\s]+\.[^@\s]+'" />
        <form-field v-model="password" :field="'Password'" :type="'password'" :pattern="'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,*}$'" />
        <form-button :label="'Login'" class="blue" />
    </form>
</template>

<script setup>
import FormButton from '@/components/forms/formComponents/FormButton.vue';
import FormField from '@/components/forms/formComponents/FormField.vue';
import {ref} from 'vue';
import router from '@/router';
import {useApi} from '@/composables/useApi';
import {usePopupNotification} from '@/composables/usePopupNotification';

const {showMessage} = usePopupNotification();
const {login} = useApi();

const emit = defineEmits(['refresh']);
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
        emit('refresh');
        router.push({name: 'home'});
    } catch (error) {
        showMessage(response.response.data.message);
    }
};


if (sessionStorage.apiToken) {
    router.push({name: 'home'});
}
</script>
