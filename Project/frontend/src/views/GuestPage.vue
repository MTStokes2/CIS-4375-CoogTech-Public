<template>
    <div class="main-content">

        <div class="product-row">
            <div v-for="product in products" :key="product.ProductID" class="product-column">
                <product-item :product="product" @item-clicked="goToProductPage(product)" />
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
}

.sidebar {
    width: 200px;
    /* Adjust the width as needed */
    background-color: #f999a8;
    /* Sidebar background color */
    color: rgb(4, 69, 4);
    /* Text color */
    padding: 20px;
    /* Spacing and padding */
    box-sizing: border-box;
}

.sidebar a {
    display: block;
    color: rgb(4, 69, 4);
    text-decoration: none;
    margin-bottom: 20px;
}

.sidebar a:hover {
    text-decoration: underline;
}

.products-list {
    text-align: center;
    flex: 1;
    padding: 20px;
    /* Spacing and padding */
    box-sizing: border-box;
}

.product-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 40px;
    /* Adjust the gap as needed */
}

.product-column {
    flex: 1;
    max-width: 300px;
    /* Adjust the maximum width as needed */
}

h1 {
    margin-bottom: 20px;
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
