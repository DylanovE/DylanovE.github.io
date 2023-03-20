<template>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24" class="inline-block" role="presentation" @click="deleteWizkid()">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
</template>
<script setup>
import { useCrudApi } from '../../composables/useCrudApi'

    const emit = defineEmits(['rerender'])

    const { CRUD } = useCrudApi()
    const props = defineProps({
        wizkid: {
            type: null,
            default: undefined
        }
    });
    
    //delete a wizkid
    async function deleteWizkid() {
      await CRUD('delete', props.wizkid).then(data => {
        if (data === 'error') {
          console.log('email is wrong or already being used.')
        }
      })
      emit('rerender')
    }
</script>