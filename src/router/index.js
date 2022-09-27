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
      path: '/map-hotel',
      name: 'map-hotel',
      component: () => import('../hostlify/map-hotel.vue')
    },
    {
      path: '/SOS',
      name: 'SOS',
      component: () => import('../hostlify/SOS.vue')
    }
  ]
})

export default router
