<template>
    <div id="landing-page" style="background-color: #ffb7c2;">
        <!-- Hero Section -->
        <section class="text-green-700 py-16">
            <div class="container mx-auto text-center">
                <h1 class="text-5xl font-bold mb-4" style="color: rgb(4, 69, 4);">Discover Our Unique Collection</h1>
                <p class="text-lg font-bold mb-8 text-white-500" style="color: rgb(4, 69, 4);">Explore a wide range of
                    high-quality balloons and stylish t-shirts.</p>
                <router-link to="/catalog" class="custom-button">Shop Now</router-link>
            </div>
        </section>

        <!-- Product Section -->
        <section class="py-16 bg-pink-200">
            <div class="container mx-auto text-center">
                <h2 class="text-5xl font-bold mb-4" style="color: rgb(4, 69, 4);">Featured Products</h2>
                <br><br>
                <div class="grid grid-cols-3 gap-8">
                    <!-- Product 1 -->
                    <div class="relative">
                        <img src="@/assets/candle1.jpg" alt="Candle 1" class="rounded-lg"
                            style="width: 600px; height: 400px;">
                        <div
                            class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-400 transition-opacity">
                            <a href="/product/1" class="text-white text-lg font-semibold hover:underline">View Details</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- About Us Section -->
        <section id="about-us" style="background-color: #fcbdc8;">
            <div class="container mx-auto text-center">
                <h2 class="text-5xl font-bold mb-4" style="color: rgb(4, 69, 4);">About Us</h2>
                <p class="text-green-700 text-sm mb-4" style="color: rgb(4, 69, 4);">
                    Starting my craft business was a labor of love that emerged from a passion for creativity and a desire
                    to
                    balance my roles as a mom of four energetic kids and a full-time elementary school worker. It all began
                    with a
                    simple idea: to turn my crafting hobbies into a fulfilling side hustle. After putting in countless late
                    nights
                    and
                    weekends, I honed my skills in making shirts, crafting beautiful balloon decor, designing custom
                    tumblers, and
                    creating eye-catching banners. Juggling work, motherhood, and this budding venture was challenging, but
                    it
                    became
                    a source of joy and an outlet for my artistic expression. As word spread about my unique creations, I
                    decided to
                    take the leap and turn my passion into a full-fledged business, sharing my crafts with the world and
                    proving
                    that
                    with determination and a sprinkle of creativity, dreams can take flight.
                </p>
            </div>
            <!-- footer -->
            <footer class="bg-green-700 py-4 px-6 shadow-md flex justify-between items-center"
                style="background-color: rgb(245, 245, 220);">
                <div class="container mx-auto flex justify-center items-center">
                    <!-- Copyright text -->
                    <p class="text-pink-200 text-sm" style="color: rgb(4, 69, 4);">&copy; 2023 CraftShack. All rights
                        reserved.</p>
                </div>
            </footer>
        </section>
    </div>
</template>
<script>
import { ref } from "vue";
import { productsStore } from "@/stores/products";

export default {
    name: "CatalogView",
    setup() {
        const store = productsStore();
        const search = ref('');

        return {
            store,
            search
        };
    },
};
</script>
  
<style scoped>
/* Add any additional CSS styling for your landing page components here */
/* You can customize this further to match your desired design */
.product-list {
    display: flex;
    justify-content: space-between;
}

.product {
    flex: 0 0 48%;
    /* Display two products per row */
    margin: 1%;
    padding: 20px;
    background-color: white;
    border: 1px solid #ddd;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
  
  
  
  
  
  
  
  
  
  
  