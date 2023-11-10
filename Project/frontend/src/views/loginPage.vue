<template>
  <div class="login-form">
      <form @submit.prevent="login" class="p-5 rounded shadow-md center">
          <h2 class="text-4xl text-green-900 font-bold mb-6">Login</h2>
          <div class="mb-4">
              <label class="block text-2xl text-green-900 font-bold mb-2" for="username">Username</label>
              <input class="py-2 px-3 text-xl border border-green-300 rounded focus:outline-none focus:border-green-500"
                  type="text" id="username" v-model="username" required placeholder="Enter your username" />
          </div>

          <div class="mb-6">
              <label class="block text-2xl text-green-900 font-bold mb-2" for="password">Password</label>
              <div class="password-input">
                  <input
                      class="py-2 px-3 text-xl border border-green-300 rounded focus:outline-none focus:border-green-500"
                      id="password" v-model="password" :type="showPassword ? 'text' : 'password'" required
                      placeholder="Enter your password" />
              </div>
              <label class="block text-1xl text-green-900 font-bold mb-2">
                  <input type="checkbox" @click="togglePasswordVisibility"> Show Password
              </label>
          </div>

          <div v-if="error" class="text-red-600 font-bold mb-4 text-2xl">
              {{ error }}
          </div>

          <div class="flex items-center justify-between">
              <button type="submit" class="custom-button text-2xl">Login</button>
          </div>
          <p class="mt-4 text-green-900 text-2xl">
              <router-link to="/resetpassword" class="text-green-700 font-bold">Forget Password</router-link>

          </p>
          <p class="mt-4 text-green-900 text-2xl">
              Don't have an account? <router-link to="/signup" class="text-green-700 font-bold">Sign up</router-link>
          </p>
      </form>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      error: '',
      showPassword: false,
    };
  },
  methods: {

    togglePasswordVisibility() {
            // Toggle the visibility of the password
            this.showPassword = !this.showPassword;
        },

    async login() {
      try {
        if (!this.username || !this.password) {
          this.error = 'Username and password are required';
          return;
        }

        const response = await axios.post('http://localhost:8080/Login', {
          Username: this.username,
          Password: this.password
        }, {
          withCredentials: true // Include credentials (cookies) with the request
        });

        console.log('Login successful');
        
        const role = response.data.role;

        // Redirect based on user role
        if (role === 'customer') {
          // Redirect to the previous route or the desired protected route
          const redirectPath = this.$route.query.redirect || '/catalog';
          this.$router.push(redirectPath).then(() => {
            window.location.reload();
          });
        } else if (role === 'admin') {
          const redirectPath = this.$route.query.redirect || '/AdminDashboard';
          this.$router.push(redirectPath).then(() => {
            window.location.reload();
          });
        } else {
          console.error('Unknown role:', role);
        }

      } catch (error) {
        console.error('Login failed:', error);
        if (error.response) {
          if (error.response.status === 404) {
            this.error = 'Username not found';
          } else if (error.response.status === 401) {
            this.error = 'Incorrect password';
          } else {
            this.error = 'Internal Server Error';
          }
        } else if (error.request) {
          this.error = 'No response from server';
        } else {
          this.error = 'Error setting up the request';
        }
      }
    }
  }
};
</script>
  
<style>
.custom-button {
    background-color: #F5F5DC;
    color: rgb(6, 77, 27);
    padding: 10px 20px;
    text-decoration: none;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
}

.custom-button:hover {
    background-color: #F5F5DC;
}

.password-input {
    display: flex;
    align-items: center;
}
</style>
