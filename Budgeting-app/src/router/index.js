import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/Homepage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/pages/LoginPage.vue'),
    },
    {
      path: '/login',
      redirect: '/',
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/pages/Homepage.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../pages/AboutPage.vue'),
    },
    {
      path: '/trip/add',
      name: 'trip/add',
      component: () => import('@/pages/TripAddPage.vue'),
    },
    {
      path: '/transaction',
      name: 'transaction',
      component: () => import('@/pages/TransactionAdd.vue'),
    },
    {
      path: '/transactionList',
      name: 'transactionList',
      component: () => import('@/pages/TransactionList.vue'),
    },
    {
      path: '/transactionDetail/:id',
      name: 'transactionDetail',
      component: () => import('@/pages/TransactionDetail.vue'),
    },
    {
      path: '/exchangeDetail',
      name: 'exchangeDetail',
      component: () => import('@/pages/ExchangeDetail.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/pages/SignupPage.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/pages/Profile.vue'),
    },
    {
      path: '/profile/edit',
      name: 'profileEdit',
      component: () => import('@/pages/ProfileEdit.vue'),
    },
  ],
});

export default router;
