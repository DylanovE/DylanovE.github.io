<template>
    <div class="container wizkids mt-4">
      <h3 class="float-left">WizKids</h3>
      <input v-model="searchQuery" class="float-right" placeholder="Search">
      <div class="wizkid-container container">
        <wizkidTable :search="searchQuery"/>
      </div>
      <h5 v-if="isLoggedIn" class="float-right blue pointer" @click="togglePopup('create')" >Create wizkid</h5>
    </div>
    <popupForm v-if="isPopupVisible" :type="popupType" :wizkid-data="wizkid" @close="isPopupVisible = false" @refresh="renderWizkids()"/>
</template>
  
  <script setup>
    import popupForm from './PopupForm.vue'
    import wizkidTable from './wizkidTable.vue'
    import { ref } from 'vue'
  
    const isLoggedIn = !!sessionStorage.apiToken;
    const wizkid = ref({})
    const searchQuery = ref('')
    const isPopupVisible = ref(false)
    const popupType = ref('')
  
    //toggle the wizkid update/create popup component
    function togglePopup(type, wizkidData) {
      popupType.value = type
      if(wizkidData){
        wizkid.value = wizkidData
      }else{
        wizkid.value = ''
      }
      if (popupType.value === 'create' || popupType.value === 'update') {
        isPopupVisible.value = !isPopupVisible.value
      }
    }
  </script>