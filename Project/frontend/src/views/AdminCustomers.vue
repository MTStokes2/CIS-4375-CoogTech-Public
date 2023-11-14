<template>
    <div class="customers-container">
      <h1>Customers</h1>
      <input v-model="searchQuery" placeholder="Search customers..." />
      <table class="customers-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Zip Code</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="customer in filteredCustomers" :key="customer.CustomerID">
            <td>{{ customer.CustomerFirstName }}</td>
            <td>{{ customer.CustomerLastName }}</td>
            <td>{{ customer.CustomerAddress }}</td>
            <td>{{ customer.CITY.City }}</td>
            <td>{{ customer.STATE.State }}</td>
            <td>{{ customer.ZipCode }}</td>
            <td><a href="tel:{{ customer.CustomerPhone }}">{{ customer.CustomerPhone }}</a></td>
            <td><a href="mailto:{{ customer.CustomerEmail }}"> {{ customer.CustomerEmail }} </a></td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import Sidebar from '@/components/Sidebar.vue';
  
  export default {
    components: {
      Sidebar
    },
    data() {
      return {
        customers: [],
        searchQuery: ''
      };
    },
    computed: {
      filteredCustomers() {
        return this.customers.filter(customer => {
          return Object.values(customer).some(value =>
            value
              .toString()
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase())
          );
        });
      }
    },
    
    mounted() {
      fetch("http://localhost:8080/adminData/Customers")
        .then(response => response.json())
        .then(data => {
          this.customers = data;
        })
        .catch(error => {
          console.error("Error fetching customers:", error);
        });
    }
  };
  </script>
  
  <style scoped>
  .customers-container {
    font-family: Arial, sans-serif;
    padding: 20px;
    background: #f9f9f9;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    margin-left: 20px;
    /* Additional styles for the customers container can go here */
  }
  
  .customers-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  .customers-table th,
  .customers-table td {
    padding: 12px 15px;
    border: 1px solid #ddd;
  }
  
  .customers-table thead tr {
    background-color: #4c89af;
    color: #fff;
  }
  
  .customers-table tbody tr:hover {
    background-color: #f5f5f5;
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
  