import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainLayout from "../layouts/MainLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/map-hotel',
      name: 'map-hotel',
      component: () => import('../hostlify/map-hotel.vue')
    },
    {
      path: '/SOS',
      name: 'SOS',
      component: () => import('../hostlify/SOS.vue')
    },
    {
      path: '/mail-box',
      name: 'mail-box',
      component: () => import('../hostlify/mail-box.vue')
    }
  ]
})
export default router

