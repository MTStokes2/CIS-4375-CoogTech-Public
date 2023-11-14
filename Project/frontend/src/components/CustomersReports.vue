<template>
    <div class="top-paying-customers-container">
 
      <button @click="getTopPayingCustomers">Get Top Paying Customers</button>
  
      <div v-if="loading">Loading...</div>
  
      <div v-if="error" class="error-message">{{ error }}</div>
  
      <div v-if="topPayingCustomers.length > 0">
        <h3 class="header">Top Paying Customers:</h3>
        <table>
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Total Spending</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="customer in topPayingCustomers" :key="customer.CustomerID">
              <td>{{ customer.CustomerID }}</td>
              <td>{{ customer.CustomerFirstName + ' ' + customer.CustomerLastName }}</td>
              <td><a href="mailto:{{ customer.CustomerEmail }}"> {{ customer.CustomerEmail }} </a></td>
              <td><a href="tel:{{ customer.CustomerPhone }}">{{ customer.CustomerPhone }}</a></td>
              <td>${{ customer.totalOrderSpending + customer.totalCustomOrderSpending }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        topPayingCustomers: [],
        loading: false,
        error: null,
      };
    },
    methods: {
      async getTopPayingCustomers() {
        this.loading = true;
  
        try {
          const response = await axios.get('http://localhost:8080/adminData/Reports/TopPayingCustomers');
  
          this.topPayingCustomers = response.data;
          this.error = null;
        } catch (error) {
          console.error('Error fetching top paying customers report:', error.response || error);
          this.error = 'Error fetching top paying customers report. Please try again.';
        } finally {
          this.loading = false;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .top-paying-customers-container {
    background-color: #f4f4f4;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  }
  
  .error-message {
    color: red;
    margin-top: 10px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
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
  