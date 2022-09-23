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
      path: '/sign-up-plans',
      name: 'sign-up-plans',
      component: () => import('../hostlify/security/sign-up/sign-up-plans.vue')
    },
    {
      path: '/sign-up-register',
      name: 'sign-up-plans',
      component: () => import('../hostlify/security/sign-up/sign-up-register.vue')
    },
    {
      path: '/sign-up-payment',
      name: 'sign-up-plans',
      component: () => import('../hostlify/security/sign-up/sign-up-payment.vue')
    }
  ]
})

export default router
