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
            <router-link to="/contact" class="text-green-200 hover:text-green-200">
              <span style="position: relative; top: 6px" class="material-icons">phone</span>
              Contact Us
            </router-link>
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
    <footer style="background-color: #F5F5DC;">
      <div class="text-center">

        <p class="text-green-700 text-sm" style="color: rgb(4, 69, 4);">&copy; 2023 CraftShack. All rights reserved.</p>
        <br>
      </div>
    </footer>
  </div>
</template>
<script>
const apiURL = import.meta.env.VITE_ROOT_API;


</script>
<style scoped>
#landing-page {
  /* This CSS custom property allows dynamic background color */
  --custom-background-color: #ffb7c2;
  /* Set background color of the #landing-page container to yellow */
  background-color: #ffb7c2;
}

/* Set the background color of the entire body to yellow */
body {
  background-color: #ffb7c2;
}

/* Override text color with !important */
.text-green-200 {
  color: rgb(4, 69, 4) !important;
}

/* Align the links and name to their respective sides */
.flex {
  justify-content: space-between;
}
</style>
