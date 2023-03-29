<template>
    <button :type="type" class="blue">{{ label }}</button>
</template>

<script setup>
defineProps({
    label: {
        type: String,
        default: 'undefined',
    },
    type: {
        type: String,
        default: 'submit',
    },
});
</script>
