<template>
    <div class="products-list">
        <v-text-field clearable label="Search by Type" v-model="search" @input="filterProducts"
              prepend-icon="mdi-magnify"></v-text-field>

        <v-row no-gutters>
            <v-col v-for="product in filteredProducts" :key="product.id" cols="12" sm="4"
                @click="goToProductPage(product.id)">
                <product-item :product-data="product" @item-clicked="goToProductPage" />
            </v-col>
        </v-row>
    </div>
</template>
  
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

const goToProductPage = (productID) => {
    router.push({ name: 'ProductDetail', params: { id: ProductID } });
}

onMounted(async () => {
    await store.fetchProductsFromDB()
});

function filterProducts() {
    // Filtering is handled by the computed property filteredProducts
    // No need to do anything here
}
</script>
  
<style scoped></style>