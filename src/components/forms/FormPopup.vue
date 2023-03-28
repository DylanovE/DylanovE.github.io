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
                    <FormField v-model="state.phoneNumber" :field="'Phone Number:'" :type="'tel'" :pattern="'[0-9]{3}-[0-9]{2}-[0-9]{3}'"/>
                </template>
                <FormButton :label="type" class="blue" />
            </form>
        </div>
    </div>
</template>

<!--think of a way to make the script shorter than this-->
<script setup>
import FormButton from '@/components/forms/formComponents//FormButton.vue';
import FormField from '@/components/forms/formComponents/FormField.vue';
import FormFieldFileUpload from '@/components/forms/formComponents/FormFieldFileUpload.vue';
import FormFieldRoles from '@/components/forms/formComponents/FormFieldRoles.vue';
import {reactive} from 'vue';
import {useApi} from '@/composables/useApi';

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

const emit = defineEmits(['close']);

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

const {api} = useApi();

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

    await api('post', wizkid).then((data) => {
        if (data === 'error') {
            return ;
        } else {
            emit('close');
        }
    });
}

// make this a composable?
async function updateWizkid() {
    const wizkid = {
        name: state.name,
        role: parseInt(state.role),
    };

    await api('update', props.wizkidData.id, wizkid).then((data) => {
        if (data === 'error') {
            console.log('something went wrong while updating the wizkid.');
        } else {
            emit('close');
        }
    });
}
</script>
