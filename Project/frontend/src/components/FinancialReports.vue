<template>
    <div class="total-report-container">
      <div class="navbar-container">
        <button @click="getTotalReport">Get Total Report</button>
        <button @click="getCurrentMonthTotalReport">Get Current Months Total Report</button>
        <button @click="getLastMonthTotalReport">Get Last Months Total Report</button>
      </div>
  
      <div v-if="loading">Loading...</div>
  
      <div v-if="error" class="error-message">{{ error }}</div>
  
      <div v-if="totalAmount !== null">
        <p class="header">Total Amount Made: ${{ totalAmount }}</p>
        <div v-if="orders.length > 0">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Ordered Date</th>
              <th>Scheduled Date</th>
              <th>Delivered Date</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.OrderID">
              <td>{{ order.OrderID }}</td>
              <td>{{ formatDate(order.DateOrdered) }}</td>
              <td>{{ formatDate(order.DateScheduled) }}</td>
              <td>{{ formatDate(order.DateDelivered) || 'Not Delivered' }}</td>
              <td>${{ order.Total }}</td>
            </tr>
          </tbody>
        </table>
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
        totalAmount: null,
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
      async getTotalReport() {
        this.loading = true;
  
        try {
          const startDate = moment(this.startDate);
          const endDate = moment(this.endDate);

          const firstDayOfNextMonth = startDate.clone().subtract(10, 'years').startOf('year').format('MM/DD/YYYY');;
          const lastDayOfNextMonth = startDate.clone().add(1, 'months').endOf('month').format('MM/DD/YYYY');
  
          const response = await axios.get('http://localhost:8080/adminData/Reports/Between-Dates/Total', {
            params: {
              startDate: firstDayOfNextMonth ,
              endDate: lastDayOfNextMonth,
            },
          });
  
          this.totalAmount = response.data.totalAmountMade;
          this.orders = response.data.orders;
          this.error = null;
        } catch (error) {
          console.error('Error fetching total report:', error.response || error);
          this.error = 'Error fetching total report. Please check your input and try again.';
        } finally {
          this.loading = false;
        }
      },
      async getLastMonthTotalReport() {
        this.loading = true;
  
        try {
          const startDate = moment(this.startDate);
          const endDate = moment(this.endDate);

          const firstDayOfNextMonth = startDate.clone().subtract(1, 'months').startOf('month').format('MM/DD/YYYY');;
          const lastDayOfNextMonth = startDate.clone().subtract(1, 'months').endOf('month').format('MM/DD/YYYY');
  
          const response = await axios.get('http://localhost:8080/adminData/Reports/Between-Dates/Total', {
            params: {
              startDate: firstDayOfNextMonth,
              endDate: lastDayOfNextMonth,
            },
          });
  
          this.totalAmount = response.data.totalAmountMade;
          this.orders = response.data.orders;
          this.error = null;
        } catch (error) {
          console.error('Error fetching total report:', error.response || error);
          this.error = 'Error fetching total report. Please check your input and try again.';
        } finally {
          this.loading = false;
        }
      },
      async getCurrentMonthTotalReport() {
        this.loading = true;
  
        try {
          const startDate = moment(this.startDate);

          const firstDayOfNextMonth = startDate.clone().subtract(1, 'months').endOf('month').format('MM/DD/YYYY');
          const lastDayOfNextMonth = startDate.clone().add(0, 'months').endOf('month').format('MM/DD/YYYY');
          console.log(firstDayOfNextMonth, lastDayOfNextMonth )
  
          const response = await axios.get('http://localhost:8080/adminData/Reports/Between-Dates/Total', {
            params: {
              startDate: firstDayOfNextMonth,
              endDate: lastDayOfNextMonth,
            },
          });
  
          this.totalAmount = response.data.totalAmountMade;
          this.orders = response.data.orders;
          this.error = null;
        } catch (error) {
          console.error('Error fetching total report:', error.response || error);
          this.error = 'Error fetching total report. Please check your input and try again.';
        } finally {
          this.loading = false;
        }
      },
      clearTables() {
      this.orders = [];
      this.customOrders = [];
      this.error = null;
    },
    },
  };
  </script>
  
  <style scoped>
  .total-report-container {
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
  
  .error-message {
    color: red;
    margin-top: 10px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
    background-color: #ffffff; /* White background color */
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1); /* Subtle box shadow for embossed effect */
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
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

.header {
  text-align: center;
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}

table tbody tr:hover {
  background-color: #ddd;
}

  </style>
  