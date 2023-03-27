<template>
    <button :type="type" class="blue">{{ label }}</button>
</template>

<script setup>
defineEmits(['update:modelValue']);

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
