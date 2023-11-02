<template>
    <div class="orders-container">
      <h1>Orders</h1>
  
      <!-- Table for ORDERS -->
      <h2>Standard Orders</h2>
      <table class="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer ID</th>
            <th>Status ID</th>
            <th>City ID</th>
            <th>State ID</th>
            <th>Zip Code</th>
            <th>Address</th>
            <th>Total</th>
            <th>Date Ordered</th>
            <th>Date Delivered</th>
            <th>Date Scheduled</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in standardOrders" :key="order.OrderID">
            <td>{{ order.OrderID }}</td>
            <td>{{ order.CustomerID }}</td>
            <td>{{ order.StatusID }}</td>
            <td>{{ order.CityID }}</td>
            <td>{{ order.StateID }}</td>
            <td>{{ order.ZipCode }}</td>
            <td>{{ order.Address }}</td>
            <td>{{ order.Total }}</td>
            <td>{{ order.DateOrdered }}</td>
            <td>{{ order.DateDelivered }}</td>
            <td>{{ order.DateScheduled }}</td>
          </tr>
        </tbody>
      </table>
  
      <!-- Table for CUSTOM_ORDERS -->
      <h2>Custom Orders</h2>
      <table class="orders-table">
        <thead>
          <tr>
            <th>Custom Order ID</th>
            <th>Customer ID</th>
            <th>Status ID</th>
            <th>Chat ID</th>
            <th>City ID</th>
            <th>State ID</th>
            <th>Zip Code</th>
            <th>Address</th>
            <th>Total</th>
            <th>Date Ordered</th>
            <th>Date Delivered</th>
            <th>Date Scheduled</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="customOrder in customOrders" :key="customOrder.CustomOrderID">
            <td>{{ customOrder.CustomOrderID }}</td>
            <td>{{ customOrder.CustomerID }}</td>
            <td>{{ customOrder.StatusID }}</td>
            <td>{{ customOrder.ChatID }}</td>
            <td>{{ customOrder.CityID }}</td>
            <td>{{ customOrder.StateID }}</td>
            <td>{{ customOrder.ZipCode }}</td>
            <td>{{ customOrder.Address }}</td>
            <td>{{ customOrder.Total }}</td>
            <td>{{ customOrder.DateOrdered }}</td>
            <td>{{ customOrder.DateDelivered }}</td>
            <td>{{ customOrder.DateScheduled }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        standardOrders: [],
        customOrders: []
      };
    },
    mounted() {
      // Fetch standard orders
      fetch("http://localhost:8080/adminData/ORDERS")
        .then(response => response.json())
        .then(data => {
          this.standardOrders = data;
        })
        .catch(error => {
          console.error("Error fetching standard orders:", error);
        });
  
      // Fetch custom orders
      fetch("http://localhost:8080/adminData/CUSTOM_ORDERS")
        .then(response => response.json())
        .then(data => {
          this.customOrders = data;
        })
        .catch(error => {
          console.error("Error fetching custom orders:", error);
        });
    }
  };
  </script>
  
  <!-- The styles will be similar to the previous customer list, you can adapt or add as needed -->
  <style scoped>
  /* ... Styles similar to the customer list ... */
  </style>
  