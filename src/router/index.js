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
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/rooms',
      name: 'rooms',
      component: () => import('../hostlify/Rooms_Table.vue'),
      meta: {manager: true}
    },
    {
      path: '/register-guest',
      name: 'Register-Huesped',
      component: () => import('../hostlify/Register_Huesped.vue'),
      meta: {manager: true}
    },
    {
      path: '/history',
      name: 'HistoryView',
      component: () => import('../hostlify/HistoryView.vue'),
      meta: {manager: true}
    },
    {
      path: '/services',
      name: 'services',
      component: () => import('../hostlify/services.vue')
    }
  ]
})
export default router

