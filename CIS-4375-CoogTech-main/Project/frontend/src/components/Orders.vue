<template>
  <div class="orders-container">
    <h1>Orders</h1>
    <table class="orders-table">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Status ID</th>
          <th>Date Ordered</th>
          <th>Date Scheduled</th>
          <th>Date Delivered</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.OrderID">
          <td>{{ order.OrderID }}</td>
          <td>{{ order.StatusID }}</td>
          <td>{{ order.DateOrdered }}</td>
          <td>{{ order.DateScheduled }}</td>
          <td>{{ order.DateDelivered }}</td>
          <td>
            <button class="details-btn" @click="openModal(order)">View Details</button>
          </td>
        </tr>
      </tbody>
    </table>
    <OrderModal :isOpen="isModalOpen" :order="selectedOrder" @close="isModalOpen = false" />
  </div>
</template>

<script>
import OrderModal from '@/components/OrderModal.vue';
import Sidebar from '@/components/Sidebar.vue';

export default {
  components: {
    OrderModal,
    Sidebar
  },
  data() {
    return {
      orders: [],
      isModalOpen: false,
      selectedOrder: null
    };
  },
  methods: {
    openModal(order) {
      this.selectedOrder = order;
      this.isModalOpen = true;
    },
  },
  mounted() {
    fetch("http://localhost:8080/adminData/Orders")
      .then(response => response.json())
      .then(data => {
        this.orders = data;
      })
      .catch(error => {
        console.error("Error fetching orders:", error);
      });
  }
};
</script>

<style scoped>
.orders-container {
  font-family: Arial, sans-serif;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  flex: 1;
  margin-left: 20px;
}

.orders-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.orders-table th, .orders-table td {
  padding: 12px 15px;
  border: 1px solid #ddd;
}

.orders-table thead tr {
  background-color: #4c89af;
  color: #fff;
}

.orders-table tbody tr {
  transition: background-color 0.3s;
}

.orders-table tbody tr:hover {
  background-color: #f5f5f5;
}

.details-btn {
  padding: 6px 12px;
  background-color: #4c89af;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.details-btn:hover {
  background-color: #3a6c8b;
}

h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-transform: uppercase;
  border-bottom: 2px solid #4c89af;
  padding-bottom: 10px;
  color: #4c89af;
}
</style>
