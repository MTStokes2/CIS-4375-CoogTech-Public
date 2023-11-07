import { createRouter, createWebHistory } from 'vue-router';
import Catalog from '../views/Catalog.vue';
import ProductDetail from '../views/ProductDetail.vue';
import Cart from '../views/Cart.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/catalog',
      name: 'Catalog',
      component: Catalog
    },
    {
      path: '/product/:id',
      name: 'ProductDetail',
      component: ProductDetail
    },
    {
      path: '/cart',
      name: 'CartView',
      component: Cart
    },
    {
      path: '/',
      props: true,
      component: () => import('../views/homePage.vue')
    },
    {
      path: '/contact',
      name: 'Contact',
      component: () => import('../views/contactUs.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/loginPage.vue')
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('../views/signupPage.vue')
    },
    {
      path: '/orderhistory',
      name: 'orderhistory',
      component: () => import('../views/orderHistory.vue')
    },
    {
      path: '/customorder',
      name: 'customorder',
      component: () => import('../views/CustomOrder.vue')
    },
    {
      path: '/resetpassword',
      name: 'resetpassword',
      component: () => import('../views/ResetPassword.vue')
    },
    {
      path: '/resetusername',
      name: 'resetusername',
      component: () => import('../views/ResetUsername.vue')
    }
  ]
});

export default router;
