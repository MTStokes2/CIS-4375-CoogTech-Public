<template>
    <div class="product-details">
      <h1>Product Details</h1>
      <div class="product-column">
        <div class="product-item" v-if="product">
          <v-card class="product-card">
            <div class="product-image" v-if="product.ProductImage">
              <img :src="product.ProductImage" alt="Product Image" />
            </div>
            <h2 class="product-name">{{ product.ProductName }}</h2>
            <div class="product-info">
              <p><strong>Price:</strong> ${{ product.ProductPrice }}</p>
              <p><strong>Type:</strong> {{ product.ProductType }}</p>
              <p><strong>Color:</strong> {{ product.ProductColor }}</p>
              <p><strong>Size:</strong> {{ product.ProductSize }}</p>
              <p><strong>Stock:</strong> {{ product.ProductStock }}</p>
            </div>
            <div class="quantity-input">
              <label for="quantity" class="quantity-label">Qty:</label>
              <input id="quantity" type="number" class="quantity-input-box" v-model="quantity" min="1" :max="product.ProductStock" />
            </div>
            <v-btn @click="addToCart" class="add-to-cart-btn">Add to Cart</v-btn>
          </v-card>
        </div>
        <div v-else>
          <p class="not-found-message">Product not found.</p>
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
  background-color: #ffb7c2;
  padding: 10px;
  max-width: 400px;
  width: 100%;
}

.product-card {
  background-color: #fff;
}

.product-image img {
  width: 100%;
  height: auto;
}

.product-name {
  font-size: 1.5rem;
  margin: 10px 0;
}

.product-info {
  margin: 25px 0;
}

.quantity-input {
  margin: 15px 0;
}

.add-to-cart-btn {
  background-color: #ff6b81;
  color: #fff;
  margin-bottom: 15px;
}

.not-found-message {
  color: #ff6b81;
  font-weight: bold;
}

.quantity-label {
  font-weight: bold;
  margin-right: 10px;
  color: #333;
}

.quantity-input-box {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 80px;
  font-size: 16px;
}

</style>
