<template>
  <div class="overlay pointer" @click="$emit('close')">
    <div class="form-card" @click.stop>
      <form @submit.prevent="submitForm">
        <FormFieldFileUpload v-model="state.profilePicture" :field="'Profile Picture:'" :type="'file'"/>
        <FormField v-model="state.name" :field="'Name'" :type="'text'"/>
        <FormFieldRoles v-model="state.role" :roles="state.roles"/>
        <template v-if="isLoggedIn">
          <FormField v-model="state.email" :field="'Email'" :type="'email'"/>
          <FormField v-model="state.phoneNumber" :field="'Phone Number:'" :type="'tel'"/>
        </template>
        <button type="submit" class="blue">
          {{ props.type }}
        </button>
        <button v-if="props.type !== 'update'" type="button" class="blue" @click="submitForm('noClose')">
          {{ props.type }} &amp; add another
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import FormField from '@/components/forms/FormField.vue';
import FormFieldRoles from '@/components/forms/FormFieldRoles.vue';
import { reactive } from 'vue';
import { useCrudApi } from '@/composables/useCrudApi';
import FormFieldFileUpload from './FormFieldFileUpload.vue';

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

const { CRUD } = useCrudApi();

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

  console.log(wizkid)
      
  await CRUD('create', '', wizkid).then((data) => {
      if (data === 'error') {
        console.log('email is wrong or already being used.');
      } else if (!noClose) {
        emit('refresh');
        emit('close');
      }
    });
  }

  //create a wizkid
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
