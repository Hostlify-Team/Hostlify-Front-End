import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/history',
      name: 'HistoryPage',
      component: () => import('../hostlify/HistoryView.vue')
    },
    {
      path: '/register-huesped',
      name: 'register-huesped',
      component: () => import('../hostlify/Register_Huesped.vue')
    },
    {
      path: '/rooms',
      name: 'rooms',
      component: () => import('../hostlify/Rooms_Table.vue')
    }
  ]
})

export default router
