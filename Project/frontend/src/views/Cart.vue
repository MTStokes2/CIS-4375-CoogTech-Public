<template>
  <div class="cart-view-container">
    <div class="cart-info-container">
      <v-btn @click="goToCatalog" class="back-button">
        Back to catalog
      </v-btn>
      <div class="cart-item" v-for="(cartItem, index) in cartItems" :key="cartItem.ProductID">
        <div class="item-details">
          <img :src="cartItem.ProductImage" alt="">
          <div class="product-info">
            <span>Brand: {{ cartItem.ProductName }}</span>
            <span>Category: {{ cartItem.ProductType }}</span>
            <span>Price: ${{ cartItem.ProductPrice }}</span>
          </div>
          <div class="quantity-input">
            <label for="quantity">Qty:</label>
            <input id="quantity" type="number" v-model="defaultQuantity[index]" min="1" :max="cartItem.ProductStock">
          </div>
          <v-btn @click="removeFromCart(cartItem.ProductID)">Remove</v-btn>
        </div>
      </div>

      <div class="total-section">
        <p class="bold">Total Price: <span>${{ totalCost }}</span></p>
      </div>
    </div>

    <div class="order-form-container">
      <div class="order-form-wrapper">
      <OrderForm :cartData="cartItems" />
    </div>
    </div>
  </div>
</template>

<script>

  import { defineComponent, computed, watch, ref } from 'vue';
  import { productsStore } from "@/stores/products";
  import { useRouter } from "vue-router";
  import OrderForm from '../components/OrderForm.vue';
  
  export default defineComponent({
    name: 'CartView',
    components: {
      OrderForm
    },
    setup() {
      const router = useRouter();
      const store = productsStore();
      const cartItems = computed(() => store.cart);
  
      const defaultQuantity = ref([]);

      // Initialize defaultQuantity with quantities from cart items
      watch(cartItems, () => {
        defaultQuantity.value = cartItems.value.map(item => item.Quantity || 1);
      }, { immediate: true });

      // Calculate total cost based on defaultQuantity
      const totalCost = computed(() => {
        return store.cart.reduce((total, item, index) => {
          return total + item.ProductPrice * defaultQuantity.value[index];
        }, 0);
      });

      const updateQuantity = (index, value) => {
        // Update defaultQuantity and recompute totalCost
        defaultQuantity.value[index] = value;
        // If needed, you can also update the cart with the new quantity here
      };
  
      const removeFromCart = (productId) => {
      // Remove the product from the cart
      store.cart = store.cart.filter(item => item.ProductID !== productId);
      };
  
      const checkout = () => {
        // Pass the cart data as a prop to the OrderForm component
        router.push({ name: 'OrderForm', params: { cartData: store.cart } });
      };
  
      const goToCatalog = () => {
        router.push({ name: 'Catalog' });
      };
  
      return {
        totalCost,
        cartItems,
        defaultQuantity,
        updateQuantity,
        removeFromCart,
        checkout,
        goToCatalog,
      };
    }
  });
  </script>
  
  <style scoped>
  .item-details {
  display: flex;
  align-items: center;
  margin-bottom: 32px;
  box-shadow: 0 0 17px 6px #e2dddd;
  border-radius: 8px;
  padding: 16px;
}

.item-details button {
  background-color: #ff6b81;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  margin-top: 10px; /* Add margin between quantity input and remove button */
}

.item-details button:hover {
  background-color: #e74c3c;
}

.cart-item {
  margin-bottom: 5px;
  padding: 10px;
}

.item-details img {
  width: 20%;
}

.product-info {
  flex: 1;
  margin-left: 20px; /* Add margin between image and product info */
  display: flex;
  flex-direction: column;
}

 .total-section {
  text-align: right;
}


.total-section p {
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 8px;
}


.total-section span {
  font-size: 20px;
  color: #ff6b81; 
}
  
  .quantity-input label {
  margin-top: 10px;
  padding: 10px;
}

.quantity-input input {
  width: 80px;
  height: 30px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
  margin-right: 10px;
}

.cart-view-container {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.cart-info-container {
  flex: 1;
  padding: 20px;
  background-color: #f5f5f5;
}

.order-form-container {
  flex: 1;
  padding: 20px;
  background-color: #f5f5f5;
}

.order-form-wrapper {
  margin-top: 40px; 
}

.back-button {
  margin-bottom: 20px;
  background-color: #ff6b81;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  margin-top: 10px; 
}

.back-button:hover {
  background-color: #e74c3c;
}

  </style>