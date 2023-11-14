<template>
    <div class="page">
        <div class="topbar">
            <input v-model="search" @keyup.enter="performSearch" class="search-input" placeholder="Search products..." />
            <label for="productType" class="dropdown-label">Select Type:</label>
            <select v-model="selectedType" id="productType" class="dropdown">
                <option value="">All</option>
                <option value="Tshirt">Tshirts</option>
                <option value="Candy">Candy</option>
                <option value="Tumbler">Tumblers</option>
                <option value="Balloon">Balloons</option>
                <!-- Add options for other types as needed -->
            </select>
            <!-- Add buttons for other types as needed -->
            <button @click="resetFilters" class="button">Reset Filter</button>
            <router-link to="/customorder" class="link">
                    <span class="material-icons items-center">add_box</span> Want something Custom?
            </router-link>
        </div>
            <!-- Product list and other content here -->
            <div class="product-row">
                <div v-for="product in products" :key="product.ProductID">
                    <product-item :product="product" @item-clicked="goToProductPage(product)" />
                </div>
            </div>
    </div>
</template>
  
<script>
import ProductItem from "@/components/ProductItem.vue";
import { defineComponent, watch } from "vue";
import { productsStore } from "@/stores/products";
import { useRouter } from "vue-router";

export default defineComponent({
    name: "Catalog",
    components: {
        ProductItem,
    },
});
</script>
  
<script setup>
import { ref, onMounted } from "vue";
import { productsStore } from "@/stores/products";
import { useRouter } from "vue-router";

const store = productsStore();
const router = useRouter();
const search = ref("");
const products = ref([]);
const selectedType = ref("");

watch(selectedType, () => {
    fetchProductsFromAPI();
});

const performSearch = () => {
    fetchProductsFromAPI();
};

const fetchProductsFromAPI = async () => {
    try {
        const response = await fetch("http://localhost:8080/adminData/Products");
        if (response.ok) {
            const data = await response.json();
            products.value = data.filter(product => 
                product.ProductName.toLowerCase().includes(search.value.toLowerCase()) &&
                (!selectedType.value || product.ProductType === selectedType.value)
            );
        } else {
            console.error("Failed to fetch products from the API");
        }
    } catch (error) {
        console.error("Error fetching products:", error);
    }
};

const resetFilters = () => {
    search.value = "";
    selectedType.value = null;
    fetchProductsFromAPI();
};

const goToProductPage = (product) => {
    router.push({ name: "ProductDetail", params: { id: product.ProductID, product } });
};

onMounted(() => {
    fetchProductsFromAPI();
});
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.topbar {
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: -20px;
}

.search-input {
  flex: 1;
  margin-right: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.dropdown {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  font-size: 16px;
  margin-right: 30px;
}
.dropdown-label {
  padding: 8px;
  font-size: 16px;
  margin-right: 10px;
}

.button {
background-color: #ff6b81;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.button:hover {
    background-color: #e74c3c;
}

.link {
  text-decoration: none;
  color: #333;
  margin-left: 10px;
  font-size: 16px;
  padding: 5px;
}

.link:hover {
  color: #4caf50;
}

.product-row {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  justify-content: left;
}


</style>
  
