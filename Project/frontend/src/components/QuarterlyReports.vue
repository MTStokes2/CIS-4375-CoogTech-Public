<template>
    <div class="report-container">
 
      <div class="navbar-container">
        <button @click="getNextMonthReport">Get Next Month's Orders Report</button>
        <button @click="getNextTwoMonthReport">Get Next Two Months' Orders Report</button>
        <button @click="getLastMonthReport">Get Last Month's Orders Report</button>
        <button @click="getLastTwoMonthReport">Get Last Two Months' Orders Report</button>
    </div>
  
      <div v-if="loading" class="loading-message">Loading...</div>
  
      <div v-if="error" class="error-message">{{ error }}</div>
  
      <div v-if="orders.length || customOrders.length" class="report-results">
        <div>
          <h3 class="header">Orders:</h3>
          <table v-if="orders.length > 0" class="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Ordered Date</th>
                <th>Scheduled Delivery Date</th>
                <th>Delivered Date</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in orders" :key="order.OrderID" @click="navigateToOrderDetails(order.OrderID)">
                <td>{{ order.OrderID }}</td>
                <td>{{ formatDate(order.DateOrdered) }}</td>
                <td>{{ formatDate(order.DateScheduled) }}</td>
                <td>{{ formatDate(order.DateDelivered) || 'Not Delivered' }}</td>
                <td>${{ order.Total }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="no-data-message">No orders found within the specified date range.</div>
        </div>
  
        <div>
          <h3 class="header">Custom Orders:</h3>
          <table v-if="customOrders.length > 0" class="data-table">
            <thead>
              <tr>
                <th>Custom Order ID</th>
                <th>Ordered Date</th>
                <th>Scheduled Delivery Date</th>
                <th>Delivered Date</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="customOrder in customOrders" :key="customOrder.CustomOrderID" @click="navigateToCustomOrderDetails(customOrder.CustomOrderID)">
                <td>{{ customOrder.CustomOrderID }}</td>
                <td>{{ formatDate(customOrder.DateOrdered) }}</td>
                <td>{{ formatDate(customOrder.DateScheduled) }}</td>
                <td>{{ formatDate(customOrder.DateDelivered) || 'Not Delivered' }}</td>
                <td>${{ customOrder.Total }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="no-data-message">No custom orders found within the specified date range.</div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import axios from 'axios';
import moment from 'moment';

export default {
  data() {
    return {
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      orders: [],
      customOrders: [],
      loading: false,
      error: null,
    };
  },
  methods: {
    formatDate(date) {
      if (!date) {
        return "Not Delivered yet";
      }

      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
    },
    async getNextMonthReport() {
      this.loading = true;
      this.clearTables();

      try {
        const formattedStartDate = moment(this.startDate).format('MM/DD/YYYY');
        const formattedEndDate = moment(this.endDate).format('MM/DD/YYYY');

        const startDate = moment(this.startDate);
        const endDate = moment(this.endDate);

        const firstDayOfNextMonth = startDate.clone().add(1, 'months').startOf('month').format('MM/DD/YYYY');;
        const lastDayOfNextMonth = startDate.clone().add(1, 'months').endOf('month').format('MM/DD/YYYY');

        const response = await axios.get('http://localhost:8080/adminData/Reports/Between-Dates/', {
          params: {
            startDate: firstDayOfNextMonth,
            endDate: lastDayOfNextMonth,
          },
        });

        this.orders = response.data.orders;
        this.customOrders = response.data.customOrders;
        this.error = null;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Handle 404 error specifically for "No orders found"
          this.error = 'No orders or custom orders found within the specified date range.';
        } else {
          console.error('Error fetching report:', error.response || error);
          this.error = 'Error fetching report. Please check your input and try again.';
        }
      } finally {
        this.loading = false;
      }
    },
    async getNextTwoMonthReport() {
      this.loading = true;
      this.clearTables();

      try {
        const formattedStartDate = moment(this.startDate).format('MM/DD/YYYY');
        const formattedEndDate = moment(this.endDate).format('MM/DD/YYYY');

        const startDate = moment(this.startDate);
        const endDate = moment(this.endDate);

        const firstDayOfNextMonth = startDate.clone().add(1, 'months').startOf('month').format('MM/DD/YYYY');;
        const lastDayOfNextMonth = startDate.clone().add(2, 'months').endOf('month').format('MM/DD/YYYY');

        const response = await axios.get('http://localhost:8080/adminData/Reports/Between-Dates/', {
          params: {
            startDate: firstDayOfNextMonth,
            endDate: lastDayOfNextMonth,
          },
        });

        this.orders = response.data.orders;
        this.customOrders = response.data.customOrders;
        this.error = null;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Handle 404 error specifically for "No orders found"
          this.error = 'No orders or custom orders found within the specified date range.';
        } else {
          console.error('Error fetching report:', error.response || error);
          this.error = 'Error fetching report. Please check your input and try again.';
        }
      } finally {
        this.loading = false;
      }
    },
    async getLastMonthReport() {
      this.loading = true;
      this.clearTables();

      try {
        const formattedStartDate = moment(this.startDate).format('MM/DD/YYYY');
        const formattedEndDate = moment(this.endDate).format('MM/DD/YYYY');

        const startDate = moment(this.startDate);
        const endDate = moment(this.endDate);

        const firstDayOfLastMonth = startDate.clone().subtract(1, 'months').startOf('month').format('MM/DD/YYYY');;
        const lastDayOfLastMonth = startDate.clone().subtract(1, 'months').endOf('month').format('MM/DD/YYYY');

        const response = await axios.get('http://localhost:8080/adminData/Reports/Between-Dates/', {
          params: {
            startDate: firstDayOfLastMonth,
            endDate: lastDayOfLastMonth,
          },
        });

        this.orders = response.data.orders;
        this.customOrders = response.data.customOrders;
        this.error = null;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Handle 404 error specifically for "No orders found"
          this.error = 'No orders or custom orders found within the specified date range.';
        } else {
          console.error('Error fetching report:', error.response || error);
          this.error = 'Error fetching report. Please check your input and try again.';
        }
      } finally {
        this.loading = false;
      }
    },
    async getLastTwoMonthReport() {
      this.loading = true;
      this.clearTables();

      try {
        const formattedStartDate = moment(this.startDate).format('MM/DD/YYYY');
        const formattedEndDate = moment(this.endDate).format('MM/DD/YYYY');

        const startDate = moment(this.startDate);
        const endDate = moment(this.endDate);

        const firstDayOfLastMonth = startDate.clone().subtract(1, 'months').startOf('month').format('MM/DD/YYYY');;
        const lastDayOfLastMonth = startDate.clone().subtract(2, 'months').endOf('month').format('MM/DD/YYYY');

        const response = await axios.get('http://localhost:8080/adminData/Reports/Between-Dates/', {
          params: {
            startDate: firstDayOfLastMonth,
            endDate: lastDayOfLastMonth,
          },
        });

        this.orders = response.data.orders;
        this.customOrders = response.data.customOrders;
        this.error = null;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Handle 404 error specifically for "No orders found"
          this.error = 'No orders or custom orders found within the specified date range.';
        } else {
          console.error('Error fetching report:', error.response || error);
          this.error = 'Error fetching report. Please check your input and try again.';
        }
      } finally {
        this.loading = false;
      }
    },
    clearTables() {
      this.orders = [];
      this.customOrders = [];
      this.error = null;
    },
    navigateToCustomOrderDetails(customOrderID) {
            // Navigate to the order details page with the CustomOrderID as a route parameter
            this.$router.push({ name: 'AdminCustomOrderDetails', params: { id: customOrderID } });
        },
    navigateToOrderDetails(OrderID) {
        // Navigate to the order details page with the CustomOrderID as a route parameter
        this.$router.push({ name: 'AdminOrderDetails', params: { id: OrderID } });
    },
  },
};
</script>
  
<style scoped>

.report-container {
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}

.navbar-container {
  display: flex;
  justify-content: left;
  padding: 10px;
}

button {
    margin: 5px;
  background-color: #ff6b81;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  margin-top: 10px; 
}

button:hover {
  background-color: #e74c3c;
}

.loading-message, .error-message, .no-data-message {
  margin-top: 10px;
  padding: 10px;
  text-align: center;
  color: #e74c3c;
}

.report-results {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}

.data-table tbody tr:hover {
  background-color: #ddd;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

.header {
  text-align: center;
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}

</style>
  