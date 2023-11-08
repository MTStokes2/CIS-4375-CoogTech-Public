<template>
  <div>
    <v-btn @click="goToCatalog" color="#F5F5DC" variant="elevated">
      Back to catalog
    </v-btn>
    <div class="cart-item" v-for="(cartItem, index) in cartItems" :key="cartItem.ProductID">
      <div class="item-details">
        <img :src="cartItem.ProductImage" alt="">
        <br>
        <span>Brand: {{ cartItem.ProductName }}</span>
        <span>Category: {{ cartItem.ProductType }}</span>
        <br>
        <span>Price: ${{ cartItem.ProductPrice }}</span>
        <div class="quantity-input">
          <label for="quantity">Qty:</label>
          <input id="quantity" type="number" v-model="defaultQuantity[index]" min="1" :max="cartItem.ProductStock">
        </div>
        <v-btn @click="removeFromCart (cartItem.ProductID)">Remove</v-btn>
      </div>
    </div>

    <div class="total-section">
      <p class="bold">Total Price: <span>${{ totalCost }}</span></p>
      <v-btn @click="checkout" class="checkout-button">Checkout</v-btn>
    </div>
    <OrderForm :cartData="cartItems" />
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
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
    box-shadow: 0 0 17px 6px #e2dddd;
    border-radius: 8px;
    padding: 16px;
  }
  
  .item-details img {
    width: 20%;
  }
  
  /* Add new styles for total price and checkout button */
  .total-section {
    text-align: right;
  }
  
  .bold {
    font-weight: bold;
  }
  
  .total-price {
    margin-bottom: 16px;
  }
  
  .checkout-button {
    background-color: #F5F5DC;
    color: rgb(20, 67, 7);
    border: none;
    border-radius: 25px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
  }
  
  .checkout-button:hover {
    background-color: #ff6b81;
    /* Lighter pink on hover */
  }

.quantity-input label {
  margin-right: 10px;
  font-size: 14px;
}

.quantity-input input {
  width: 80px;
  height: 30px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
}

  </style>