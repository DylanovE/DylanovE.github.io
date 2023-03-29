<template>
    <label for="role">Role:</label>
    <select
        id="role"
        :value="modelValue"
        required
        @input="updateModelValue"
    >
        <option value="" disabled>Select a role</option>
        <option v-for="(value, key) in roles" :key="key" :value="key">{{ value }}</option>
    </select>
</template>

<script setup>
import {ref} from 'vue';

const props = defineProps({
    roles: {
        type: undefined,
        default: '',
    },
    modelValue: {
        type: String,
        default: '',
    },
});

const selectedRole = ref(props.modelValue);

const emit = defineEmits(['update:modelValue']);

function updateModelValue(event) {
    selectedRole.value = event.target.value;
    emit('update:modelValue', event.target.value);
}
</script>
