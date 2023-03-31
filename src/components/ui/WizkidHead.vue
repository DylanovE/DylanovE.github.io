<template>
    <thead>
        <tr>
            <TableHeader :data="'Name'"/>
            <TableHeader v-if="isLoggedIn" :data="'Email'"/>
            <TableHeader v-if="isLoggedIn" :data="'Phone'"/>
            <TableHeader :data="'Role'"/>
            <TableHeader :data="'Avatar'"/>
            <RoleFilter :role-map="roleMap" @filter="$emit('filter', $event)" />
        </tr>
        <tr v-if="wizkids.length === 0">
            <td colspan="7" class="text-center">No WizKids Found</td>
        </tr>
    </thead>
</template>

<script setup>
import RoleFilter from '@/components/ui/RoleFilter.vue';
import TableHeader from '@/components/ui/TableHeader.vue';

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
