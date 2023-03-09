    <script>
    export default {
        methods: {
            yourAWizkid() {
                alert("YER A WIZKID HARRY!");
            },
        },
    };
    </script>

    <template>
        <img
        alt="Wizard Tux Logo"
        class="logo"
        src="@/assets/logo.svg"
        @click="yourAWizkid"
        width="125"
        height="125"
        />
    </template>
  
    <style scoped>
    .logo {
    display: block;
    margin: 0 2rem 0 0;
    }
    </style>