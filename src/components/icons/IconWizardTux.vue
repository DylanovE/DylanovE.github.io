<template>
    <img
        alt="Wizard Tux Logo"
        src="@/assets/logo.svg"
        width="125"
        height="125"
        @click="yourAWizkid"
    />
</template>

<script>
export default {
    methods: {
        yourAWizkid() {
            alert('YER A WIZKID HARRY!');
        },
    },
};
</script>
