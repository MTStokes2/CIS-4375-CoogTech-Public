<script>

import axios from 'axios'

const apiURL = import.meta.env.VITE_ROOT_API

 

export default {

  name: 'App',

  data() {

    return {

      orgName: 'CRAFT SHACK'

    }

  },

  created() {

    axios.get(`${apiURL}/org`).then((res) => {

      this.orgName = res.data.name

    })

  }

}

</script>

<template>

  <div id="landing-page" class="bg-pink-200">

    <!-- Header -->

    <header class="bg-green-700 py-4 px-6 shadow-md flex justify-between items-center ">

      <div class="grow w-4/5">

        <section class="justify-between items-center h-24 flex">

          <div class="flex items-center">

            <h1 class="mr-80  bold text-3xl text-pink-200">{{ this.orgName }}</h1>

          </div>

          <div class="flex space-x-4">

            <a href="#about-us" class="text-pink-200 hover:text-pink-700" @click="scrollToAboutUs">

              <span style="position: relative; top: 6px" class="material-icons">search</span>

              About Us

            </a>

            <router-link to="/contact" class="text-pink-200 hover:text-pink-700">

              <span style="position: relative; top: 6px" class="material-icons">phone</span>

              Contact Us

            </router-link>

            <router-link to="/loginpage" class="text-pink-200 hover:text-pink-700">

              <span style="position: relative; top: 6px" class="material-icons">person</span>

              Login

            </router-link>

 

          </div>

        </section>

      </div>

    </header>

    <div>

      <main class="mt-20">

        <router-view></router-view>

      </main>

    </div>

  </div>

</template>

<style>

/* Remove the background-color from #_container */

/* #_container {

  background-color: #c8102e;

  color: white;

  padding: 18px;

} */

</style>