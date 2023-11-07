<template>
    <div class="full-page">
        <!-- Sidebar -->
        <div class="sidebar">
            <router-link to="orderhistory">
                <div class="tab">
                    <i class="icon">📦</i> Order History
                </div>
            </router-link>
            <br>
            <router-link to="customorder">
                <div class="tab">
                    <i class="icon">🛒</i> Custom Order
                </div>
            </router-link>
            <!-- Add more router-links for other pages as needed -->
        </div>

        <!-- Main content -->
        <div class="main-content">
            <h1>Product Catalog</h1>
            <div class="product-row">
                <div v-for="product in products" :key="product.ProductID" class="product-column">
                    <product-item :product="product" @item-clicked="goToProductPage(product)" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.full-page {
    display: flex;
}

.sidebar {
    width: 150px;
    /* Adjust the width as needed */
    background-color: #fdb3be;
    /* Sidebar background color */
    color: rgb(4, 69, 4);
    /* Text color */
    padding: 10px;
    /* Spacing and padding */
    box-sizing: border-box;
}

.main-content {
    flex: 1;
    /* Take remaining space */
    padding: 10px;
    /* Spacing and padding */
}

/* Additional styles for tabs, icons, etc. go here */
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
    router.push({ name: 'ProductDetail', params: { id: product.ProductID, product } });
};

onMounted(() => {
    fetchProductsFromAPI();
});
</script>
