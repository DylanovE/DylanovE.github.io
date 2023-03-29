<template>
    <div class="overlay pointer" @click="$emit('close')">
        <div class="form-card" @click.stop>
            <form @submit.prevent="submitForm">
                <FormFieldFileUpload
                    v-model="state.profilePicture"
                    :field="'Profile Picture:'"
                    :type="'file'"
                />
                <FormField v-model="state.name" :field="'Name'" :type="'text'" />
                <FormFieldRoles v-model="state.role" :roles="state.roles" />
                <template v-if="isLoggedIn">
                    <FormField v-model="state.email" :field="'Email'" :type="'email'" />
                    <FormField v-model="state.phoneNumber" :field="'Phone Number:'" :type="'tel'" />
                </template>
                <FormButton :label="type" class="blue" />
            </form>
        </div>
    </div>
</template>

<script setup>
import {reactive, watch} from 'vue';
import FormButton from '@/components/forms/formComponents//FormButton.vue';
import FormField from '@/components/forms/formComponents/FormField.vue';
import FormFieldFileUpload from '@/components/forms/formComponents/FormFieldFileUpload.vue';
import FormFieldRoles from '@/components/forms/formComponents/FormFieldRoles.vue';
import {useApi} from '@/composables/useApi';
import {usePopupNotification} from '@/composables/usePopupNotification';

const isLoggedIn = sessionStorage.length > 0;
const props = defineProps({
    wizkidData: {
        type: null,
        default: undefined,
    },
    type: {
        type: String,
        default: '',
    },
});

const emit = defineEmits(['close', 'refresh']);
const {api} = useApi();
const {showMessage} = usePopupNotification();

const state = reactive({
    name: props.wizkidData.name,
    profilePicture: props.wizkidData.profilePicture,
    role: props.wizkidData.role,
    email: props.wizkidData.email,
    phoneNumber: props.wizkidData.phoneNumber,
    roles: {
        1: 'Boss',
        2: 'Developer',
        3: 'Designer',
        4: 'Intern',
    },
});

watch(() => props.wizkidData.name, (newValue) => state.name = newValue);


function submitForm() {
    const form = document.querySelector('form');
    if (form.checkValidity()) {
        props.type === 'create' ? createWizkid() : updateWizkid();
    } else {
        form.reportValidity();
    }
}

// make this a composable?
async function createWizkid() {
    const wizkid = {
        name: state.name,
        role: parseInt(state.role),
        email: state.email,
        phoneNumber: state.phoneNumber,
        profilePicture: state.profilePicture,
    };

    const response = await api('post', wizkid);

    try {
        if (response.name == 'AxiosError') {
            throw response.response.data.message;
        }
        showMessage('successfully created wizkid.', 'success');
        emit('refresh', 'close');
    } catch (error) {
        showMessage(error);
    }
}

// make this a composable?
async function updateWizkid() {
    const wizkid = {
        name: state.name,
        role: parseInt(state.role),
        email: state.email,
        phoneNumber: state.phoneNumber,
        profilePicture: state.profilePicture,
    };

    console.log('hi');
    console.log(wizkid);
    const response = await api('put', wizkid);

    try {
        if (response.name == 'AxiosError') {
            throw response.response.data.message;
        }
        showMessage('successfully created wizkid.', 'success');
        emit('refresh', 'close');
    } catch (error) {
        showMessage(error);
    }
}
</script>
