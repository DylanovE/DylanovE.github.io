<template>
  <div class="overlay" @click="$emit('close')">
    <div class="form-card" @click.stop>
      <form>
        <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="state.name" required>
      </div>
      <div class="form-group">
        <label for="role">Role:</label>
        <select id="role" v-model="state.role" required>
          <option value="" disabled>Select a role</option>
          <option v-for="(value, key) in state.roles" :value="key" :key="key">{{ value }}</option>
        </select>
      </div>
      <div class="form-group" v-if="$attrs.type !== 'update'">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="state.email" required>
      </div>
      <div class="align-self-center">
        <button type="submit" class="blue" @click.prevent="submitForm($attrs.type)">
          {{ $attrs.type }} Wizkid
        </button>
        <button type="submit" class="blue" @click.prevent="submitForm($attrs.type, 'noClose')" v-if="$attrs.type !== 'update'">
          {{ $attrs.type }} &amp; add another
        </button>
      </div>
      </form>
    </div>
  </div>
</template>

<script setup>
  import { reactive, useAttrs } from 'vue';
  import { useCrudApi } from '../../composables/useCrudApi';

  const attrs = useAttrs()
  
  const emit = defineEmits(['close'])

  const state = reactive({
    name: attrs.wizkidData.name,
    role: attrs.wizkidData.role,
    email: attrs.wizkidData.email,
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
      type === 'create' ? createWizkid(noClose) : updateWizkid();
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
    await CRUD('create', '', wizkid);
    if (!noClose) {
      emit('close')
    }
  }

  //create a wizkid
  async function updateWizkid(id) {
    const wizkid = {
      name: state.name,
      role: parseInt(state.role),
    };

    await CRUD('update', id, wizkid);
  }

  </script>