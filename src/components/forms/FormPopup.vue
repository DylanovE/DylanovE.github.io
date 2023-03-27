<template>
    <div class="overlay pointer" @click="$emit('close')">
        <div class="form-card" @click.stop>
            <form @submit.prevent="submitForm">
                <label for="profile_picture">
                    Profile Picture:
                    <img
                        v-if="state.profilePicture"
                        :src="state.profilePicture?.thumbSm || state.profilePicture"
                        width="32"
                        height="32"
                        class="ms-2 mb-1"
                    />
                </label>

                <input
                    id="profile_picture"
                    accept="image/*"
                    type="file"
                    @change="onFileChange"
                />

                <FormField
                    v-model="state.name"
                    :field="'Name'"
                    :type="'text'"
                />

                <FormFieldRoles
                    v-model="state.role"
                    :roles="state.roles"
                />

                <template v-if="isLoggedIn">
                    <FormField
                        v-model="state.email"
                        :field="'Email'"
                        :type="'email'"
                    />

                    <FormField
                        v-model="state.phoneNumber"
                        :field="'Phone Number:'"
                        :type="'tel'"
                    />
                </template>

                <button
                    type="submit"
                    class="blue"
                >
                    {{ props.type }}
                </button>

                <button
                    v-if="props.type !== 'update'"
                    type="button"
                    class="blue"
                    @click="submitForm('noClose')"
                >
                    {{ props.type }} &amp; add another
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>
import {defineEmits, defineProps, reactive} from 'vue';
import FormField from '@/components/forms/FormField.vue';
import FormFieldRoles from '@/components/forms/FormFieldRoles.vue';
import {useCrudApi} from '@/composables/useCrudApi';

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

const isLoggedIn = sessionStorage.length > 0;

const emit = defineEmits(['close', 'refresh']);

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

function onFileChange(e) {
    const file = e.target.files[0];
    if (!file) {
        state.profilePicture = null;
        return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        state.profilePicture = reader.result;
    };
}

const {CRUD} = useCrudApi();

function submitForm(noClose) {
    const form = document.querySelector('form');
    if (form.checkValidity()) {
        props.type === 'create' ? createWizkid(noClose) : updateWizkid();
    } else {
        form.reportValidity();
    }
}

async function createWizkid(noClose) {
    const wizkid = {
        name: state.name,
        role: parseInt(state.role),
        email: state.email,
        phoneNumber: state.phoneNumber,
        profilePicture: state.profilePicture,
    };

    await CRUD('create', '', wizkid).then((data) => {
        if (data === 'error') {
            console.log('email is wrong or already being used.');
        } else if (!noClose) {
            emit('refresh');
            emit('close');
        }
    });
}

// Create a wizkid.
async function updateWizkid() {
    const wizkid = {
        name: state.name,
        role: parseInt(state.role),
    };

    await CRUD('update', props.wizkidData.id, wizkid).then((data) => {
        if (data === 'error') {
            console.log('something went wrong while updating the wizkid.');
        } else {
            emit('close');
            emit('refresh');
        }
    });
}
</script>
