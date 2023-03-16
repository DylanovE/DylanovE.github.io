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
        width="125"
        height="125"
        @click="yourAWizkid"
        />
    </template>