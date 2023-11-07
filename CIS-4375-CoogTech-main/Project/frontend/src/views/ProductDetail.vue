<template>
    <v-btn @click="goBack" color="#F5F5DC" variant="elevated">
        Back to catalog
    </v-btn>

    <div class="product" v-if="selectedProduct">
        <div class="product-image">
            <!-- Ensure the image source is correctly bound to your selectedProduct -->
            <img :src="selectedProduct.ProductImage" alt="">
        </div>
        <div class="product-details">
            <!-- Update these fields according to your selectedProduct's properties -->
            <p>Name: {{ selectedProduct.ProductName }}</p>
            <p>Color: {{ selectedProduct.ProductColor }}</p>
            <h2>Price: ${{ selectedProduct.ProductPrice }}</h2>
            <v-btn variant="elevated" color="#F5F5DC" @click="addToCart">Add to cart</v-btn>
        </div>
    </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { productsStore } from '../stores/products';
import { useRoute, useRouter } from 'vue-router';

const store = productsStore();
const router = useRouter();
const route = useRoute();

// Fetch products when the component is mounted
onMounted(() => {
  store.fetchProductsFromDB();
});

const selectedProduct = computed(() => {
  // Make sure that your product IDs are numbers in the database
  // If they are strings, remove the Number() cast
  return store.products.find(product => product.ProductID === Number(route.params.id));
});

const addToCart = () => {
  store.addToCart(selectedProduct.value);
  router.push({ name: 'CartView' });
};

const goBack = () => {
  router.push({ name: 'Catalog' });
};
</script>

<style scoped>
.product {
    display: flex;
    margin-top: 50px;
}

.product-image {
    margin-right: 24px;
}
</style>
