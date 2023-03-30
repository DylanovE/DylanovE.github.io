<template>
    <table class="table table-striped">
        <WizkidHead :is-logged-in="isLoggedIn" :role-map="wizkidRoleMap" :wizkids="filteredWizkids" @filter="updateFilter"/>
        <WizkidBody :role-map="wizkidRoleMap" :is-logged-in="isLoggedIn" :wizkids="filteredWizkids" @edit="$emit('edit', $event)" @rerender="fetchWizkids"/>
    </table>
</template>

<script setup>
import {computed, onMounted, ref} from 'vue';
import WizkidBody from './WizkidBody.vue';
import WizkidHead from './WizkidHead.vue';
import {useApi} from '@/composables/useApi';

const isLoggedIn = localStorage.api_token;
const {api} = useApi();

const wizkids = ref([]);
const roleFilter = ref([]);
const wizkidRoleMap = {
    1: 'Boss',
    2: 'Developer',
    3: 'Designer',
    4: 'Intern',
};

const props = defineProps({
    search: {
        type: String,
        default: '',
    },
});

defineEmits('edit');

onMounted(() => {
    fetchWizkids();
});

function fetchWizkids() {
    api('get').then((data) => {
        wizkids.value = data.data;
    });
}

function updateFilter(newData) {
    const index = roleFilter.value.indexOf(newData);
    if (index === -1) {
        roleFilter.value.push(newData);
    } else {
        roleFilter.value.splice(index, 1);
    }
}

const filteredWizkids = computed(() => {
    const query = props.search;
    const roles = roleFilter.value;

    return wizkids.value.filter((wizkid) => {
        if (roles.length === 0) {
            return wizkid.name.toLowerCase().includes(query);
        } else {
            return (
                wizkid.name.toLowerCase().includes(query) &&
                roles.includes(wizkid.role.toString())
            );
        }
    });
});
</script>
