<template>
  <div class="product-details">
    <h1>Product Details</h1>
    <div v-for="similarProduct in similarProducts" :key="similarProduct.ProductID" class="product-column">
      <div class="product-item" v-if="product">
        <v-card  class="product-card">
          <div class="product-image" v-if="product.ProductImage">
            <img :src="similarProduct.ProductImage" alt="Product Image" />
          </div>
          <h2 class="product-name">{{ similarProduct.ProductName }}</h2>
          <div class="product-info">
            <p><strong>Price:</strong> ${{ similarProduct.ProductPrice }}</p>
            <p><strong>Type:</strong> {{ similarProduct.ProductType }}</p>
            <p><strong>Color:</strong> {{ similarProduct.ProductColor }}</p>
            <p><strong>Size:</strong> {{ similarProduct.ProductSize }}</p>
            <p><strong>Stock:</strong> {{ similarProduct.ProductStock }}</p>
          </div>
          <div class="quantity-input">
            <label for="quantity" class="quantity-label">Qty:</label>
            <input id="quantity" type="number" class="quantity-input-box" v-model="quantity" min="1" :max="similarProduct.ProductStock" />
          </div>
          <v-btn @click="() => addToCart(similarProduct.ProductID)" class="add-to-cart-btn">Add to Cart</v-btn>
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
        const similarProducts = ref([]);
        const selectedProduct = ref(null);


        // Fetch product details when the component is mounted
        onMounted(async () => {
            try {
                const response = await fetch(`http://localhost:8080/adminData/Products/${router.currentRoute.value.params.id}`);
                if (response.ok) {
                    const data = await response.json();
                    product.value = data.ProductDetails;
                    // Fetch other products with the same name
                    fetchSimilarProducts(data.ProductDetails.ProductName);
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


        const fetchSimilarProducts = async (productName) => {
          try {
            const response = await fetch(`http://localhost:8080/adminData/Products?name=${productName}`);
            if (response.ok) {
              const data = await response.json();
              
              // Filter similar products based on ProductName
              similarProducts.value = data.filter(similarProduct => 
                similarProduct.ProductName == product.value.ProductName
              );
          
            } else {
              console.error('Failed to fetch similar products.');
            }
          } catch (error) {
            console.error('Error fetching similar products:', error);
          }
        };

        const addToCart = (productId) => {
          if (isProductValid.value) {
              // Find the similarProduct with the matching productId
              const selectedSimilarProduct = similarProducts.value.find(product => product.ProductID === productId);

              if (selectedSimilarProduct) {
                  // Create an object with ProductID, Quantity, and other product details
                  const productWithQuantity = { ...selectedSimilarProduct, Quantity: quantity.value };

                  // Add the product to the cart
                  store.addToCart(productWithQuantity);

                  // Log the added product
                  console.log("sent to cart:", productWithQuantity);

                  // Redirect to the CartView
                  router.push({ name: 'CartView' });
              } else {
                  console.error('Selected product not found in similarProducts array.');
              }
          }
      };
          const selectProduct = (productId) => {
          selectedProduct.value = productId;
        };

        const backToCatalog = () => {
            router.push({ name: 'Catalog' });
        };

        const uniqueColors = computed(() => {
          // Extract all colors from similarProducts
          const colors = similarProducts.value.map(product => product.ProductColor);
          
          // Use Set to get unique colors
          const uniqueColorSet = new Set(colors);
          
          // Convert Set back to an array
          return Array.from(uniqueColorSet);
});

        return {
            product,
            quantity,
            addToCart,
            backToCatalog,
            selectedColor: '',
            uniqueColors,
            similarProducts,
            selectProduct,
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
  margin-bottom: 20px;
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
