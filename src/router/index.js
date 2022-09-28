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
    }
  ]
})

export default router
