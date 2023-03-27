<template>
    <table class="table table-striped">
        <thead>
            <tr>
                <th>Name</th>
                <th v-if="isLoggedIn">Email</th>
                <th v-if="isLoggedIn">Phone</th>
                <th>Role</th>
                <th>Avatar</th>
                <td>
                    <RoleFilter :role-map="wizkidRoleMap" @filter="updateFilter" />
                </td>
            </tr>
            <tr v-if="filteredWizkids.length == 0">
                <td colspan="7" class="text-center">No WizKids Found</td>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="filteredWizkid in filteredWizkids"
                :key="filteredWizkid.id"
                :data-id="filteredWizkid.id"
            >
                <td>{{ filteredWizkid.name }}</td>
                <td v-if="isLoggedIn">{{ filteredWizkid.email }}</td>
                <td v-if="isLoggedIn">{{ filteredWizkid.phoneNumber }}</td>
                <td>{{ wizkidRoleMap[filteredWizkid.role] }}</td>
                <td><img :src="filteredWizkid.profilePicture?.thumbSm" alt="None" /></td>
                <td>
                    <div v-if="isLoggedIn" class="dropdown">
                        <IconOptions />
                        <div class="dropdown-menu p-3" aria-labelledby="dropdownFunctionsSvg">
                            <IconEdit @edit="$emit('edit', filteredWizkid)" />
                            <IconDelete :wizkid="filteredWizkid.id" @rerender="fetchWizkids" />
                        </div>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
import {computed, onMounted, ref} from 'vue';
import IconDelete from '@/components/icons/IconDelete.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import IconOptions from '@/components/icons/IconOptions.vue';
import RoleFilter from '@/components/ui/RoleFilter.vue';
import {useCrudApi} from '@/composables/useCrudApi';

const isLoggedIn = sessionStorage.length > 0;
const {CRUD} = useCrudApi();

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
    CRUD('get').then((data) => {
        wizkids.value = data;
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

    // if no roles to filter on, only filter on query.
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
