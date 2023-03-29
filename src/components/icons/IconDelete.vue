<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        width="24"
        height="24"
        class="inline-block"
        role="presentation"
        @click="deleteWizkid()"
    >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
    </svg>
</template>
<script setup>
import {useApi} from '@/composables/useApi';
import {usePopupNotification} from '@/composables/usePopupNotification';

const emit = defineEmits(['rerender']);

const {showMessage} = usePopupNotification();
const {api} = useApi();
const props = defineProps({
    wizkid: {
        type: null,
        default: undefined,
    },
});

// delete a wizkid
async function deleteWizkid() {
    const response = await api('delete', props.wizkid);

    try {
        if (response.name == 'AxiosError') {
            throw response.response.data.message;
        }
        showMessage('successfully deleted wizkid.', 'success');
        emit('rerender');
    } catch (error) {
        showMessage(error);
    }
}
</script>
