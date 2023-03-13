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
      const wizkids = [...this.filteredWizkids];
      if (this.sortColumn) {
        wizkids.sort((a, b) => {
          const aValue = a[this.sortColumn];
          const bValue = b[this.sortColumn];
          let result = 0;
          if (typeof aValue === 'string' && typeof bValue === 'string') {
            const aLower = aValue.toLowerCase();
            const bLower = bValue.toLowerCase();
            if (aLower < bLower) {
              result = -1;
            } else if (aLower > bLower) {
              result = 1;
            }
          } else {
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
    let confirmed = true;
    if (localStorage.getItem('deleteConfirmation') !== 'confirmed') {
      // Display custom dialog if delete confirmation is not already confirmed
      const dialog = document.createElement('div');
      dialog.innerHTML = `
        <div>
          <p>Are you sure you want to delete wizkid with ID ${id}?</p>
          <div>
            <button id="confirm">Confirm</button>
            <button id="confirmAndDontAskAgain">Confirm and don't ask again</button>
            <button id="cancel">Cancel</button>
          </div>
        </div>
      `;
      dialog.style.position = 'fixed';
      dialog.style.top = '50%';
      dialog.style.left = '50%';
      dialog.style.transform = 'translate(-50%, -50%)';
      dialog.style.backgroundColor = 'white';
      dialog.style.border = '1px solid black';
      dialog.style.padding = '20px';
      dialog.style.zIndex = '99999';
      document.body.appendChild(dialog);

      // Add event listeners to buttons
      const confirmButton = dialog.querySelector('#confirm');
      const confirmAndDontAskAgainButton = dialog.querySelector('#confirmAndDontAskAgain');
      const cancelButton = dialog.querySelector('#cancel');
      const removeDialog = () => dialog.remove();

      confirmButton.addEventListener('click', () => {
        confirmed = true;
        removeDialog();
      });

      confirmAndDontAskAgainButton.addEventListener('click', () => {
        localStorage.setItem('deleteConfirmation', 'confirmed');
        confirmed = true;
        removeDialog();
      });

      cancelButton.addEventListener('click', () => {
        confirmed = false;
        removeDialog();
      });
    }

    if (!confirmed) {
      return;
    }

    console.log('Attempting to delete wizkid...');
    await axios.delete(`http://localhost:8000/wizkids/${id}`);
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
    <h3>WizKids View</h3>
    <!-- <input class="float-start" v-model="searchQuery" placeholder="Search"> -->
    <h5 class="float-end blue"><RouterLink :to="{ name: 'wizkids-create' }">Create wizkid</RouterLink></h5>
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
          <tr v-for="wizkid in sortedWizkids" :key="wizkid.id">
                <td>{{ wizkid.id }}</td>
                <td>{{ wizkid.name }}</td>
                <td>{{ wizkidRole(wizkid.role) }}</td>
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
              
          <tr v-if="!sortedWizkids.length">
            <td colspan="4">No wizkids found, maybe you made a typo.</td>
          </tr>
          </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
h3, h5 {
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
}

.sortable{
  color: var(--color-heading)!important;
  cursor: pointer;
}

table {
  table-layout: fixed;
  word-wrap:break-word;
  width: 100%;
}

table th, td {
  color: var(--color-text)!important;
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

.router-link:hover {
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
  
  @media (max-width: 460px) {
    .float-end {
      float: left!important;
    }
  }
</style>
