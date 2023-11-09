<template>
  <v-sheet class="ma-2 pa-2">
    <v-card class="product" style="background-color: #ffb7c2;">
      <v-img :src="product.ProductImage" height="200px" cover />

      <v-card-title class="product-title">
        {{ product.ProductName }}
      </v-card-title>

      <v-card-text class="product-type">
        {{ product.ProductType }}
      </v-card-text>

      <v-card-subtitle class="product-price">
        $ {{ product.ProductPrice }}
      </v-card-subtitle>

      <v-card-actions>
        <v-btn @click="addToCart(product.ProductID)" class="add-to-cart-button">
          Add to cart
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-sheet>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: 'ProductItem',
});
</script>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['item-clicked']);

const addToCart = (productId) => {
  emit('item-clicked', productId);
};
</script>

<style scoped>
.product {
  width: 250px;
  text-align: center;
  border-radius: 10px;
}

.product-title {
  font-size: 1.2em;
  font-weight: bold;
}

.product-price {
  font-size: 1em;
  text-align: left;
}

.product-type {
  font-size: 0.8em;
}

.add-to-cart-button {
  background-color: #ff6b81;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  font-size: 0.9em;
  transition: background-color 0.3s ease-in-out;
}

.add-to-cart-button:hover {
  background-color: #e74c3c;
}
</style>