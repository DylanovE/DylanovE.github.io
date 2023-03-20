<template>
    <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Avatar</th>
              <WizkidFilter :role-map="wizkidRoleMap" @update="updateFilter"/>
            </tr>
          </thead>
          <tbody>
              <tr v-for="filteredWizkid in filteredWizkids" :key="filteredWizkid.id" :data-id="filteredWizkid.id">
                <td>{{ filteredWizkid.id }}</td>
                <td>{{ filteredWizkid.name }}</td>
                <td v-if="isLoggedIn">{{ filteredWizkid.email }}</td>
                <td v-if="isLoggedIn">{{ filteredWizkid.phoneNumber }}</td>
                <td>{{ wizkidRoleMap[filteredWizkid.role] }}</td>
                <td><img :src="filteredWizkid.profilePicture?.thumbSm" alt="None"/></td>
                <td>
                  <div v-if="isLoggedIn" class="dropdown">
                    <IconOptions />
                    
                    <div class="dropdown-menu p-3" aria-labelledby="dropdownFunctionsSvg">
                    <IconEdit  @edit="togglePopup('update', filteredWizkid)" />
                    <IconDelete :wizkid="filteredWizkid.id" @rerender="renderWizkids()" />
                    </div>
                  </div>
                </td>
              </tr>
              <tr v-if="filteredWizkids.length == 0">
                <td colspan="7" class="text-center">No WizKids Found</td>
              </tr>
          </tbody>
        </table>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCrudApi } from '../composables/useCrudApi'
import WizkidFilter from './WizkidFilter.vue'
import IconDelete from './icons/IconDelete.vue'
import IconEdit from './icons/IconEdit.vue'
import IconOptions from './icons/IconOptions.vue'
  
    const isLoggedIn = !!sessionStorage.apiToken;
    const { CRUD } = useCrudApi()
    const wizkids = ref([])
    const searchQuery = ref('')
    const filterRoles = ref([])  
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
      const roles = filterRoles.value

      return wizkids.value.filter(wizkid => {
        return wizkid.id.toString().toLowerCase().includes(query) ||
               wizkid.name.toLowerCase().includes(query) ||
               wizkidRoleMap[wizkid.role].toLowerCase().includes(query)
      }).filter(wizkid => {
        if (roles === undefined) {
            return true
        } else {
        return roles.includes(wizkid.role.toString());
        }
      })
    })

    //fetch all wizkids
    function renderWizkids() {
        CRUD('read').then(data => {
        if (data === 'error') {
            console.log('something went wrong while fetching the wizkids!')
          }
        wizkids.value = data
      })
    }

    //update filterRoles ref with the emitted data
    function updateFilter(newData) {
        const index = filterRoles.value.indexOf(newData);
      if (index === -1) {
        filterRoles.value.push(newData);
      } else {
        filterRoles.value.splice(index, 1);
      }
    }
</script>