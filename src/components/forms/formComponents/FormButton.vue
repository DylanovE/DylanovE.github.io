<template>
    <button :type="type" class="blue">{{ label }}</button>
</template>

<script setup>
defineProps({
    label: {
        type: String,
        default: '',
    },
    type: {
        type: String,
        default: 'submit',
    },
});
</script>
