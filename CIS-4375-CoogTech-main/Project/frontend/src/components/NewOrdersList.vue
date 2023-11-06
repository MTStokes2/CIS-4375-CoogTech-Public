<template>
    <div class="new-orders">
      <h2>New Orders</h2>
      <ul>
        <li v-for="order in newOrders" :key="order.id">
          {{ order.customerName }} - {{ order.orderDate | formatDate }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // Replace with actual data fetching logic
        newOrders: [
          // Example orders
          { id: 1, customerName: 'John Doe', orderDate: new Date() },
          // ... more orders
        ]
      };
    },
    filters: {
      formatDate(value) {
        if (value) {
          return new Date(value).toLocaleDateString();
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .new-orders {
    flex: 1;
    /* Add styles here for your new orders list */
  }
  </style>
  