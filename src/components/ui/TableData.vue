<template>
    <td v-if="type === 'text'">
        {{ data }}
    </td>
    <td v-else>
        <img :src="data" />
    </td>
</template>

<script setup>
defineProps({
    data: {
        type: String,
        default: '',
    },
    type: {
        type: String,
        default: 'text',
    },
});
</script>

