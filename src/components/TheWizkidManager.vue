<template>
    <div class="container wizkids mt-4">
      <h3 class="float-left">WizKids</h3>
      <input v-model="searchQuery" class="float-right" placeholder="Search">
      <div class="wizkid-container container">
        <table class="table table-striped">
          <thead>
            <tr>
              <SortableTableHeader :sort-direction="sortDirection" :sort-column="sortColumn"  :type="'id'" @sort="sortTable('id')"/>
              <SortableTableHeader :sort-direction="sortDirection" :sort-column="sortColumn"  :type="'name'" @sort="sortTable('name')"/>
              <SortableTableHeader :sort-direction="sortDirection" :sort-column="sortColumn"  :type="'role'" @sort="sortTable('role')"/>
              <th>
                <span>Avatar</span>
              </th>
              <th>
              <div class="dropdown">
              <IconFilter style="height: 100%;"/>
                <form class="dropdown-menu p-3" aria-labelledby="dropdownRoleFilterSvg">
                  <div v-for="(roleName, roleId) in wizkidRoleMap" :key="roleId" class="form-check">
                    <input :id="'role-' + roleId" v-model="filterRoles" class="form-check-input" type="checkbox" :value="roleId" >
                    <label class="form-check-label" :for="'role-' + roleId">{{ roleName }}</label>
                  </div>
                </form>
              </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-if="filteredWizkids.length > 0">
              <tr v-for="filteredWizkid in filteredWizkids" :key="filteredWizkid.id" :data-id="filteredWizkid.id">
                <td>{{ filteredWizkid.id }}</td>
                <td>{{ filteredWizkid.name }}</td>
                <td>{{ wizkidRoleMap[filteredWizkid?.role] }}</td>
                <td><img :src="filteredWizkid.profilePicture?.thumbSm" alt="Avatar"/></td>
                <td>
                  <div class="dropdown">
                    <IconOptions />
                    
                    <div class="dropdown-menu p-3" aria-labelledby="dropdownFunctionsSvg">
                    <IconEdit @edit="togglePopup('update', filteredWizkid)"/>
                    <IconUnFire  @un-fire="unFireById(filteredWizkid.id)"/>
                    <IconDelete @delete="deleteWizkidById(filteredWizkid.id)"/>
                    <IconFire  @fire="fireById(filteredWizkid.id)"/>
                    </div>
                  </div>
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
  import { useCrudApi } from '../composables/useCrudApi'
    import SortableTableHeader from './SortableTableHeader.vue'
    import IconOptions from './icons/IconOptions.vue'
    import IconFilter from './icons/IconFilter.vue'
    import IconDelete from './icons/IconDelete.vue'
    import IconUnFire from './icons/IconUnFire.vue'
    import IconFire from './icons/IconFire.vue'
    import IconEdit from './icons/IconEdit.vue'
    import popupForm from './PopupForm.vue'
    import { ref, computed } from 'vue'
  
  
    const { CRUD } = useCrudApi()
    const wizkids = ref([])
    const wizkid = ref({})
    const searchQuery = ref('')
    const filterRoles = ref(["1","2","3","4"])
    const sortColumn = ref()
    const sortDirection = ref(0)
    const isPopupVisible = ref(false)
    const popupType = ref('')
    const wizkidRoleMap = {
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
      const roles = filterRoles.value
  
      const filtered = wizkids.value.filter(wizkid => {
        return wizkid.id.toString().toLowerCase().includes(query) ||
               wizkid.name.toLowerCase().includes(query) ||
               wizkidRoleMap[wizkid.role].toLowerCase().includes(query)
      }).sort((b, a) => {
          if (a[column] < b[column]) return -1 * sortDirection.value
          if (a[column] > b[column]) return sortDirection.value
          return 0
        })
        
      return filtered.filter(wizkid => {
  return (wizkid.role !== null && roles.includes(wizkid.role.toString()))
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
            console.log('something went wrong while fetching the wizkids!')
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