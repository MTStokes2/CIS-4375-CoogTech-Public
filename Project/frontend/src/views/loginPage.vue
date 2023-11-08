<template>
  <div class="login-form">
      <form @submit.prevent="login" class="p-5 rounded shadow-md center">
          <h2 class="text-3xl text-green-900 font-bold mb-6">Login</h2>
          <div class="mb-4">
              <label class="block text-green-900 text-sm font-bold mb-2" for="username">Username</label>
              <input class="py-2 px-3 border border-green-300 rounded focus:outline-none focus:border-green-500"
                  type="text" id="username" v-model="username" required placeholder="Enter your username" />
          </div>

          <div class="mb-6">
              <label class="block text-green-900 text-sm font-bold mb-2" for="password">Password</label>
              <input class="py-2 px-3 border border-green-300 rounded focus:outline-none focus:border-green-500"
                  type="password" id="password" v-model="password" required placeholder="Enter your password" />
          </div>

          <div v-if="error" class="text-red-600 font-bold mb-4">
              {{ error }}
          </div>

          <div class="flex items-center justify-between">
              <button type="submit" class="custom-button">Login</button>
          </div>
          <p class="mt-4 text-green-900 text-sm">
              <router-link to="/resetusername" class="text-green-700 font-bold">Forget Username</router-link> |
              <router-link to="/resetpassword" class="text-green-700 font-bold">Forget Password</router-link>
          </p>
          <p class="mt-4 text-green-900 text-sm">
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
      error: ''
    };
  },
  methods: {
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

        // Set the access-token cookie here (if response.data.token contains the token)
        document.cookie = `access-token=${response.data.token}; Secure; SameSite=None`;

        // Redirect based on user role
        if (role === 'customer') {
          this.$router.push('/catalog');
        } else if (role === 'admin') {
          this.$router.push('/AdminDashboard');
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
    color: rgb(189, 12, 12);
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
</style>