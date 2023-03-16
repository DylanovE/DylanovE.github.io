import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import wizkidsManager from '../views/WizkidManager.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/wizkids-manager',
      name: 'wizkids-manager',
      component: wizkidsManager
    }
  ]
})

export default router
