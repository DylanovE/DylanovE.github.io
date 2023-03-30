<template>
    <thead>
        <tr>
            <th>Name</th>
            <th v-if="isLoggedIn">Email</th>
            <th v-if="isLoggedIn">Phone</th>
            <th>Role</th>
            <th>Avatar</th>
            <td>
                <RoleFilter :role-map="roleMap" @filter="$emit('filter', $event)" />
            </td>
        </tr>
        <tr v-if="wizkids.length == 0">
            <td colspan="7" class="text-center">No WizKids Found</td>
        </tr>
    </thead>
</template>

<script setup>
import RoleFilter from '@/components/ui/RoleFilter.vue';

defineEmits(['filter']);

defineProps({
    wizkids: {
        type: Object,
        default: undefined,
    },
    isLoggedIn: {
        type: String,
        default: '',
    },
    roleMap: {
        type: Object,
        default: undefined,
    },
});
</script>
