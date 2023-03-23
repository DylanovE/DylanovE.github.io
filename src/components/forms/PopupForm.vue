<template>
    <div class="overlay pointer" @click="$emit('close')">
      <div class="form-card" @click.stop>
        <form>
          <div class="form-group">
            <label for="profile_picture">Profile Picture:<img v-if="state.profilePicture" :src="state.profilePicture?.thumbSm"  width="32" height="32" class="ms-2 mb-1"></label>
            <input id="profile_picture" accept="image/*" type="file" @change="onFileChange" >
          </div>
          <div class="form-group">
          <label for="name">Name:</label>
          <input id="name" v-model="state.name" type="text" required>
        </div>
        <div class="form-group">
          <label for="role">Role:</label>
          <select id="role" v-model="state.role" required>
            <option value="" disabled>Select a role</option>
            <option v-for="(value, key) in state.roles" :key="key" :value="key">{{ value }}</option>
          </select>
        </div>
        <div v-if="isLoggedIn" class="form-group">
          <label for="email">Email:</label>
          <input id="email" v-model="state.email" type="email" required>
        </div>
        <div v-if="isLoggedIn" class="form-group">
          <label for="phoneNumber">phoneNumber:</label>
          <input id="phoneNumber" v-model="state.phoneNumber" type="phoneNumber" required>
        </div>
        <div class="align-self-center">
          <button type="submit" class="blue" required @click.prevent="submitForm()">
            {{ props.type }} Wizkid
          </button>
          <button v-if="props.type !== 'update'" type="submit" class="blue" required @click.prevent="submitForm('noClose')">
            {{ props.type }} &amp; add another
          </button>
        </div>
        </form>
      </div>
    </div>
</template>
  
  <script setup>
    import { reactive } from 'vue';
    import { useCrudApi } from '@/composables/useCrudApi';
  
    const isLoggedIn = sessionStorage.length > 0  
    const props = defineProps({
        wizkidData: {
            type: null,
            default: undefined
        },
        type: {
            type: String,
            default: ''
        }
    });
  
    const emit = defineEmits(['close', 'refresh'])
  
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
        4: 'Intern'
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

  
    const { CRUD } = useCrudApi();
  
    //check form validity
    function submitForm(noClose) {
    const form = document.querySelector('form');
    if (form.checkValidity()) {
      props.type === 'create' ? createWizkid(noClose) : updateWizkid();
    } else {
      form.reportValidity();
    }
  }
  
    //create a wizkid
    async function createWizkid(noClose) {
      const wizkid = {
        name: state.name,
        role: parseInt(state.role),
        email: state.email,
        phoneNumber: state.phoneNumber,
        profilePicture: state.profilePicture,
      };
      
      await CRUD('create', '', wizkid).then(data => {
        if (data === 'error') {
          console.log('email is wrong or already being used.')
        } else if (!noClose) {
          emit('refresh')
          emit('close')
        }
      })
    }
    
    //create a wizkid
    async function updateWizkid() {
      const wizkid = {
        name: state.name,
        role: parseInt(state.role),
      };
  
      await CRUD('update', props.wizkidData.id, wizkid).then(data => {
        if (data === 'error') {
          console.log('something went wrong while updating the wizkid.')
        } else {
          emit('close')
          emit('refresh')
        }
      })
    }
  
  </script>  