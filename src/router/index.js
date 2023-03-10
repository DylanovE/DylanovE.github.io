import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import wizkidRead from '../views/WizKidRead.vue'
import wizkidCreate from '../views/WizKidCreate.vue'
import wizkidUpdate from '../views/WizKidUpdate.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/wizkids-read',
      name: 'wizkids-read',
      component: wizkidRead
    },
    {
      path: '/wizkids-create',
      name: 'wizkids-create',
      component:wizkidCreate
    },
    {
      path: '/wizkids-update',
      name: 'wizkids-update',
      component:wizkidUpdate
    }
  ]
})

export default router
