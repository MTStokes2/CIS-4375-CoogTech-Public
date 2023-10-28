<template>
    <div id="landing-page"></div>
    <section class="text-green-700 py-16">
        <div class="container mx-auto text-center">
            <h1 class="text-5xl font-bold mb-4" style="color: rgb(4, 69, 4);">Discover Our Unique Collection</h1>
            <p class="text-lg font-bold mb-8 text-white-500" style="color: rgb(4, 69, 4);">Explore a wide range of
                high-quality balloons and stylish t-shirts.</p>
            <router-link to="/catalog" class="custom-button">Shop Now</router-link>
        </div>
    </section>

    <!-- Product Section -->
    <section>
        <div class="container mx-auto text-center">
            <h2 class="text-3xl font-bold mb-4" style="color: rgb(4, 69, 4);">Featured Products</h2>
            <br><br>
            <div class="grid grid-cols-3 gap-8">
                <!-- Product 1 -->
                <div class="relative">
                    <img :src="image1" alt="Product 1" class="rounded-lg" style="width: 600px; height: 400px;">
                    <!-- ... -->
                </div>
                <!-- Product 2 -->
                <div class="relative">
                    <img :src="image2" alt="Product 2" class="rounded-lg" style="width: 600px; height: 400px;">
                    <!-- ... -->
                </div>
                <!-- Product 3 -->
                <div class="relative">
                    <img :src="image3" alt="Product 3" class="rounded-lg" style="width: 600px; height: 400px;">
                    <!-- ... -->
                </div>
                <!-- More product elements... -->
            </div>
        </div>
    </section>
    <br>

    <!-- About Us Section -->
    <section id="about-us">
        <div class="container mx-auto text-center">
            <h2 class="text-3xl font-bold mb-2" style="color: rgb(4, 69, 4);">About us</h2>
            <p class="text-green-700 text-sm mb-2" style="color: rgb(4, 69, 4);">
                Starting my craft business was a labor of love that emerged from a passion for creativity and a desire to
                balance my roles as a mom of four energetic kids and a full-time elementary school worker. It all began with
                a simple idea: to turn my crafting hobbies into a fulfilling side hustle. After putting in countless late
                nights and weekends, I honed my skills in making shirts, crafting beautiful balloon decor, designing custom
                tumblers, and creating eye-catching banners. Juggling work, motherhood, and this budding venture was
                challenging, but it became a source of joy and an outlet for my artistic expression. As word spread about my
                unique creations, I decided to take the leap and turn my passion into a full-fledged business, sharing my
                crafts with the world and proving that with determination and a sprinkle of creativity, dreams can take
                flight.
            </p>
        </div>
    </section>
    <br>
</template>
  
<script>
import { ref, onMounted } from 'vue';

export default {
  data() {
    return {
      image1: '',
      image2: '',
      image3: ''
    };
  },
  mounted() {
    fetch('/s3-images')
      .then(response => response.json())
      .then(imageUrls => {
        this.image1 = imageUrls[0];
        this.image2 = imageUrls[1];
        this.image3 = imageUrls[2];
      });
  }
};
</script>
  
<style scoped>
/* Add any additional CSS styling for your landing page components here */
/* You can customize this further to match your desired design */

/* Set the background color of the body element to yellow */
body {
    background-color: yellow;
}

.custom-button {
    background-color: #F5F5DC;
    color: rgb(9, 135, 66);
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