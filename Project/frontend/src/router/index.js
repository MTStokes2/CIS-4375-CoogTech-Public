import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'landingpage',
    component: () => import('../components/landingPage.vue'),
  },
  {
    path: '/signuppage',
    name: 'signuppage',
    component: () => import('../components/signupPage.vue'),
  },
  {
    path: '/loginpage',
    name: 'loginpage',
    component: () => import('../components/loginPage.vue'),
  },
  // Add your other routes here
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;