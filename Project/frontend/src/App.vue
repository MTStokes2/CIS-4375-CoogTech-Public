<template>
  <div id="landing-page" :style="{ backgroundColor: customBackgroundColor }">
    <!-- Header -->
    <header class="bg-green-700 py-4 px-6 shadow-md flex justify-between items-center">
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
    <div>
      <main class="mt-20">
        <router-view></router-view>
      </main>
    </div>
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
      customBackgroundColor: 'var(--custom-background-color)',
    };
  },
  created() {
    axios.get(`${apiURL}/org`).then((res) => {
      this.orgName = res.data.name;
      // Set the custom background color here
      this.customBackgroundColor = 'var(--custom-background-color)';
    });
  },
};
</script>

<style scoped>
#landing-page {
  /* This CSS custom property allows dynamic background color */
  --custom-background-color: rgb(245, 245, 220);
  /* Change to pink color */
  /* Default color or use any other color you prefer */
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