<template>
    <div id="landing-page"></div>
    <section class="text-green-900 py-16">
        <div class="container mx-auto text-center">
            <h1 class="text-5xl font-bold mb-4" style="color: rgb(4, 69, 4);">Discover Our Unique Collection</h1>
            <p class="text-lg font-bold mb-8 text-white-500" style="color: rgb(4, 69, 4);">Explore a wide range of
                high-quality balloons and stylish t-shirts.</p>
            <router-link to="/catalog" class="button">Shop Now</router-link>
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
                    <img src="@/assets/Balloon.jpg" alt="Candle 1" class="rounded-lg" style="width: 600px; height: 400px;">
                    <div
                        class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-400 transition-opacity">
                        <a href="/product/1" class="text-white text-lg font-semibold hover:underline">View Details</a>
                    </div>
                </div>
                <!-- Product 1 -->
                <div class="relative">
                    <img src="@/assets/Design.jpg" alt="Candle 1" class="rounded-lg" style="width: 600px; height: 400px;">
                    <div
                        class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-400 transition-opacity">
                        <a href="/product/1" class="text-white text-lg font-semibold hover:underline">View Details</a>
                    </div>
                </div>
                <!-- Product 1 -->
                <div class="relative">
                    <img src="@/assets/Chamoy.jpg" alt="Candle 1" class="rounded-lg" style="width: 600px; height: 400px;">
                    <div
                        class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-400 transition-opacity">
                        <a href="/product/1" class="text-white text-lg font-semibold hover:underline">View Details</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <br>
    <br>

    <!-- About Us Section -->
    <section id="about-us">
        <div class="container mx-auto text-center">
            <h2 class="text-4xl font-bold mb-2" style="color: rgb(4, 69, 4);">About us</h2>
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
  
  
<style scoped>

.button {
    margin: 5px;
  background-color: #ff6b81;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  margin-top: 10px; 
}

.button:hover {
  background-color: #e74c3c;
}
</style>