<template>
    <div class="overlay pointer" @click="$emit('close')">
      <div class="form-card" @click.stop>
        <form>
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
        <div v-if="props.type !== 'update'" class="form-group">
          <label for="email">Email:</label>
          <input id="email" v-model="state.email" type="email" required>
        </div>
        <div class="align-self-center">
          <button type="submit" class="blue" @click.prevent="submitForm(props.type)">
            {{ props.type }} Wizkid
          </button>
          <button v-if="props.type !== 'update'" type="submit" class="blue" @click.prevent="submitForm(props.type, 'noClose')">
            {{ props.type }} &amp; add another
          </button>
        </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
    import { reactive, defineEmits } from 'vue';
    import { useCrudApi } from '../composables/useCrudApi';
  
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
      role: props.wizkidData.role,
      email: props.wizkidData.email,
      roles: {
        1: 'Boss',
        2: 'Developer',
        3: 'Designer',
        4: 'Intern'
      },
    });
  
    const { CRUD } = useCrudApi();
  
    //check form validity
    function submitForm(type, noClose) {
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
      };
      console.log(wizkid)
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