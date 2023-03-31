<template>
    <tbody>
        <tr v-for="wizkid in wizkids" :key="wizkid.id" :data-id="wizkid.id">
            <TableData :data="wizkid.name"/>
            <TableData v-if="isLoggedIn" :data="wizkid.email"/>
            <TableData v-if="isLoggedIn" :data="wizkid.phoneNumber"/>
            <TableData :data="roleMap[wizkid.role]"/>
            <TableData :type="'image'" :data="wizkid.profilePicture?.thumbSm"/>
            <TableFunctions :wizkid="wizkid" :is-logged-in="isLoggedIn" @edit="$emit('edit', wizkid)" @rerender="$emit('rerender')"/>
        </tr>
    </tbody>
</template>

<script setup>
import TableData from '@/components/ui/TableData.vue';
import TableFunctions from '@/components/ui/TableFunctions.vue';


defineEmits(['edit', 'rerender']);

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
