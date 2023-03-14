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
            <th class="sortable" @click="sortTable('name')">
              <span v-if="sortColumn === 'name'">{{ sortDirection === 1 ? 'Name&#x25b4;' : 'Name&#x25be;' }}</span>
              <span v-else>Name&#x25b4;&#x25be;</span>
            </th>
            <th class="sortable" @click="sortTable('role')">
              <span v-if="sortColumn === 'role'">{{ sortDirection === 1 ? 'Role&#x25b4;' : 'Role&#x25be;' }}</span>
              <span v-else>Role&#x25b4;&#x25be;</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-if="filteredWizkids.length > 0">
            <tr v-for="wizkid in filteredWizkids" :key="wizkid.id">
              <td>{{ wizkid.id }}</td>
              <td>{{ wizkid.name }}</td>
              <td>{{ wizkidRoleMap[wizkid.role] }}</td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="3" class="text-center">No WizKids Found</td>
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

const { fetchWizkids } = useCrudApi();

const searchQuery = ref('');
const wizkids = ref([]);

fetchWizkids().then(data => {
  wizkids.value = data;
});

const wizkidRoleMap = {
  null: 'Guest',
  1: 'Boss',
  2: 'Developer',
  3: 'Designer',
  4: 'Intern'
};

const filteredWizkids = computed(() => {
  const query = searchQuery.value.toLowerCase();
  
  return wizkids.value.filter(wizkid => {
    return wizkid.id.toString().toLowerCase().includes(query) ||
           wizkid.name.toLowerCase().includes(query) ||
           wizkidRoleMap[wizkid.role].toLowerCase().includes(query);
  });
});

let sortColumn = '';
let sortDirection = 'asc';

function sortTable(column) {
  sortDirection = sortColumn === column ? -sortDirection : 1;

  sortColumn = column;

  wizkids.value.sort((a, b) => {
    const aVal = a[sortColumn];
    const bVal = b[sortColumn];

    if (sortColumn === 'name') {
      return sortDirection * aVal.localeCompare(bVal);
    }

    return sortDirection * (aVal - bVal);
  });

  const sortingArrow = document.querySelector('.sorting-arrow');
  if (sortingArrow) {
    sortingArrow.classList.remove(sortDirection === 1 ? 'desc' : 'asc');
    sortingArrow.classList.add(sortDirection === 1 ? 'asc' : 'desc');
  }
}


console.log(filteredWizkids)

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
