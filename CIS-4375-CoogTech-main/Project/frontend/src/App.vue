<template>
  <div id="landing-page" class="flex flex-col min-h-screen bg-f8ebe6">
    <header class="py-4 px-6 shadow-sm bg-fafafa">
      <div class="container mx-auto flex justify-between items-center">
        <router-link to="/" class="text-gray-600 hover:text-gray-500 flex items-center header-item">
        <h1 class="text-2xl text-gray-700 font-semibold">The Craft Shack</h1>
        </router-link>
      <div class="flex space-x-4">
        <div class="flex space-x-2" v-if="loggedIn && role === 'customer'">
        <router-link to="/AccountInfo" class="text-gray-600 hover:text-gray-500 flex items-center header-item">
          <span class="material-icons">manage_accounts</span> My Account Info
        </router-link>
        <router-link to="/orderHistory" class="text-gray-600 hover:text-gray-500 flex items-center header-item">
          <span class="material-icons">history</span> Order History
        </router-link>
      </div>
      <router-link to="/cart" class="text-gray-600 hover:text-gray-500 flex items-center header-item">
        <span class="material-icons">shopping_cart</span> Cart
      </router-link>
      <a href="/#about-us" class="text-gray-600 hover:text-gray-500 flex items-center header-item">
        <span class="material-icons">info</span> About Us
      </a>
      <router-link to="/contact" class="text-gray-600 hover:text-gray-500 flex items-center header-item">
        <span class="material-icons">phone</span> Contact Us
      </router-link>
      <router-link to="/" v-if="loggedIn" @click="logout()" class="text-gray-600 hover:text-gray-500 flex items-center header-item">
        <span class="material-icons">exit_to_app</span> Logout
      </router-link>
      <router-link v-else to="/login" class="text-gray-600 hover:text-gray-500 flex items-center header-item">
        <span class="material-icons">login</span> Login
      </router-link>
        </div>
      </div>
    </header>
    
    <main class="flex-grow container mx-auto py-8">
      <router-view></router-view>
    </main>
    
    <footer class="py-4 bg-fafafa">
      <div class="text-center text-gray-600">
        <p class="text-sm">&copy; 2023 CraftShack. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loggedIn: false,
      role: '',
    };
  },
  mounted() {
    // Call the fetchUserInfo method after the component is mounted
    this.fetchUserInfo();
  },
  methods: {
    async fetchUserInfo() {
            try {
                const response = await fetch('http://localhost:8080/UserInformation', {
                    method: 'GET',
                    credentials: 'include', // Use 'include' to send cookies with the request
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (response.ok) {
                  const data = await response.json();
                  this.role = data.role;
                  this.loggedIn = true
                  console.log('User is logged in.', data.role);
                } else {
                    console.error('Failed to fetch user info');
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
          }
      },
    async logout() {
    try {
      const response = await fetch('http://localhost:8080/Logout', {
        method: 'POST',
        credentials: 'include', // Use 'include' to send cookies with the request
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Successfully logged out, update the UI or perform any necessary actions
        this.loggedIn = false; // Update the loggedIn property to false or clear user data
        console.log('Logout successful');
      } else {
        console.error('Failed to logout');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  },
}
};
</script>

<style scoped>
.bg-f8ebe6 {
  background-color: #F8EBE6;
}

.bg-fafafa {
  background-color: #FAFAFA;
}

.header-item {
  padding: 5px
}

.header-item:hover {
  transform: scale(1.1);
  transition: transform 0.3s ease-in-out;
}

</style>