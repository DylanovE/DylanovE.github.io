
<script>
import axios from 'axios';

export default {
  data() {
    return {
      searchQuery: '',
      users: [],
      sortColumn: null,
      sortDirection: 'asc'
    };
  },

  computed: {
    filteredUsers() {
      return this.users.filter((user) => {
        const roleString = this.userRoleMap[user.role];
        return (
          user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          roleString.toLowerCase().includes(this.searchQuery) ||
          user.id.toString().includes(this.searchQuery)
        );
      });
    },
    userRoleMap() {
      return {
        null: 'Guest',
        1: 'Boss',
        2: 'Developer',
        3: 'Designer',
        4: 'Intern'
      }
    },
    sortedUsers() {
      const users = [...this.users];
      if (this.sortColumn) {
        users.sort((a, b) => {
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
      return users;
    }
  },

  methods: {
    userRole(role) {
      return this.userRoleMap[role] || 'Unknown Role'
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
        this.users = response.data.data;
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
            <th @click="sortTable('id')">
              ID
              <span v-if="sortColumn === 'id'">{{ sortDirection === 'asc' ? '&#x25b4;' : '&#x25be;' }}</span>
              <span v-else>&#x25b4;&#x25be;</span>
            </th>
            <th @click="sortTable('name')">
              Name
              <span v-if="sortColumn === 'name'">{{ sortDirection === 'asc' ? '&#x25b4;' : '&#x25be;' }}</span>
              <span v-else>&#x25b4;&#x25be;</span>
            </th>
            <th @click="sortTable('role')">
              Role
              <span v-if="sortColumn === 'role'">{{ sortDirection === 'asc' ? '&#x25b4;' : '&#x25be;' }}</span>
              <span v-else>&#x25b4;&#x25be;</span>
            </th>
          </tr>
        </thead>
          <tbody>
              <tr v-for="user in filteredUsers" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.name }}</td>
                <td>{{ userRole(user.role) }}</td>
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

table th {
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

@media (min-width: 1024px) {
  .wizkids {
    align-items: center;
    max-height: 50vh;
    position: relative;
  }
}
</style>
