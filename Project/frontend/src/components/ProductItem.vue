<template>
  <v-sheet class="ma-2 pa-2">
    <v-card class="product" style="background-color: #ffb7c2;">
      <v-img :src="product.ProductImage" height="200px" cover />

      <v-card-title>
        {{ product.ProductName }}
      </v-card-title>

      <v-card-subtitle>
        $ {{ product.ProductPrice }}
      </v-card-subtitle>

      <v-card-text>
        {{ product.ProductType }}
      </v-card-text>

      <v-card-actions>
        <br>
        <v-btn variant="elevated" color=#F5F5DC @click="addToCart(product.ProductID)">Add to cart
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
