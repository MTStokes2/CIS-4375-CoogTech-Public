<template>
    <div class="report-container">
      <div class="navbar-container">
        <button @click="getTopSellingProducts">Top Selling Products</button>
        <button @click="getCurrentTotalSalesByType">Get Current Month Product Sales by Type</button>
        <button @click="getLastTotalSalesByType">Get Last Months Product Sales by Type</button>
      </div>
    
      <div v-if="loading">Loading...</div>
  
      <div v-if="error" class="error-message">{{ error }}</div>
  
      <div v-if="totalSalesByType.length > 0">
        <h3 class="header">Total Sales By Product Type:</h3>
        <table>
          <thead>
            <tr>
              <th>Product Type</th>
              <th>Total Sales</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in totalSalesByType" :key="item.ProductType">
              <td>{{ item.PRODUCT.ProductType }}</td>
              <td>${{ item.totalSales.toFixed(2) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="lastSalesbyType.length > 0">
      <h3 class="header">Last Months Total Sales By Product Type:</h3>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Total Quantity Sold</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in lastSalesbyType" :key="item.ProductType">
            <td>{{ item.PRODUCT.ProductType }}</td>
            <td>{{ item.totalSales.toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="topSellingProducts.length > 0">
      <h3 class="header">Top Selling Products:</h3>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Total Quantity Sold</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in topSellingProducts" :key="product.ProductID">
            <td>{{ product.PRODUCT.ProductName }}</td>
            <td>{{ product.totalQuantity }}</td>
          </tr>
        </tbody>
      </table>
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
        totalSalesByType: [],
        lastSalesbyType: [],
        topSellingProducts: [],
        loading: false,
        error: null,
      };
    },
    methods: {
      async getCurrentTotalSalesByType() {
        this.loading = true;
        this.clearTables();

        try {

          const startDate = moment(this.startDate);

          const firstDayOfNextMonth = startDate.clone().subtract(1, 'months').endOf('month').format('MM/DD/YYYY');
          const lastDayOfNextMonth = startDate.clone().add(0, 'months').endOf('month').format('MM/DD/YYYY');

          const response = await axios.get('http://localhost:8080/adminData/Reports/TotalSalesByType', {
            params: {
              startDate: firstDayOfNextMonth,
              endDate: lastDayOfNextMonth,
            },
          });
  
          this.totalSalesByType = response.data;
          this.error = null;
        } catch (error) {
          console.error('Error fetching report:', error.response || error);
          this.error = 'Error fetching report. Please check your input and try again.';
        } finally {
          this.loading = false;
        }
      },
      async getLastTotalSalesByType() {
        this.loading = true;
        this.clearTables();

        const startDate = moment(this.startDate);

        const firstDayOfNextMonth = startDate.clone().subtract(1, 'months').startOf('month').format('MM/DD/YYYY');;
          const lastDayOfNextMonth = startDate.clone().subtract(1, 'months').endOf('month').format('MM/DD/YYYY');
        
          console.log(lastDayOfNextMonth)

        try {
          const response = await axios.get('http://localhost:8080/adminData/Reports/TotalSalesByType', {
            params: {
              startDate: firstDayOfNextMonth,
              endDate: lastDayOfNextMonth,
            },
          });
  
          this.lastSalesByType = response.data;
          this.error = null;
        } catch (error) {
          console.error('Error fetching report:', error.response || error);
          this.error = 'Error fetching report. Please check your input and try again.';
        } finally {
          this.loading = false;
        }
      },
      async getTopSellingProducts() {
      this.loading = true;
      this.clearTables();

      const startDate = moment(this.startDate);

        const firstDayOfNextMonth = startDate.format('MM/DD/YYYY');;
        const lastDayOfNextMonth = startDate.clone().add(1, 'months').endOf('month').format('MM/DD/YYYY');

      try {
        const response = await axios.get('http://localhost:8080/adminData/Reports/Top-Selling-Products', {
          params: {
            startDate: firstDayOfNextMonth,
            endDate: lastDayOfNextMonth,
          },
        });

        this.topSellingProducts = response.data.topSellingProducts;
        this.error = null;
      } catch (error) {
        console.error('Error fetching report:', error.response || error);
        this.error = 'Error fetching report. Please check your input and try again.';
      } finally {
        this.loading = false;
      }
    },
    clearTables() {
    this.totalSalesByType = [];
    this.topSellingProducts = [],
      this.error = null;
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

table tbody tr:hover {
  background-color: #ddd;
}

.header {
  text-align: center;
  font-size: 24px;
  color: #333; /* Dark color for the headers */
  margin-bottom: 10px; /* Add space between header and table */
}

  </style>
  