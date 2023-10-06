<template>
  <div id="landing-page" class="h-screen flex flex-col justify-center items-center bg-pink-500">
    <!-- Header with Sign-up and Login buttons -->
    <header class="absolute top-0 right-0 p-4">
      <button @click="goToSignUp" class="bg-pink-500 text-white py-2 px-4 rounded-md mr-4">Sign Up</button>
      <button @click="goToLogin" class="bg-pink-500 text-white py-2 px-4 rounded-md">Login</button>
    </header>

    <div></div>
    <!-- Welcome Section -->
    <section class="text-white text-center mb-8">
      <h1 class="text-5xl font-bold mb-3">Welcome to TheCraftShack</h1>
      <!-- Add the image under the title -->
      <p class="text-lg">Discover a wide range of high-quality candles and stylish t-shirts.</p>
    </section>

    <!-- Product Section -->
    <section class="text-white text-center mb-8">
      <h2 class="text-3xl font-bold mb-2">Our Products</h2>
      <div class="grid grid-cols-2 gap-4">
        <!-- Example product cards -->
        <div class="p-4 border rounded-lg shadow-lg">
          <img src="@/assets/candle2.jpg" alt="Product 1" class="w-full h-60 rounded-lg object-cover mb-2">
          <h3 class="text-lg font-semibold">Product 1</h3>

        </div>
        <div class="p-4 border rounded-lg shadow-lg">
          <img src="@/assets/candle1.jpg" alt="Product 2" class="w-full h-60 rounded-lg object-cover mb-2">
          <h3 class="text-lg font-semibold">Product 2</h3>

        </div>
        <!-- Add more product cards here -->
      </div>
    </section>

    <!-- Shop Now Button -->
    <button class="bg-pink-500 text-white py-2 px-4 rounded-md text-xl mt-8">Shop Now</button>
  </div>
</template>

<script>
export default {
  methods: {
    goToSignUp() {
      this.$router.push('/signuppage');
    },
    goToLogin() {
      this.$router.push('/loginpage');
    },
  }
};
</script>

<style>
#landing-page {
  background-color: #ff6b81;
  /* Pink background */
}

/* Style the header buttons */
header button {
  background-color: #2b6cb0;
  /* Blue background */
}

/* Style the Shop Now button */
section button {
  background-color: #2b6cb0;
  /* Blue background */
}

/* Add any additional CSS styling for your landing page components here */
</style>