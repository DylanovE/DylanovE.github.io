<template>
    <label for="role">Role:</label>
    <select
        id="role"
        :value="modelValue"
        required
        @input="$emit('update:modelValue', $event.target.value)"
    >
        <option value="" disabled>Select a role</option>
        <option v-for="(value, key) in roles" :key="key" :value="key">{{ value }}</option>
    </select>
</template>

<script setup>
defineEmits(['update:modelValue']);

defineProps({
    roles: {
        type: undefined,
        default: '',
    },
    modelValue: {
        type: String,
        default: '',
    },
});
</script>
