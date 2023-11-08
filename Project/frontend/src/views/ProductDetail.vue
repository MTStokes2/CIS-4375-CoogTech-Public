<template>
    <div class="product-details">
        <h1>Product Details</h1>
        <div class="product-column">
            <div class="product-item" v-if="product">
                <v-card style="background-color: #ffb7c2;">
                    <div class="product-image" v-if="product.ProductImage">
                        <img :src="product.ProductImage" alt="Product Image">
                    </div>
                    <h2>{{ product.ProductName }}</h2>
                    <p>Price: ${{ product.ProductPrice }}</p>
                    <p>Type: {{ product.ProductType }}</p>
                    <p>Color: {{ product.ProductColor }}</p>
                    <p>Size: {{ product.ProductSize }}</p>
                    <p>Stock: {{ product.ProductStock }}</p>
                    <div class="quantity-input">
                        <label for="quantity">Qty:</label>
                        <input id="quantity" type="number" v-model="quantity" min="1" :max="product.ProductStock">
                    </div>
                    <v-btn @click="addToCart">Add to Cart</v-btn>
                </v-card>
            </div>
            <div v-else>
                <p>Product not found.</p>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { productsStore } from '@/stores/products';

export default {
    name: 'ProductDetail',
    setup() {
        const router = useRouter();
        const store = productsStore();
        const product = ref(null);
        const quantity = ref(1); // Default quantity is set to 1


        // Fetch product details when the component is mounted
        onMounted(async () => {
            try {
                const response = await fetch(`http://localhost:8080/adminData/Products/${router.currentRoute.value.params.id}`);
                if (response.ok) {
                    const data = await response.json();
                    product.value = data.ProductDetails;
                } else {
                    console.error('Failed to fetch product details.');
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        });

         // Computed property to check if product and quantity are defined
         const isProductValid = computed(() => {
            return product.value !== null && quantity.value !== undefined && quantity.value > 0;
        });

        const addToCart = () => {
            if (isProductValid.value) {
                const productWithQuantity = { ...product.value, Quantity: quantity.value };
                store.addToCart(productWithQuantity);
                console.log(productWithQuantity)
                router.push({ name: 'CartView' });
            }
        };

        const backToCatalog = () => {
            router.push({ name: 'Catalog' });
        };

        return {
            product,
            quantity,
            addToCart,
            backToCatalog,
        };
    },
};
</script>

<style scoped>
.product-details {
    text-align: center;
    margin-top: 20px;
}

.product-column {
    display: flex;
    justify-content: center;
}

.product-item {
    border: 1px solid #ccc;
    padding: 10px;
    max-width: 300px;
    display: inline-block;
}

.product-item h2 {
    margin: 0;
}

.product-item p {
    margin: 10px 0;
}

.product-item v-btn {
    background-color: #ffb7c2;
    color: #fff;
}
</style>
