<template>
  <v-sheet class="custom-sheet ma-3 pa-4">
    <v-card class="product">
      <v-img :src="product.ProductImage" height="200px" cover />

      <v-card-title class="product-title">
        {{ product.ProductName }}
      </v-card-title>

      <v-card-text class="product-details">
        <div class="product-type">{{ product.ProductType }}</div>
        
        <!-- Conditionally render color and size only for T-shirts -->
        <div v-if="product.ProductType === 'Tshirt'">
            <div class="product-type">{{ product.ProductColor }} - {{ product.ProductSize}}</div>
        </div>

        <div class="product-price">$ {{ product.ProductPrice }}</div>
      </v-card-text>

      <v-card-actions>
        <v-btn @click="addToCart(product.ProductID)" class="add-to-cart-button">
          More Details
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

.custom-sheet {
background-color: #fcafba; 
box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1); 
border-radius: 25px; 
}

.product {
  width: 250px;
  text-align: center;
  border-radius: 10px;
  transition: transform 0.3s ease-in-out;
}

.product:hover {
  transform: translateY(-5px);
}

.product-title {
  font-size: 1.2em;
  font-weight: bold;
  margin-top: 10px;
}

.product-details {
  font-size: 0.9em;
  margin-top: 10px;
}

.product-type {
  margin-bottom: 5px;
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