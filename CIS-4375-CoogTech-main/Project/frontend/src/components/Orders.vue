<template>
  <div class="orders-container">
    <button class="toggle-btn" @click="showOrders = !showOrders">
      {{ showOrders ? 'Show Custom Orders' : 'Show Orders' }}
    </button>
    <!-- Orders Table -->
    <div v-if="showOrders">
      <h1>Orders</h1>
      <input type="text" v-model="searchQueryOrders" placeholder="Search Orders...">
      <table class="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Status</th>
            <th>Date Ordered</th>
            <th>Date Scheduled</th>
            <th>Date Delivered</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        <tr v-for="order in filteredOrders" :key="order.OrderID">
          <td>{{ order.OrderID }}</td>
          <td>{{ order.STATUS.Status }}</td>
          <td>{{ order.DateOrdered }}</td>
          <td>{{ order.DateScheduled }}</td>
          <td>{{ order.DateDelivered }}</td>
          <td>
            <button class="details-btn" @click="openModal(order)">View Details</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

    <!-- Custom Orders Table -->
    <div v-else>
      <h1>Custom Orders</h1>
      <input type="text" v-model="searchQueryCustomOrders" placeholder="Search Custom Orders...">
      <table class="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Status</th>
            <th>Date Ordered</th>
            <th>Date Scheduled</th>
            <th>Date Delivered</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="customOrder in filteredCustomOrders" :key="customOrder.CustomOrderID">
            <td>{{ customOrder.CustomOrderID }}</td>
            <td>{{ customOrder.STATUS.Status }}</td>
            <td>{{ customOrder.DateOrdered }}</td>
            <td>{{ customOrder.DateScheduled }}</td>
            <td>{{ customOrder.DateDelivered }}</td>
            <td>
              <button class="details-btn" @click="openModal(customOrder)">View Details</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <OrderModal 
    :isOpen="isModalOpen"
    :order="selectedOrder"
    @close="isModalOpen = false"
    @orderUpdated="handleOrderUpdated" 
    @orderDeleted="handleOrderDeleted"/>
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
      customOrders: [],
      isModalOpen: false,
      selectedOrder: null,
      searchQueryOrders: '',
      searchQueryCustomOrders: '',
      showOrders: true,
    };
  },
  methods: {
    openModal(order) {
      this.selectedOrder = order;
      this.isModalOpen = true;
    },
    handleOrderUpdated(orderId, updatedOrder) {
    const index = this.orders.findIndex(order => order.OrderID === orderId);
    if (index !== -1) {
      this.orders.splice(index, 1, { ...this.orders[index], ...updatedOrder });
    }
    },
    handleOrderDeleted(orderId) {
      this.orders = this.orders.filter(order => order.OrderID !== orderId);
    },
  },
  async mounted() {
    try {
      const ordersResponse = await fetch("http://localhost:8080/adminData/Orders");
      const ordersData = await ordersResponse.json();
      this.orders = ordersData.Orders;

      const customOrdersResponse = await fetch("http://localhost:8080/adminData/CustomOrders");
      const customOrdersData = await customOrdersResponse.json();
      this.customOrders = customOrdersData.CustomOrders;

    } catch (error) {
      console.error("Error fetching data:", error);
    }
    console.log("Custom Orders:", this.customOrders);
  },
  computed: {
  filteredOrders() {
    return this.orders.filter(order => {
      return order.OrderID.toString().includes(this.searchQueryOrders) || 
             order.STATUS.Status.toLowerCase().includes(this.searchQueryOrders.toLowerCase());
      // Add more conditions here if you have additional filters
    });
  },
  filteredCustomOrders() {
    return this.customOrders.filter(order => {
      return order.CustomOrderID.toString().includes(this.searchQueryCustomOrders) || 
             order.STATUS.Status.toLowerCase().includes(this.searchQueryCustomOrders.toLowerCase());
      // Add more conditions here if you have additional filters
    });
  },
},

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
.toggle-btn {
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  background-color: #4c89af; /* Matching the color of the table header */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.toggle-btn:hover {
  background-color: #3a6c8b; /* Slightly darker shade on hover */
}
</style>
