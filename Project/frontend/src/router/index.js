import { createRouter, createWebHistory } from 'vue-router'

 

// make all paths and names lowercase for consistency

const routes = [

  {

    path: '/',

    props: true,

    component: () => import('../components/landingPage.vue')

  },

  {

    path: '/contact',

    name: 'contact',

    component: () => import('../components/contactUs.vue')

  },

  {

    path: '/loginpage',

    name: 'loginpage',

    component: () => import('../components/loginPage.vue')

  },

  {

    path: '/signuppage',

    name: 'signuppage',

    component: () => import('../components/signupPage.vue')

  }

]

const router = createRouter({

  history: createWebHistory(),

  routes,

  scrollBehavior(to, from, savedPosition) {

    // Check if the route has a hash (e.g., /#about-us)

    if (to.hash) {

      return {

        el: to.hash,

        behavior: 'smooth'

      }

    }

    // If there is no hash, scroll to the top of the page

    return { top: 0, behavior: 'smooth' }

  }

})

 

export default router

 