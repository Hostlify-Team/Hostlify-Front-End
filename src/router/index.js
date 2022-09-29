import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainLayout from "../layouts/MainLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'sign-in',
      component: () => import('../hostlify/security/sign-in/sign-in.vue'),
      meta: {hideNavbar: true,}
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
    },{
      path: '/',
      name: 'forgot-password',
      component: () => import('../hostlify/security/forgot-password/forgot-password.vue'),
      meta: {hideNavbar: true,}
    },
    {
      path: '/sign-up-plans',
      name: 'sign-up-plans',
      component: () => import('../hostlify/security/sign-up/sign-up-plans.vue'),
      meta: {hideNavbar: true,}
    },
    {
      path: '/sign-up-payment',
      name: 'sign-up-payment',
      component: () => import('../hostlify/security/sign-up/sign-up-payment.vue'),
      meta: {hideNavbar: true,}
    },
    {
      path: '/sign-up-register',
      name: 'sign-up-register',
      component: () => import('../hostlify/security/sign-up/sign-up-register.vue'),
      meta: {hideNavbar: true,}
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
      path: '/rooms',
      name: 'rooms',
      component: () => import('../hostlify/Rooms_Table.vue'),
      meta: {manager: true}
    }
  ]
})
export default router

