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
            <tr v-for="wizkid in filteredWizkids" :key="wizkid.id">
              <td>{{ wizkid.id }}</td>
              <td>{{ wizkid.name }}</td>
              <td>{{ wizkidRoleMap[wizkid.role] }}</td>
              <td>
                <svg @click="deleteWizkidById(wizkid.id)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24" class="inline-block" role="presentation" >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                  </path>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24" class="inline-block" role="presentation">
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
    <h5 class="float-end blue"><RouterLink :to="{ name: 'wizkids-create' }">Create wizkid</RouterLink></h5>
  </div>
</template>




<script setup>
  import { useCrudApi } from '../../composables/useCrudApi';
  import { RouterLink } from 'vue-router';
  import { ref, computed } from 'vue';

  //mapping roles
  const wizkidRoleMap = {
    null: 'Guest',
    1: 'Boss',
    2: 'Developer',
    3: 'Designer',
    4: 'Intern'
  };

  //filter function for searching wizkids
  const searchQuery = ref('');

  const filteredWizkids = computed(() => {
    const query = searchQuery.value.toLowerCase();

    return wizkids.value.filter(wizkid => {
      return wizkid.id.toString().toLowerCase().includes(query) ||
             wizkid.name.toLowerCase().includes(query) ||
             wizkidRoleMap[wizkid.role].toLowerCase().includes(query);
    });
  });

  //sorting function to sort by any data of a wizkid
  let sortColumn = '';
  let sortDirection = 'asc';

  function sortTable(column) {
    sortDirection = sortColumn === column ? -sortDirection : 1;

    sortColumn = column;

    filteredWizkids.value.sort((a, b) => {
      const sortA = a[column];
      const sortB = b[column];

      if (sortA < sortB) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (sortA > sortB) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  //Create Read Update Delete functions!
  const { CRUD } = useCrudApi();
  const wizkids = ref([]);

  //fetch all wizkids
  CRUD('read').then(data => {
    wizkids.value = data;
  });
  
  //delete a wizkid
  async function deleteWizkidById(id) {
    const result = await CRUD('delete', id);
    if (!result) {
      wizkids.value = wizkids.value.filter(w => w.id !== id);
    }
  }

</script>