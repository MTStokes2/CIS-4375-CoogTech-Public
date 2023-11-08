import { defineStore } from 'pinia';

export const productsStore = defineStore('products', {
  state: () => ({
    products: [],
    cart: [],
  }),

  actions: {
    async fetchProductsFromDB() {
      try {
        // Make a GET request to your backend API to fetch products from the database
        const response = await fetch('http://localhost:8080/adminData/Products');

        if (response.ok) {
          const data = await response.json();
          this.products = data;
        } else {
          console.error('Failed to fetch products from the database');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },

    addToCart(product) {
      this.cart.push(product);
    },

    removeFromCart(id) {
      console.log('>>>>> ID', id);
      this.cart = this.cart.filter((item) => item.id !== id);
    },
  },
});