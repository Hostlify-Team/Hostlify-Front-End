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
      path: '/services',
      name: 'services',
      component: () => import('../hostlify/services.vue')
    },
    {
      path: '/step-1',
      name: 'step1',
      component: () => import('../hostlify/step-1.vue')
    },
    {
      path: '/step-2',
      name: 'step2',
      component: () => import('../hostlify/step-2.vue')
    },
    {
      path: '/step-3',
      name: 'step3',
      component: () => import('../hostlify/step-3.vue')
    },
    {
      path: '/step-4',
      name: 'step4',
      component: () => import('../hostlify/step-4.vue')
    }
  ]
})

export default router
