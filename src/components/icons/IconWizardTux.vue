<script>
export default {
    methods: {
        yourAWizkid() {
            alert('YER A WIZKID HARRY!');
        },
    },
};
</script>

<template>
    <img
        alt="Wizard Tux Logo"
        src="@/assets/logo.svg"
        width="125"
        height="125"
        @click="yourAWizkid"
    />
</template>

<style scoped>
img {
  display: block;
  margin: 0 2rem 0 0;
  float: left;
}

@media (max-width: 1024px) {
  img {
    position: absolute;
  }
}

@media (max-width: 625px) {
  img {
    position: relative;
  }
}
</style>
