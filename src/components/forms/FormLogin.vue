<template>
    <h1 class="text-center">Login</h1>
    <form @submit.prevent="attemptLogin">
        <form-field v-model="email" :field="'Email'" />
        <form-field v-model="password" :field="'Password'" :type="'password'" />
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
        if (response.name == 'AxiosError') {
            throw response.response.data.message;
        }

        localStorage.api_token = response.data.apiToken;
        showMessage('successfully logged in.', 'success');
        emit('refresh');
        router.push({name: 'home'});
    } catch (error) {
        showMessage(response.response.data.message);
    }
};

if (localStorage.api_token) {
    router.push({name: 'home'});
}
</script>
