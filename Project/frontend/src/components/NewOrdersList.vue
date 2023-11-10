<template>
  <div>
    <div class="orders-container">
      <div class="unapproved-orders">
        <h1 class="order-type">To-Do Orders</h1>
        <ul v-if="unapprovedOrders.length > 0">
          <li v-for="order in unapprovedOrders" :key="order.OrderID">
            <div>
              <span class="customer-name">{{ order.CUSTOMER.CustomerFirstName }} {{ order.CUSTOMER.CustomerLastName }}</span>
              <span class="order-date">Ordered on: {{ new Date(order.DateOrdered).toLocaleDateString() }}</span>
            </div>
            <div>
              <span>Total: ${{ order.Total }}</span>
            </div>
          </li>
        </ul>
        <p v-else>No pending orders.</p>
      </div>

      <div class="unapproved-orders">
        <h1 class="order-type">To-Do Custom Orders</h1>
        <ul v-if="unapprovedOrders.length > 0">
          <li v-for="customOrder in unapprovedCustomOrders" :key="customOrder.CustomOrderID">
            <div>
              <span class="customer-name">{{ customOrder.CUSTOMER.CustomerFirstName }} {{ customOrder.CUSTOMER.CustomerLastName }}</span>
              <span class="order-date">Ordered on: {{ new Date(customOrder.DateOrdered).toLocaleDateString() }}</span>
            </div>
            <div>
              <span>Total: ${{ customOrder.Total }}</span>
            </div>
          </li>
        </ul>
        <p v-else>No pending orders.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';

const unapprovedOrders = ref([]);
const unapprovedCustomOrders = ref([]);

const fetchUnapprovedOrders = async () => {
  try {
    const response = await axios.get('http://localhost:8080/adminData/Reports/Unapproved-Orders');
    unapprovedOrders.value = response.data.unapprovedOrders;
  } catch (error) {
    console.error('Error fetching unapproved orders:', error);
  }
};

const fetchUnapprovedCustomOrders = async () => {
  try {
    const response = await axios.get('http://localhost:8080/adminData/Reports/Unapproved-Custom-Orders');
    unapprovedCustomOrders.value = response.data.unapprovedCustomOrders;
  } catch (error) {
    console.error('Error fetching unapproved custom orders:', error);
  }
};

onMounted(() => {
  fetchUnapprovedOrders();
  fetchUnapprovedCustomOrders();
});
</script>

<style scoped>
.orders-container {
  display: flex;
  justify-content: center; /* Centers the orders in the container */
  flex-wrap: wrap; /* Allows items to wrap if not enough space */
  gap: 32px; /* Space between the two unapproved orders sections */
  padding: 16px; /* Padding around the entire container */
}

.unapproved-orders {
  flex: 1; /* Allows each section to grow and fill the space */
  min-width: 300px; /* Minimum width before wrapping */
  max-width: 600px; /* Maximum width for each section */
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px; /* Spacing between elements when they wrap */
  box-sizing: border-box; /* Includes padding and border in the width */
}

.order-type {
  font-weight: bold;
  color: #d9534f; /* Red to highlight the type of order */
}

.customer-name {
  font-weight: bold;
}

.order-date {
  color: #666;
}

.order-status {
  color: #337ab7; /* Blue for status */
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  border-bottom: 1px solid #eee;
  padding: 8px 0;
}
</style>

