<template>

  <div id="landing-page">

    <!-- Hero Section -->

    <section class="text-green-700 py-16">

      <div class="container mx-auto text-center">

        <h1 class="text-5xl font-bold mb-4">Discover Our Unique Collection</h1>

        <p class="text-lg font-bold mb-8 text-white-500">Explore a wide range of high-quality candles and stylish

          t-shirts.</p>

        <router-link to="/shop"

          class="bg-white text-green-700 py-2 px-6 rounded-full text-lg hover:bg-pink-100 hover:text-green-700 transition duration-300 ease-in-out">Shop

          Now</router-link>

      </div>

    </section>

    <!-- Product Section -->

    <section class="py-16 bg-pink-200">

      <div class="container mx-auto text-center">

        <h2 class="text-3xl text-green-700 font-bold mb-4">Featured Products</h2>

        <br><br>

        <div class="grid grid-cols-3 gap-8">

          <!-- Product 1 -->

          <div class="relative">

            <img src="@/assets/candle1.jpg" alt="Candle 1" class="rounded-lg" style="width: 600px; height: 400px;">

            <div

              class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-400 transition-opacity">

              <a href="/product/1" class="text-white text-lg font-semibold hover:underline">View Details</a>

            </div>

          </div>

 

          <!-- Product 2 -->

          <div class="relative">

            <img src="@/assets/candle1.jpg" alt="Candle 1" class="rounded-lg" style="width: 500px; height: 400px;">

            <div

              class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-400 transition-opacity">

              <a href="/product/1" class="text-white text-lg font-semibold hover:underline">View Details</a>

            </div>

          </div>

          <div class="relative">

            <img src="@/assets/candle1.jpg" alt="Candle 1" class="rounded-lg" style="width: 600px; height: 400px;">

            <div

              class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-400 transition-opacity">

              <a href="/product/1" class="text-white text-lg font-semibold hover:underline">View Details</a>

            </div>

          </div>

        </div>

      </div>

    </section>

    <!-- About Us Section -->

    <section id="about-us" class="py-16 bg-pink-200">

      <div class="container mx-auto text-center">

        <h2 class="text-3xl text-green-700 font-bold mb-4">About Us</h2>

        <p class="text-green-700 text-sm mb-4">

          Starting my craft business was a labor of love that emerged from a passion for creativity and a desire to

          balance my roles as a mom of four energetic kids and a full-time elementary school worker. It all began with a

          simple idea: to turn my crafting hobbies into a fulfilling side hustle. After putting in countless late nights

          and

          weekends, I honed my skills in making shirts, crafting beautiful balloon decor, designing custom tumblers, and

          creating eye-catching banners. Juggling work, motherhood, and this budding venture was challenging, but it

          became

          a source of joy and an outlet for my artistic expression. As word spread about my unique creations, I decided to

          take the leap and turn my passion into a full-fledged business, sharing my crafts with the world and proving

          that

          with determination and a sprinkle of creativity, dreams can take flight.

        </p>

      </div>

    </section>

    <!-- Header -->

    <footer class="bg-green-700 py-4 px-6 shadow-md flex justify-between items-center ">

      <div class="container mx-auto flex justify-center items-center">

        <!-- Copyright text -->

        <p class="text-pink-200 text-sm">&copy; 2023 CraftShack. All rights reserved.</p>

      </div>

    </footer>

  </div>

</template>

 

<script>

export default {

  methods: {

    goToSignUp() {

      this.$router.push('/signuppage');

    },

    goToLogin() {

      this.$router.push('/createservice');

    },

  }

};

</script>

 

<style scoped>

/* Add any additional CSS styling for your landing page components here */

/* You can customize this further to match your desired design */

.logo a {

  font-size: 1.5rem;

  font-weight: bold;

}

 

nav ul li {

  display: inline;

}

 

nav a {

  text-decoration: none;

}

 

.buttons button:hover {

  background-color: #2b6cb0;

}

 

.buttons button {

  transition: background-color 0.3s ease-in-out;

}

 

section a:hover {

  background-color: #ff6b81;

  color: #fff;

}

 

section a {

  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;

}

 

.text-custom-green {

  color: #2bf12b;

  /* Replace with your desired green color code */

}

</style>