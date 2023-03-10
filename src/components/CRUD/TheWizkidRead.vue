<script>
import axios from 'axios';

export default {
  data() {
    return {
      searchQuery: '',
      wizkids: [],
      sortColumn: null,
      sortDirection: 'asc'
    };
  },

  computed: {
    filteredWizkids() {
      return this.wizkids.filter((wizkid) => {
        const roleString = this.wizkidRoleMap[wizkid.role];
        return (
          wizkid.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          roleString.toLowerCase().includes(this.searchQuery) ||
          wizkid.id.toString().includes(this.searchQuery)
        );
      });
    },
    wizkidRoleMap() {
      return {
        null: 'Guest',
        1: 'Boss',
        2: 'Developer',
        3: 'Designer',
        4: 'Intern'
      }
    },
    sortedWizkids() {
      const wizkids = [...this.wizkids];
      if (this.sortColumn) {
        wizkids.sort((a, b) => {
          const aValue = a[this.sortColumn];
          const bValue = b[this.sortColumn];
          let result = 0;
          if (typeof aValue === 'string' && typeof bValue === 'string') {
            // Convert string values to lowercase before comparing
            const aLower = aValue.toLowerCase();
            const bLower = bValue.toLowerCase();
            if (aLower < bLower) {
              result = -1;
            } else if (aLower > bLower) {
              result = 1;
            }
          } else {
            // Use default comparison for non-string values
            if (aValue < bValue) {
              result = -1;
            } else if (aValue > bValue) {
              result = 1;
            }
          }
          return this.sortDirection === 'asc' ? result : -result;
        });
      }
      return wizkids;
    }
  },

  methods: {
    wizkidRole(role) {
      return this.wizkidRoleMap[role] || 'Unknown Role'
    },
    async deleteWizkid(id) {
      try {
        const confirmed = confirm(`Are you sure you want to delete wizkid with ID ${id}?`);
        if (!confirmed) {
          return;
        }
        console.log('Attempting to delete wizkid...');
        await axios.delete(`http://localhost:8000/wizkids/${id}`)
        console.log('Wizkid deleted successfully!');
        const index = this.wizkids.findIndex((wizkid) => wizkid.id === id);
        if (index !== -1) {
          this.wizkids.splice(index, 1);
        }
      } catch (error) {
        console.error(error.response.data.message);
      }
    },
    sortTable(column) {
      if (this.sortColumn === column) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortColumn = column;
        this.sortDirection = 'asc';
      }
    }
  },

  mounted() {
    axios.get('http://localhost:8000/wizkids/')
      .then(response => {
        this.wizkids = response.data.data;
        this.table = this.sortColumn = 'id';
      })
      .catch(error => {
        console.log(error);
      });
  },
};
</script>

<template>
  <div class="container wizkids mt-4">
    <h1>WizKids View</h1>
    <input v-model="searchQuery" placeholder="Search">
    <div class="wizkid-container container">
      <table class="table table-striped">
        <thead>
          <tr>
            <th class="sortable" @click="sortTable('id')">
              ID
              <span v-if="sortColumn === 'id'">{{ sortDirection === 'asc' ? '&#x25b4;' : '&#x25be;' }}</span>
              <span v-else>&#x25b4;&#x25be;</span>
            </th>
            <th class="sortable" @click="sortTable('name')">
              Name
              <span v-if="sortColumn === 'name'">{{ sortDirection === 'asc' ? '&#x25b4;' : '&#x25be;' }}</span>
              <span v-else>&#x25b4;&#x25be;</span>
            </th>
            <th class="sortable" @click="sortTable('role')">
              Role
              <span v-if="sortColumn === 'role'">{{ sortDirection === 'asc' ? '&#x25b4;' : '&#x25be;' }}</span>
              <span v-else>&#x25b4;&#x25be;</span>
            </th>
            <th> Functionality
            </th>
          </tr>
        </thead>
          <tbody>
              <tr v-for="wizkid in filteredWizkids" :key="wizkid.id">
                <td>{{ wizkid.id }}</td>
                <td>{{ wizkid.name }}</td>
                <td>{{ wizkidRole(wizkid.role) }}</td>
                <td>
                  <svg @click="(event) => deleteWizkid(wizkid.id, event)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24" class="inline-block" role="presentation" >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                    </path>
                  </svg>
                </td>
              </tr>
          </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
h1 {
  float: left;
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
}

input {
  float: right;
}

.sortable{
  color: var(--color-heading)!important;
  cursor: pointer;
}

table th, td {
  color: var(--color-text)!important;
}

.wizkid-container {
  overflow-y: auto;
  height: 50vh;
}

svg {
  cursor: pointer;
}

@media (min-width: 1024px) {
  .wizkids {
    align-items: center;
    max-height: 50vh;
    position: relative;
  }
}
</style>
