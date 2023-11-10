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
        <v-btn @click="addToCart(product.ProductID)">
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