<template>
    <label :for="field"
    >{{ field }}
        <img
            v-if="modelValue"
            :src="modelValue?.thumbSm || modelValue"
            width="32"
            height="32"
            class="ms-2 mb-1"
        />
    </label>
    <input :id="field" accept="image/*" type="file" @change="onFileChange" />
</template>

<script setup>
const emit = defineEmits(['update:modelValue']);
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
        type: undefined,
        default: '',
    },
});

const onFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
        const dataUrl = event.target.result;
        emit('update:modelValue', dataUrl);
    };

    reader.readAsDataURL(file);
};
</script>
