<template>
    <tbody>
        <tr v-for="wizkid in wizkids" :key="wizkid.id" :data-id="wizkid.id">
            <td>{{ wizkid.name }}</td>
            <td v-if="isLoggedIn">{{ wizkid.email }}</td>
            <td v-if="isLoggedIn">{{ wizkid.phoneNumber }}</td>
            <td>{{ roleMap[wizkid.role] }}</td>
            <td><img :src="wizkid.profilePicture?.thumbSm" alt="None" /></td>
            <td>
                <!--make functions component-->
                <div v-if="isLoggedIn" class="dropdown">
                    <IconOptions />
                    <div class="dropdown-menu p-3" aria-labelledby="dropdownFunctionsSvg">
                        <IconEdit @edit="$emit('edit', wizkid)" />
                        <IconDelete :wizkid="wizkid" @rerender="$emit('rerender')" />
                    </div>
                </div>
            </td>
        </tr>
    </tbody>
</template>

<script setup>
import IconDelete from '@/components/icons/IconDelete.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import IconOptions from '@/components/icons/IconOptions.vue';


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
