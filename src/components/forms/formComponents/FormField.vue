<template>
    <label :for="field">{{ field }}</label>
    <input
        :id="field"
        :type="type"
        :value="modelValue"
        :pattern="pattern"
        required
        @input="updateModelValue"
    />
</template>
<script setup>
defineProps({
    field: {type: String, default: 'undefined'},
    type: {type: String, default: 'text'},
    modelValue: {type: String, default: ''},
    pattern: {type: String, default: '.*'},
});

const emit = defineEmits(['update:modelValue']);

function updateModelValue(event) {
    emit('update:modelValue', event.target.value);
}
</script>
