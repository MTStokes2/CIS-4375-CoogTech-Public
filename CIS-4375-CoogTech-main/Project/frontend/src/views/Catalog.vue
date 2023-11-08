<template>
    <div class="page">
        <div class="sidebar">
            <!-- <router-link to="orderHistory">Order History</router-link> -->
            <!-- <router-link to="customOrder">Custom Order</router-link> -->
            <router-link to="customOrder" class="button">Custom Order</router-link>
        </div>

        <div class="main-content">

            <div class="product-row">
                <div v-for="product in products" :key="product.ProductID" class="product-column">
                    <product-item :product="product" @item-clicked="goToProductPage(product)" />
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import ProductItem from "@/components/ProductItem.vue";
import { defineComponent } from "vue";
import { productsStore } from "@/stores/products";
import { useRouter } from "vue-router";

export default defineComponent({
    name: "Catalog",
    components: {
        ProductItem,
    },
});
</script>
  
<style scoped>
.page {
    display: flex;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Modern font */
}

.sidebar {
    width: 200px;
    background-color: #ffb7c2; 
    color: #FFFFFF; /* White text for better readability */
    padding: 20px;
    box-sizing: border-box;
}

.sidebar .button {
    display: block;
    padding: 10px 20px;
    background-color: #eb6bb9;
    color: white;
    border: none;
    border-radius: 4px;
    margin-bottom: 20px;
    text-align: center;
    font-weight: bold;
    text-decoration: none;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* Subtle shadow */
}

.sidebar .button:hover {
    background-color: #c41882;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); /* Enhanced shadow on hover */
}

.main-content {
    flex: 1;
    padding: 20px;
    background-color: #ffffff; /* Pure white for the main content area */
}

.product-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 20px;
}

.product-column {
    flex: 0 1 calc(33.333% - 20px); /* 3 columns layout with gap */
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); /* Subtle shadow */
    background-color: #ffffff; /* Match main content background */
    transition: transform 0.3s ease;
}

.product-column:hover {
    transform: translateY(-5px); /* Slight raise effect on hover */
}

.product-item {
    border-radius: 4px;
    overflow: hidden; /* Ensures inner content conforms to border radius */
}

.product-item img {
    width: 100%;
    height: auto;
    display: block;
}

h1 {
    text-align: center;
    margin-bottom: 40px;
    color: #333; /* Dark text color for headings */
}
</style>

  
<script setup>
import { ref, onMounted } from "vue";
import { productsStore } from "@/stores/products";
import { useRouter } from "vue-router";

const store = productsStore();
const router = useRouter();
const search = ref("");
const products = ref([]);

const fetchProductsFromAPI = async () => {
    try {
        const response = await fetch("http://localhost:8080/adminData/Products");
        if (response.ok) {
            const data = await response.json();
            products.value = data;
        } else {
            console.error("Failed to fetch products from the API");
        }
    } catch (error) {
        console.error("Error fetching products:", error);
    }
};

const goToProductPage = (product) => {
    router.push({ name: "ProductDetail", params: { id: product.ProductID, product } });
};

onMounted(() => {
    fetchProductsFromAPI();
});
</script>
  