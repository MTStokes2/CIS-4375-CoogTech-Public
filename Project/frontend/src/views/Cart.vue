<template>
    <v-btn @click="router.push({ name: 'Catalog' })" color="#F5F5DC" variant="elevated">
        Back to catalog
    </v-btn>
    <div v-if="!store.cart.length" style="text-align: center">
        <h1>Empty Cart ...</h1>
    </div>
    <div class="cart-items" v-else>
        <div class="cart-item" v-for="item in store.cart" :key="item.id">
            <div class="item-details">
                <img :src="item.thumbnail" alt="">
                <br>
                <span>Brand: {{ item.brand }}</span>

                <span>Category: {{ item.category }}</span>
                <br>
                <span>Price: ${{ item.price }}</span>
                <button @click="removeFromCart(item.id)">Remove</button>
            </div>
        </div>
        <!-- Display the total price -->
        <div class="total-section">
            <p class="bold">Total Price: <span>${{ totalCost }}</span></p>
            <button class="checkout-button">Checkout</button>
        </div>
    </div>
</template>
  
<script>
import { defineComponent } from "vue";
export default defineComponent({
    name: 'CartView'
})
</script>
  
<script setup>
import { productsStore } from "@/stores/products";
import { useRouter } from "vue-router";
import { computed } from 'vue';

const router = useRouter()

const store = productsStore()

const totalCost = computed(() => {
    // Calculate the total cost based on the items in the cart
    return store.cart.reduce((total, item) => {
        return total + item.price; // Calculate the total price of the items
    }, 0);
});

const removeFromCart = (id) => {
    store.removeFromCart(id);
}

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
</style>