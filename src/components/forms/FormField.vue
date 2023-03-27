<template>
    <label :for="field">
        {{ field }}
    </label>

    <input
        :id="field"
        :type="type"
        :value="modelValue"
        required @input="$emit('update:modelValue', $event.target.value)"
    />
</template>

<script setup>
defineProps({
    field: {
        type: String,
        default: '',
    },
    type: {
        type: String,
        default: 'text',
    },
    modelValue: {
        type: String,
        default: '',
    },
});

defineEmits(['update:modelValue']);
</script>
