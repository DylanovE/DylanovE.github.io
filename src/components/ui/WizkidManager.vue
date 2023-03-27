<template>
    <div>
        <h3 class="float-left">WizKids</h3>

        <input v-model="searchQuery" class="float-right" placeholder="Search">

        <div class="wizkid-container container">
            <WizkidTable :key="tableKey" :search="searchQuery" @edit="togglePopup('update', $event)" />
        </div>

        <h5 v-if="isLoggedIn" class="float-right blue pointer" @click="togglePopup('create')">Create wizkid</h5>
    </div>

    <FormPopup
        v-if="isPopupVisible"
        :type="popupType"
        :wizkid-data="wizkid"
        @close="isPopupVisible = false"
        @refresh="refreshTable"
    />
</template>

<script setup>
import FormPopup from '@/components/forms/FormPopup.vue';
import WizkidTable from '@/components/ui/WizkidTable.vue';
import {ref} from 'vue';
import usePopup from '@/composables/usePopup';

const isLoggedIn = !!sessionStorage.apiToken;

const {wizkid, isPopupVisible, popupType, togglePopup} = usePopup();

const searchQuery = ref('');

const tableKey = ref(0);

function refreshTable() {
    tableKey.value += 1;
}
</script>
