import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/Homepage.vue';
import TransactionCheckList from '@/pages/TransactionCheckList.vue';
import TransactionCalendar from '@/pages/TransactionCalendar.vue';
import TransactionSummary from '@/pages/TransactionSummary.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/about',
      name: 'about',
      component: () => import('../pages/AboutPage.vue'),
    },
    {
      path: '/TransactionCheckList/:groupId',
      name: 'TransactionCheckList',
      component: TransactionCheckList,
    },
    {
      path: '/TransactionCalendar',
      name: 'TransactionCalendar',
      component: TransactionCalendar,
    },

    {
      path: '/TransactionSummary',
      name: 'TransactionSummary',
      component: TransactionSummary,
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
      path: '/',
      name: 'home',
      component: () => import('@/pages/Homepage.vue'),
    },
    {
      path: '/exchangeDetail',
      name: 'exchangeDetail',
      component: () => import('@/pages/ExchangeDetail.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/LoginPage.vue'),
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
