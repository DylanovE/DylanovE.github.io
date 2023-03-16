<template>
  <div class="container wizkids mt-4">
    <h3 class="float-left">WizKids</h3>
    <input v-model="searchQuery" class="float-right" placeholder="Search">
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
            <tr v-for="filteredWizkid in filteredWizkids" :key="filteredWizkid.id" :data-id="filteredWizkid.id">
              <td>{{ filteredWizkid.id }}</td>
              <td>{{ filteredWizkid.name }}</td>
              <td>{{ wizkidRoleMap[filteredWizkid.role] }}</td>
              <td>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24" class="inline-block" role="presentation" @click="deleteWizkidById(filteredWizkid.id)" >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24" class="inline-block" role="presentation" @click="togglePopup('update', filteredWizkid)">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
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
    <h5 class="float-right blue pointer" @click="togglePopup('create')" >Create wizkid</h5>
  </div>
  <popupForm v-if="isPopupVisible" :type="popupType" :wizkid-data="wizkid" @close="isPopupVisible = false" @refresh="renderWizkids()"/>
</template>

<script setup>
  import popupForm from './PopupForm.vue'
  import { useCrudApi } from '../composables/useCrudApi'
  import { ref, computed } from 'vue'


  const { CRUD } = useCrudApi()
  const wizkids = ref([])
  const wizkid = ref({})
  const searchQuery = ref('')
  const sortColumn = ref('id')
  const sortDirection = ref(-1)
  const isPopupVisible = ref(false)
  const popupType = ref('')
  const wizkidRoleMap = {
    null: '',
    1: 'Boss',
    2: 'Developer',
    3: 'Designer',
    4: 'Intern'
  }

  renderWizkids()

  //filter wizkids when a constant is changed and sort them aswell
  const filteredWizkids = computed(() => {
    const query = searchQuery.value.toLowerCase()
    const column = sortColumn.value

    return wizkids.value.filter(wizkid => {
      return wizkid.id.toString().toLowerCase().includes(query) ||
             wizkid.name.toLowerCase().includes(query) ||
             wizkidRoleMap[wizkid.role].toLowerCase().includes(query)
    }).sort((b, a) => {
        if (a[column] < b[column]) return -1 * sortDirection.value
        if (a[column] > b[column]) return sortDirection.value
        return 0
      })
  })

  //change the sorting constant to asc or desc the table
  function sortTable(column) {
    if (sortColumn.value === column) {
      sortDirection.value *= -1
    } else {
      sortColumn.value = column
      sortDirection.value = 1
    }
  }
  
  //fetch all wizkids
  function renderWizkids() {
      CRUD('read').then(data => {
      if (data === 'error') {
          console.log('something wen wrong while fetching the wizkids!')
        }
      wizkids.value = data
    })
  }
  
  //delete a wizkid
  async function deleteWizkidById(id) {
    await CRUD('delete', id).then(data => {
      if (data === 'error') {
        console.log('email is wrong or already being used.')
      }
    })
    renderWizkids()
  }

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