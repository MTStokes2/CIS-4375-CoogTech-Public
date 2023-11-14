<template>
      <button @click="goToCatalog" class="back-button">Back to Catalog</button>
      <div class="container">
        <h1 v-if="!editMode">Customer Information</h1>
        <h2 v-if="editMode">Edit Information</h2>

        <div v-if="!customer">
      <p>Please log in or sign up to view your information.</p>
        </div>

      <div v-if="!editMode && customer" class="info-container">
        <p><strong>Name:</strong> {{ customer.CustomerFirstName }} {{ customer.CustomerLastName }}</p>
        <p><strong>Email:</strong> <a href="mailto:{{ customer.CustomerEmail }}"> {{ customer.CustomerEmail }} </a></p>
        <p><strong>Phone:</strong> <a href="tel:{{ customer.CustomerPhone }}"> {{ customer.CustomerPhone }} </a></p>
        <p><strong>City:</strong> {{ customer.CITY.City }}</p>
        <p><strong>State:</strong> {{ customer.STATE.State }}</p>
        <p><strong>Address:</strong> {{ customer.CustomerAddress }}</p>
        <button @click="editMode = true" class="edit-button">Edit</button>
      </div>
      <div v-if="editMode" class="edit-form">
        <form @submit.prevent="saveChanges">
          <div>
            <label for="firstName">First Name:</label>
            <input type="text" id="firstName" v-model="customer.CustomerFirstName">
          </div>
          <div>
            <label for="lastName">Last Name:</label>
            <input type="text" id="lastName" v-model="customer.CustomerLastName">
          </div>
          <div>
            <label for="email">Email:</label>
            <input type="text" id="email" v-model="customer.CustomerEmail">
          </div>
          <div>
            <label for="phone">Phone Number:</label>
            <input type="text" id="phone" v-model="customer.CustomerPhone">
          </div>
          <div>
            <label for="city">City:</label>
            <input type="text" id="city" v-model="customer.CITY.City">
        </div>
          <div>
            <label for="state">State:</label>
            <input type="text" id="state" v-model="customer.STATE.State">
          </div>
          <div>
            <label for="address">Address:</label>
            <input type="text" id="address" v-model="customer.CustomerAddress">
          </div>
          <button type="submit" class="save-button">Save Changes</button>
          <button @click="editMode = false" class="cancel-button">Cancel</button>
        </form>
      </div>

      <p v-if="loading" class="loading">Loading...</p>
      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">{{ success }}</p>
    </div>
  </template>
  
<script>
import axios from 'axios';

  export default {
    data() {
      return {
        customer: null,
        editMode: false,
        loading: false,
        error: null,
        success: null,
      };
    },
    mounted() {
        this.fetchCustomerInfo();
    },
    methods: {
    async fetchCustomerInfo() {
      try {
        const response = await axios.get('http://localhost:8080/customerData/AccountInfo/', {
          withCredentials: true
        });

        if (response.status === 200) {
          this.customer = response.data.customer
          console.log('Received Customer:', this.customer);
        } else {
          console.error('Failed to fetch user info');
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    },
    saveChanges() {
  this.loading = true;
  this.error = null;
  this.success = null;

  // Construct the object with non-null and non-empty properties
  const updatedCustomerInfo = {
    CustomerFirstName: this.customer.CustomerFirstName,
    CustomerLastName: this.customer.CustomerLastName,
    CustomerEmail: this.customer.CustomerEmail,
    CustomerPhone: this.customer.CustomerPhone,
    City: this.customer.CITY.City,
    State: this.customer.STATE.State,
    CustomerAddress: this.customer.CustomerAddress,
  };

  // Remove null or empty properties from the object
  Object.keys(updatedCustomerInfo).forEach(key => {
    if (updatedCustomerInfo[key] === null || updatedCustomerInfo[key] === '') {
      delete updatedCustomerInfo[key];
    }
  });

  // Send a PUT request to update customer information
  axios.put('http://localhost:8080/customerData/AccountInfo', updatedCustomerInfo, {
    withCredentials: true
  })
    .then(response => {
      this.success = response.data.message;
      this.editMode = false;
      this.fetchCustomerInfo();
    })
    .catch(error => {
      this.error = 'Failed to update customer information. Please try again.';
      console.error(error);
    })
    .finally(() => {
      this.loading = false;
    })
  },
  goToCatalog() {
  this.$router.push('/catalog');
}

}};

</script>
<style scoped>
body {
  font-family: Arial, sans-serif;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  flex: 1;
  padding: 20px;
  background-color: #fff;
}

h1, h2 {
  text-align: center;
  margin-bottom: 20px;
}

div {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
}

input[type="text"] {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
    background-color: #ff6b81;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  margin-top: 10px; 
  margin-right: 10px;
}
.cancel-button {
  margin-right: 0;
}

button:hover {
    background-color: #e74c3c;
}

p {
  margin-bottom: 10px;
}

.loading {
  text-align: center;
  font-style: italic;
  color: #777;
}

.error {
  color: #ff0000;
  font-weight: bold;
}

.success {
  color: #008000;
  font-weight: bold;
}

.back-button {
  margin-bottom: 20px;
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

.back-button:hover {
  background-color: #e74c3c;
}

</style>


  