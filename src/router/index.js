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
      component: () => import('../hostlify/HistoryView.vue'),
      meta: {manager: true}
    },
    {
      path: '/registerhuesped',
      name: 'rooms',
      component: () => import('../hostlify/Register_Huesped.vue'),
      meta: {manager: true}
    }
  ]
})

export default router
