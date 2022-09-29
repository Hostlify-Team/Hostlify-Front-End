import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'sign-in',
      component: () => import('../hostlify/security/sign-in/sign-in.vue')
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
    },
    {
      path: '/mail-box',
      name: 'mail-box',
      component: () => import('../hostlify/mail-box.vue')
    },
      {

      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('../hostlify/security/forgot-password/forgot-password.vue')
    },
    {
      path: '/sign-up-plans',
      name: 'sign-up-plans',
      component: () => import('../hostlify/security/sign-up/sign-up-plans.vue')
    },
    {
      path: '/sign-up-register',
      name: 'sign-up-register',
      component: () => import('../hostlify/security/sign-up/sign-up-register.vue')
    },
    {
      path: '/sign-up-payment',
      name: 'sign-up-payment',
        component: () => import('../hostlify/security/sign-up/sign-up-payment.vue')
    },
    {
      path: '/history',
      name: 'HistoryPage',
      component: () => import('../hostlify/HistoryView.vue'),
      meta: {manager: true}
    },
    {
      path: '/register-guest',
      name: 'registerhuesped',
      component: () => import('../hostlify/Register_Huesped.vue'),
      meta: {manager: true}
    }
  ]
})

export default router
