import { createRouter, createWebHistory } from 'vue-router';
import Catalog from '../views/Catalog.vue';
import ProductDetail from '../views/ProductDetail.vue';
import Cart from '../views/Cart.vue';
import AdminDashboard from '../views/AdminDashboard.vue';

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
      name: 'ProductView',
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
      path: '/CustomerChat',
      name: 'CustomerChat',
      component: () => import('../components/CustomerChat.vue')
    },
    {
      path: '/AdminChat',
      name: 'AdminChat',
      component: () => import('../components/AdminChat.vue')
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
    },
    {
      path: '/orderdetails/:id',
      name: 'OrderDetails',
      component: () => import('../views/OrderDetails.vue')
    },
    {
      path: '/customorderdetails/:id',
      name: 'CustomOrderDetails',
      component: () => import('../views/CustomOrderDetails.vue')
    },
    {
      path: '/OrderedProducts',
      name: 'OrderedProducts',
      component: () => import('../components/OrderedProducts.vue')
    },
    {
      path: '/OrderedCustomProducts',
      name: 'OrderedCustomProducts',
      component: () => import('../components/OrderedCustomProducts.vue')
    },
    {
      path: '/AdminDashboard',
      component: AdminDashboard,
      children: [
        {
          path: 'orders',
          component: () => import('../components/Orders.vue'),
          name: 'Order Management'
        },
        {
          path: 'customers',
          component: () => import('../components/CustomerList.vue'),
          name: 'Customers'
        },
        {
          path: 'chats',
          component: () => import('../components/ChatList.vue'),
          name: 'AdminChats'
        },
        // Include a route for the individual chat if necessary
        {
          path: 'chats/:id',
          component: () => import('../components/ChatWindow.vue'),
          name: 'AdminChatWindow'
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFound.vue')
    }  
  ]
});

export default router;
