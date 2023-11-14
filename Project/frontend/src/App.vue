<template>
  <div id="landing-page" class="flex flex-col min-h-screen bg-f8ebe6 justify-center">
    <header class="py-4 px-6 shadow-sm bg-fafafa">
      <div class="container mx-auto flex justify-between items-center">
        <router-link to="/" class="text-gray-600 hover:text-gray-500 flex items-center header-item">
        <h1 class="text-2xl text-gray-700 font-semibold">The Craft Shack</h1>
        </router-link>
      <div class="flex space-x-4">
        <div class="flex space-x-2" v-if="loggedIn && role === 'customer'">
        <router-link to="/AccountInfo" class="text-gray-600 hover:text-gray-500 flex items-center header-item">
          <span class="material-icons">manage_accounts</span> Account Info
        </router-link>
        <router-link to="/orderHistory" class="text-gray-600 hover:text-gray-500 flex items-center header-item">
          <span class="material-icons">history</span> Order History
        </router-link>
        <router-link to="/cart" class="text-gray-600 hover:text-gray-500 flex items-center header-item">
        <span class="material-icons">shopping_cart</span> Cart
      </router-link>
      <a href="/#about-us" class="text-gray-600 hover:text-gray-500 flex items-center header-item">
        <span class="material-icons">info</span> About Us
      </a>
      </div>
      <div class="flex space-x-2" v-if="loggedIn && role === 'admin'">
        <router-link to="/AdminDashboard" class="text-gray-600 hover:text-gray-500 flex items-center header-item">
          <span class="material-icons">calendar_month</span> Calendar
        </router-link>
        <router-link to="/AdminProducts" class="text-gray-600 hover:text-gray-500 flex items-center header-item">
          <span class="material-icons">storefront</span> Products
        </router-link>
        <router-link to="/AdminCustomers" class="text-gray-600 hover:text-gray-500 flex items-center header-item">
          <span class="material-icons">people_alt</span> Customers
        </router-link>
        <router-link to="/AdminOrders" class="text-gray-600 hover:text-gray-500 flex items-center header-item">
          <span class="material-icons">forum</span> Orders
        </router-link>
        <router-link to="/AdminReports" class="text-gray-600 hover:text-gray-500 flex items-center header-item">
          <span class="material-icons">insert_chart</span> Reports
        </router-link>
      </div>
      
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
    
    <!-- Footer section -->
    <section id="#contact-us"></section>
    <footer style="background-color: #FAFAFA;">
      <div class="container mx-auto text-center">
        <div class="grid grid-cols-3 gap-8 py-8">
          <!-- Contact Us Column -->
          <div>
            <h2 class="text-lg font-semibold mb-2 footer-item">Contact Us</h2>

            <!-- Phone Number -->
            <div class="mb-2">
              <a :href="'tel:' + phoneNumber" class="text-green-900 hover:text-green-700 footer-item">
                <span class="material-icons">phone</span> {{ phoneNumber }}
              </a>
            </div>
            <div class="mb-2">
              <a :href="'mailto:' + email" class="text-green-900 hover:text-green-700">
                <span class="material-icons">email</span> {{ email }}
              </a>
            </div>
          </div>

          <!-- Follow Us Column -->
          <div class="flex flex-col justify-center items-center">
            <h2 class="text-lg font-semibold mb-2">Follow Us</h2>
            <div class="flex justify-center items-center mt-4">
              <a :href="instagramLink" target="_blank" rel="noopener noreferrer"
                class="text-green-900 hover:text-green-700 mx-4 footer-item">
                <span class="material-icons">camera_alt</span>
              </a>
              <a :href="facebookLink" target="_blank" rel="noopener noreferrer"
                class="text-green-900 hover:text-green-700 mx-4 footer-item">
                <span class="material-icons">facebook</span>
              </a>
              <a :href="tiktokLink" target="_blank" rel="noopener noreferrer"
                class="text-green-900 hover:text-green-700 mx-2 footer-item">
                <span class="material-icons">tiktok</span>
              </a>
            </div>
          </div>

          <!-- Useful Links and FAQ Column -->
          <div class="flex flex-col justify-center items-center">
            <h2 class="text-lg font-semibold mb-2">Link</h2>
            <div class="text-lg font-semibold mb-2 mt-4">
              <router-link to="/faq" class="text-green-900 hover:text-green-700">
                FAQ
              </router-link>
            </div>
          </div>
        </div>
        <p class="text-green-700 text-sm" style="color: rgb(4, 69, 4);">&copy; 2023 CraftShack. All rights reserved.
        </p>
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
      phoneNumber: "(832)724-3673", 
      email: "VargasErikaY@gmail.com", 
      instagramLink: "https://www.instagram.com/TheCraftShack",
      facebookLink: "https://www.facebook.com/TheCraftShack",
      tiktokLink: "https://www.tiktok.com/@TheCraftShack",
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
  background-color: #f1ebe9;
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
