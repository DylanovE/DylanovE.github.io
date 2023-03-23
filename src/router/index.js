import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Wizkids from '@/views/WizkidView.vue'
import LoginView from '@/views/LoginView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/wizkid-manager',
      name: 'wizkid-manager',
      component: Wizkids
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ]
})

export default router
