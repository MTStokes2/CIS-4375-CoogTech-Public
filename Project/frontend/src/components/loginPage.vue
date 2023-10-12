<template>

  <div class="bg-pink-200 min-h-screen flex flex-col items-center">

    <form class="bg-pink-200 p-20 rounded shadow-md">

      <h2 class="text-3xl text-green-700 font-bold mb-6">Login</h2>

 

      <div class="mb-4">

        <label class="block text-green-700 text-sm font-bold mb-2" for="username">Username</label>

        <input class="w-full py-2 px-3 border border-green-300 rounded focus:outline-none focus:border-green-500"

          type="text" id="username" placeholder="Enter your username" />

      </div>

 

      <div class="mb-6">

        <label class="block text-green-700 text-sm font-bold mb-2" for="password">Password</label>

        <input class="w-full py-2 px-3 border border-green-300 rounded focus:outline-none focus:border-green-500"

          type="password" id="password" placeholder="Enter your password" />

      </div>

 

      <div v-if="showError" class="text-red-600 font-bold mb-4">

        Invalid credentials. Please try again.

      </div>

 

      <div class="flex items-center justify-between">

        <button

          class="bg-green-700 hover-bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"

          type="button" @click="handleLogin">

          Login

        </button>

      </div>

    </form>

    <p class="mt-4 text-green-700 text-sm">

      Don't have an account? <router-link to="/signuppage" class="text-green-700 font-bold">Sign up</router-link>

    </p>

  </div>

</template>

 

<script>

export default {

  data() {

    return {

      showError: false, // Initially, hide the error message

    };

  },

  methods: {

    handleLogin() {

      const usernameInput = document.getElementById('username').value;

      const passwordInput = document.getElementById('password').value;

 

      // Check if the entered credentials match the hardcoded ones

      if (usernameInput === 'e' && passwordInput === 'e') {

        // Redirect to the shop page

        this.$router.push('/shop'); // Assuming you're using Vue Router

      } else {

        // Show the error message

        this.showError = true;

      }

    },

  },

};

</script>

 

<style>

/* Add any additional CSS styling for your login page components here */

</style>