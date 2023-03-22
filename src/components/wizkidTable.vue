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
        <RoleFilter :role-map="wizkidRoleMap" @update="updateFilter"/>
      </tr>
    </thead>
    <tbody>
      <tr v-for="filteredWizkid in filteredWizkids" :key="filteredWizkid.id" :data-id="filteredWizkid.id">
        <td>{{ filteredWizkid.id }}</td>
        <td>{{ filteredWizkid.name }}</td>
        <td v-if="isWizkid">{{ filteredWizkid.email }}</td>
        <td v-if="isWizkid">{{ filteredWizkid.phoneNumber }}</td>
        <td>{{ wizkidRoleMap[filteredWizkid.role] }}</td>
        <td><img :src="filteredWizkid.profilePicture?.thumbSm" alt="None"/></td>
        <td>
          <div v-if="isWizkid" class="dropdown">
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
import RoleFilter from './RoleFilter.vue'
import IconDelete from './icons/IconDelete.vue'
import IconEdit from './icons/IconEdit.vue'
import IconOptions from './icons/IconOptions.vue'

  const isWizkid = sessionStorage.length
  const { CRUD } = useCrudApi()
  const wizkids = ref([])
  const roleFilter = ref([])  
  const wizkidRoleMap = {
    1: 'Boss',
    2: 'Developer',
    3: 'Designer',
    4: 'Intern'
  }

  const props = defineProps({
    search: {
      type: String,
      default: ''
    }
  });

  renderWizkids()

  // filter wizkids on searchQuery and RoleFilter
  const filteredWizkids = computed(() => {
    const query = props.search
    const roles = roleFilter.value

    //if no roles to filter on, only filter on query.
    return wizkids.value.filter(wizkid => {
      if (roles.length === 0) {
      return wizkid.name.toLowerCase().includes(query)
      } else {
      return wizkid.name.toLowerCase().includes(query) && roles.includes(wizkid.role.toString())
      }
    })
  })


  //fetch all wizkids!
  function renderWizkids() {
      CRUD('read').then(data => {
      if (data === 'error') {
          console.log('something went wrong while fetching the wizkids!')
        }
      wizkids.value = data
    })
  }

  //update roleFilter ref with the data emitted from RoleFilter
  function updateFilter(newData) {
      const index = roleFilter.value.indexOf(newData);
    if (index === -1) {
      roleFilter.value.push(newData);
    } else {
      roleFilter.value.splice(index, 1);
    }
  }
</script>