<template>
  <div class="container wizkids mt-4">
    <h3 class="float-start">WizKids</h3>
    <input class="float-end" v-model="searchQuery" placeholder="Search">
    <div class="wizkid-container container">
    <table class="table table-striped">
      <thead>
          <tr>
            <th class="sortable" @click="sortTable('id')">
              <span v-if="sortColumn === 'id'">{{ sortDirection === 'asc' ? 'ID&#x25b4;' : 'ID&#x25be;' }}</span>
              <span v-else>ID&#x25b4;&#x25be;</span>
            </th>
            <th class="sortable" style="width: 45%" @click="sortTable('name')">
              <span v-if="sortColumn === 'name'">{{ sortDirection === 'asc' ? 'Name&#x25b4;' : 'Name&#x25be;' }}</span>
              <span v-else>Name&#x25b4;&#x25be;</span>
            </th>
            <th class="sortable" @click="sortTable('role')">
              <span v-if="sortColumn === 'role'">{{ sortDirection === 'asc' ? 'Role&#x25b4;' : 'Role&#x25be;' }}</span>
              <span v-else>Role&#x25b4;&#x25be;</span>
            </th>
            <th/>
          </tr>
        </thead>
      <tbody>
        <tr v-for="wizkid in wizkids" :key="wizkid.id">
          <td>{{ wizkid.id }}</td>
          <td>{{ wizkid.name }}</td>
          <td>{{ wizkidRoleMap[wizkid.role] }}</td>
          <td>
                  <svg @click="deleteWizkid(wizkid.id)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24" class="inline-block" role="presentation" >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                    </path>
                  </svg>
                  <RouterLink :to="{ name: 'wizkids-update', params: {wizkidId: wizkid.id }, query: { name: wizkid.name, role: wizkid.role }}" style="color: var(--color-text);" >
                    <svg   xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24" class="inline-block" role="presentation">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                      </path>
                    </svg>
                  </RouterLink>
                  
                </td>
        </tr>
        <!-- <tr v-if="!wizkids.length">
            <td colspan="4">No wizkids found, maybe you made a typo.</td>
          </tr> -->
      </tbody>
    </table>
    </div>
    <h5 class="float-end blue"><RouterLink :to="{ name: 'wizkids-create' }">Create wizkid</RouterLink></h5>
  </div>
</template>

<script setup>
import { useCrudApi } from '../../composables/useCrudApi';
// import { computed } from 'vue';
import { RouterLink } from 'vue-router';

const {fetchWizkids}  = await useCrudApi();
console.log( fetchWizkids);
const searchQuery = '' ;
const wizkids = await fetchWizkids();


const wizkidRoleMap = {
  null: 'Guest',
  1: 'Boss',
  2: 'Developer',
  3: 'Designer',
  4: 'Intern'
};

// const filteredWizkids = computed(() => {
//   console.log('FILTER START')
//   return wizkids.filter((wizkid) => {
//     return (
//       wizkid.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
//       wizkidRoleMap[wizkid].toLowerCase().includes(searchQuery.value) ||
//       wizkid.id.toString().includes(searchQuery.value)
//     );
//   });
// });
</script>

<style scoped>
th {
  color: var(--color-heading);
  cursor: pointer;
}

td {
  color: var(--color-text)!important;
}

h3, h5 {
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
}

table {
  table-layout: fixed;
  word-wrap:break-word;
  width: 100%;
}


.wizkid-container {
  overflow-y: auto;
  height: 40vh;
}

svg {
  cursor: pointer;
}

svg:hover {
  color: rgb(0, 38, 255);
}

.wizkids {
  gap: 1rem;
  padding: 2rem;
  background-color: var(--vt-c-black-soft);
  border: 1px solid var(--color-border);
  border-radius: 5px;
  
}

@media (min-width: 1024px) {
  .wizkids {
    align-items: center;
    max-height: 60vh;
    position: relative;
  }
}
</style>
