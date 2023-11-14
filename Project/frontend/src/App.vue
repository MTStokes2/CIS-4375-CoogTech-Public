<template>
  <div id="landing-page">
    <header class="py-4 px-6 shadow-md flex justify-between items-center" style="background-color: #F5F5DC;">
      <div class="grow w-4/5">
        <section class="justify-between items-center h-24 flex">
          <div class="flex items-center">
            <h1 class="mr-80 bold text-3xl text-green-200">{{ orgName }}</h1>
          </div>
          <div class="flex space-x-4">
            <a href="#about-us" class="text-green-200 hover:text-green-200">
              <span style="position: relative; top: 6px" class="material-icons">search</span>
              About Us
            </a>
            <a href="#contact-us" class="text-green-200 hover:text-green-200">
              <span style="position: relative; top: 6px" class="material-icons">phone</span>
              Contact Us
            </a>
            <router-link to="/login" class="text-green-200 hover:text-green-200">
              <span style="position: relative; top: 6px" class="material-icons">person</span>
              Login
            </router-link>
          </div>
        </section>
      </div>
    </header>
    <main class="mt-20">
      <router-view></router-view>
    </main>

    <!-- Footer section -->
    <section id="contact-us"></section>
    <footer style="background-color: #F5F5DC;">
      <div class="container mx-auto text-center">
        <div class="grid grid-cols-3 gap-8 py-8">
          <!-- Contact Us Column -->
          <div>
            <h2 class="text-lg font-semibold mb-2">Contact Us</h2>

            <!-- Phone Number -->
            <div class="mb-2">
              <a :href="'tel:' + phoneNumber" class="text-green-900 hover:text-green-700">
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
                class="text-green-900 hover:text-green-700 mx-4">
                <i class="fa fa-instagram fa-lg"></i> <!-- fa-lg for larger size -->
              </a>
              <a :href="facebookLink" target="_blank" rel="noopener noreferrer"
                class="text-green-900 hover:text-green-700 mx-4">
                <i class="fa fa-facebook fa-lg"></i>
              </a>
              <a :href="tiktokLink" target="_blank" rel="noopener noreferrer"
                class="text-green-900 hover:text-green-700 mx-2">
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
import axios from 'axios';
const apiURL = import.meta.env.VITE_ROOT_API;

export default {
  name: 'App',
  data() {
    return {
      orgName: 'CRAFT SHACK',
      loggedIn: false,
      role: '',
      phoneNumber: "(832)724-3673", // Add your actual phone number here
      email: "VargasErikaY@gmail.com", // Add your actual email here
      instagramLink: "https://www.instagram.com/TheCraftShack", // Add your actual Instagram link here
      facebookLink: "https://www.facebook.com/TheCraftShack", // Add your actual Facebook link here
      tiktokLink: "https://www.tiktok.com/@TheCraftShack", // Add your actual TikTok link here
    };
  },
  created() {
    axios.get(`${apiURL}/org`).then((res) => {
      this.orgName = res.data.name;
    });
  },
};
</script>

<style scoped>
/* Your existing styles remain unchanged */
</style>