import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/Homepage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/AboutPage.vue'),
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
      path: '/home',
      name: 'home',
      component: () => import('@/pages/Homepage.vue'),
    },
    {
      path: '/exchangeDetail',
      name: 'exchangeDetail',
      component: () => import('@/pages/ExchangeDetail.vue'),
    },
  ],
});

export default router;
