import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import wizkidsRead from '../views/WizKidsRead.vue'
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
      component: wizkidsRead
    }
  ]
})

export default router
