<template>
  <div class="container wizkids mt-4">
    <h3 class="float-start">WizKids</h3>
    <input class="float-end" v-model="searchQuery" placeholder="Search">
    <div class="wizkid-container container">
      <table class="table table-striped">
        <thead>
          <tr>
            <th class="sortable" @click="sortTable('id')">
              <span v-if="sortColumn === 'id'">{{ sortDirection === 1 ? 'ID&#x25b4;' : 'ID&#x25be;' }}</span>
              <span v-else>ID&#x25b4;&#x25be;</span>
            </th>
            <th class="sortable" style="width:50%" @click="sortTable('name')">
              <span v-if="sortColumn === 'name'">{{ sortDirection === 1 ? 'Name&#x25b4;' : 'Name&#x25be;' }}</span>
              <span v-else>Name&#x25b4;&#x25be;</span>
            </th>
            <th class="sortable" @click="sortTable('role')">
              <span v-if="sortColumn === 'role'">{{ sortDirection === 1 ? 'Role&#x25b4;' : 'Role&#x25be;' }}</span>
              <span v-else>Role&#x25b4;&#x25be;</span>
            </th>
            <th/>
          </tr>
        </thead>
        <tbody>
          <template v-if="filteredWizkids.length > 0">
            <tr v-for="wizkid in filteredWizkids" :key="wizkid.id" :data-id="wizkid.id">
              <td>{{ wizkid.id }}</td>
              <td>{{ wizkid.name }}</td>
              <td>{{ wizkidRoleMap[wizkid.role] }}</td>
              <td>
                <svg @click="deleteWizkidById(wizkid.id)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24" class="inline-block" role="presentation" >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                  </path>
                </svg>
                <svg @click="togglePopup('update', wizkid)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24" class="inline-block" role="presentation">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                  </path>
                </svg>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="4" class="text-center">No WizKids Found</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <h5 class="float-end blue pointer" @click="togglePopup('create')" >Create wizkid</h5>
  </div>
  <popupForm v-if="isPopupVisible" :type="popupType" :wizkidData="wizkid" @close="isPopupVisible = false" @refresh="rerenderTable()"/>
</template>

<script setup>
  import popupForm from './popupForm.vue';
  import { useCrudApi } from '../composables/useCrudApi';
  import { ref, computed } from 'vue';

  const wizkidRoleMap = {
    null: '',
    1: 'Boss',
    2: 'Developer',
    3: 'Designer',
    4: 'Intern'
  };

  const sortColumn = ref('id');
  const sortDirection = ref(1);
  const wizkids = ref([]);

  //filter function for searching wizkids
  const searchQuery = ref('');

  const filteredWizkids = computed((column) => {
    const query = searchQuery.value.toLowerCase();

    return wizkids.value.filter(wizkid => {
      return wizkid.id.toString().toLowerCase().includes(query) ||
             wizkid.name.toLowerCase().includes(query) ||
             wizkidRoleMap[wizkid.role].toLowerCase().includes(query);
    }).sort((b, a) => {
      console.log('sorting!')
        if (a[column] < b[column]) return -1 * sortDirection.value;
        if (a[column] > b[column]) return sortDirection.value;
        return 0;
      });
  });

  function sortTable(column) {
      if (sortColumn.value === column) {
        sortDirection.value *= -1;
      } else {
        sortColumn.value = column;
        sortDirection.value *= +1;
      }
      wizkids.value.sort();
    }


  //Create Read Update Delete functions!
  const { CRUD } = useCrudApi();

  //fetch all wizkids
  CRUD('read').then(data => {
    if (data === 'error') {
        console.log('email is wrong or already being used.')
      }
    wizkids.value = data;
  });
  
  //delete a wizkid
  async function deleteWizkidById(id) {
    await CRUD('delete', id).then(data => {
      if (data === 'error') {
        console.log('email is wrong or already being used.')
      }
    })
    rerenderTable();
  }

  //toggle the wizkid update/create popup component
  const isPopupVisible = ref(false)
  const popupType = ref();
  const wizkid = ref();

  function togglePopup(type, wizkidData) {
    popupType.value = type;
    if(wizkidData){
      wizkid.value = wizkidData;  
    }else{
      wizkid.value = '';
    }
    if (popupType.value === 'create' || popupType.value === 'update') {
      isPopupVisible.value = !isPopupVisible.value;
    }
  }
  
  function rerenderTable() {
    CRUD('read').then(data => {
      if (data === 'error') {
          console.log('email is wrong or already being used.')
        }
      wizkids.value = data;
    });
  }

</script>