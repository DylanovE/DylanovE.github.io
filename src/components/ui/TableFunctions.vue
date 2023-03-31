
<template>
    <td>
        <!--make functions component-->
        <div v-if="isLoggedIn" class="dropdown">
            <IconOptions />
            <div class="dropdown-menu p-3" aria-labelledby="dropdownFunctionsSvg">
                <IconEdit @edit="$emit('edit')" />
                <IconDelete :wizkid="wizkid" @rerender="$emit('rerender')" />
            </div>
        </div>
    </td>
</template>

<script setup>
import IconDelete from '@/components/icons/IconDelete.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import IconOptions from '@/components/icons/IconOptions.vue';

defineEmits(['rerender', 'edit']);

defineProps({
    wizkid: {
        type: Object,
        default: undefined,
    },
    isLoggedIn: {
        type: String,
        default: '',
    },
});
</script>
