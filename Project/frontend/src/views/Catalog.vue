<template>
    <div class="full-page">
        <!-- Sidebar -->
        <div class="sidebar">
            <router-link to="orderHistory">
                <div class="tab">
                    <i class="icon">📦</i> Order History
                </div>
            </router-link>
            <br>
            <router-link to="customOrder">
                <div class="tab">
                    <i class="icon">🛒</i> Custom Order
                </div>
            </router-link>
            <!-- Add more router-links for other pages as needed -->
        </div>

        <!-- Main content -->
        <div class="main-content">
            <div class="custom-dropdown">
                <button @click="toggleDropdown">{{ selectedOption }}</button>
                <ul v-if="dropdownVisible">
                    <li @click="goToorderhistory">Order History</li>
                    <li @click="goTocustomorder">Custom Order</li>
                </ul>
            </div>

            <div class="products-list">
                <v-text-field clearable label="Search" v-model="search" @input="filterProducts"
                    prepend-icon="$vuetify"></v-text-field>
                <v-row no-gutters>
                    <v-col v-for="product in filteredProducts" :key="product.id" cols="12" sm="4"
                        @click="goToProductPage(product.id)">
                        <product-item :product-data="product" @item-clicked="goToProductPage" />
                    </v-col>
                </v-row>
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
    width: 800px;
    /* Add the desired width here */
    flex: 1;
    /* Take remaining space */
    padding: 10px;
    /* Spacing and padding */
}

/* Additional styles for tabs, icons, etc. go here */
</style>
<script>
import { defineComponent, computed } from "vue";
import ProductItem from "@/components/ProductItem.vue";
import { productsStore } from "@/stores/products";
import { useRouter } from "vue-router";

export default defineComponent({
    name: 'CatalogView',
    components: {
        ProductItem
    }
});
</script>
  
<script setup>
import { onMounted, ref } from "vue";
import { productsStore } from "@/stores/products";
import { useRouter } from "vue-router";

const store = productsStore()
const router = useRouter()

const search = ref('')

const filteredProducts = computed(() => {
    return store.products.filter(product =>
        product.brand.toLowerCase().includes(search.value.toLowerCase())
    );
});

const goToProductPage = (id) => {
    router.push({ name: 'ProductView', params: { id } });
}

const goToorderhistory = () => {
    router.push({ name: 'orderhistory' }); // Replace 'OrderHistory' with the actual route name
};

const goTocustomorder = () => {
    router.push({ name: 'customorder' }); // Replace 'CustomOrder' with the actual route name
};

onMounted(async () => {
    await store.fetchProductsFromDB()
});

function filterProducts() {
    // Filtering is handled by the computed property filteredProducts
    // No need to do anything here
}
</script>
  
