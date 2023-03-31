<template>
    <th scope="col">
        {{ data }}
    </th>
</template>

<script setup>
defineProps({
    data: {
        type: String,
        default: '',
    },
});
</script>
