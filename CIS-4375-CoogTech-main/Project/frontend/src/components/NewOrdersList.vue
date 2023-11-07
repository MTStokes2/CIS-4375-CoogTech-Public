<template>
  <div class="new-orders">
    <h2>Unapproved Orders</h2>
    <div v-if="newOrders.length === 0" class="no-orders">No pending orders</div>
    <ul v-else>
      <li v-for="order in newOrders" :key="order.id" class="order-item">
        <span class="customer-name">{{ order.customerName }}</span> -
        <span class="order-date">{{ order.orderDate | formatDate }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      newOrders: []
    };
  },
  created() {
    this.fetchNewOrders();
  },
  methods: {
    async fetchNewOrders() {
      try {
        const response = await axios.get('http://localhost:8080/adminData/Unapproved-Orders');
        this.newOrders = response.data.combinedOrders.map(order => ({
          id: order.OrderID || order.id,
          customerName: order.Customers_Model.name,
          orderDate: order.DateOrdered || order.DateScheduled
        }));
      } catch (error) {
        console.error('Error fetching new orders:', error);
        // Handle error
      }
    }
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
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 16px auto;
}

.no-orders {
  text-align: center;
  padding: 20px;
  color: #666;
}

.order-item {
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
}

.customer-name {
  font-weight: bold;
}

.order-date {
  color: #666;
}

ul {
  list-style-type: none;
  padding: 0;
}
</style>
