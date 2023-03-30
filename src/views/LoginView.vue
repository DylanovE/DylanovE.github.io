<template>
    <main class="wizkids login-form mt-4">
        <FormLogin @refresh="refreshToken()" />
    </main>
</template>

<script setup>
import FormLogin from '@/components/forms/FormLogin.vue';

const emit = defineEmits('refresh');

function refreshToken() {
    emit('refresh');
}
</script>
