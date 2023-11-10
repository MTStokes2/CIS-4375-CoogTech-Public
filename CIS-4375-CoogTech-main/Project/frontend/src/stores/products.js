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

    addToCart(productWithQuantity) {
      // Check if the product is already in the cart
      const existingProductIndex = this.cart.findIndex(item => item.ProductID === productWithQuantity.ProductID);
    
      if (existingProductIndex !== -1) {
        // If the product is already in the cart, update its quantity
        this.cart[existingProductIndex].Quantity += productWithQuantity.Quantity;
      } else {
        // If the product is not in the cart, add it with the specified quantity
        this.cart.push(productWithQuantity);
        console.log(productWithQuantity)
      }
    },


    removeFromCart(productId) {
      this.cart = this.cart.filter(item => item.ProductID !== productId);
    },
  },
});