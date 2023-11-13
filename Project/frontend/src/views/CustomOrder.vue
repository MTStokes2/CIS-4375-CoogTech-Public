
<template>
  <button @click="goToCatalog" class="back-button">Back to Catalog</button>
  <div class="order-page">
    <div class="form-section">
      <div class="order-form-container">
          <h1 class="center text-3xl text-green-900 font-bold mb-6">Custom Order</h1>
          <form @submit.prevent="submitOrder()" class="order-form">
  
            <div class="form-group" v-if="userInfoReceived">
              <button @click="loadCustomerInfo" class="load-address-button">Use My Address</button>
            </div>
  
            <div class="form-group">
              <label for="city">City</label>
              <input type="text" id="city" v-model="this.City" required class="rounded-input">
            </div>
  
            <div class="form-group">
              <label for="state">State</label>
              <input type="text" id="state" v-model="this.State" required class="rounded-input">
            </div>
            <div class="form-group">
              <label for="address">Address</label>
              <input type="text" id="address" v-model="this.Address" required class="rounded-input">
            </div>
  
            <div class="form-group">
              <label for="zipcode">Zip Code</label>
              <input type="text" id="zipcode" v-model="this.Zipcode" required class="rounded-input">
            </div>
  
            <div class="form-group">
              <label for="deliveryDay">When do you want it delivered?:</label>
              <input type="date" id="deliveryDay" v-model="this.DateScheduled" required class="rounded-input">
            </div>
  
            <div class="form-group">
              <button type="submit" class="submit-button">Proceed</button>
            </div>
          </form>
        </div>
        </div>
  
    <div class="details-section">
      <h2 class="text-2xl text-green-900 font-bold mb-6">Custom Order Details</h2>
      <div class="custom-order-info">
        <p>
          <strong class="text-green-900 font-bold">Order Approval:</strong> 
          <br>All custom orders start as "Unapproved" and require review and approval by our Admin team.
        </p>
        <br>
        <p>
          <strong class="text-green-900 font-bold">Communication and Design:</strong> 
          <br>Describe your design or provide any relevant information. Our Admins are here to assist you in the design process.
          <br>Use the chat section in the Custom Order Details Page to communicate with our Admins. Describe your design or provide any relevant information.
        </p>
        <br>
        <p>
          <strong class="text-green-900 font-bold">Pricing:</strong>
          <br>The price for custom products is determined by our Admins based on materials and design complexity.
        </p>
        <br>
        <p>
          <strong class="text-green-900 font-bold">Material Options for Shirts:</strong> 
          <br>Choose from quality shirt materials, including: 
          <br> - 100% Cotton
          <br> - 50/50 Polyester/Cotton
          <br> - Blend
          <br> - Dri-Fit
        </p>
        <br>
        <p>
        <strong class="text-green-900 font-bold">Delivery and Shipping:</strong>
        <br>Details about the estimated delivery date and shipping options will be provided once the order is finalized.
        Inquire about expedited shipping or special delivery by contacting us at:
        <br><strong class="text-green-900 font-bold">Email:</strong> <a href="mailto:VargasErikaY@gmail.com ">VargasErikaY@gmail.com </a>
        <br><strong class="text-green-900 font-bold">Phone:</strong> <a href="tel:+18327243673">(832)724-3673</a>
        </p>
        <br>
        <p>
        <strong class="text-green-900 font-bold">Our Commitment:</strong> 

        <br>We are dedicated to providing you with a personalized and seamless experience.
        Our Admins are here to ensure your custom product meets your expectations.
        </p>
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
            Username: '',
            Address: '',
            City: '',
            State: '',
            Zipcode: '',
            DateScheduled: new Date().toISOString().split('T')[0],
            userInfoReceived: false
        };
    },
    mounted() {
        this.fetchUserInfo();
    },
    methods: {
        async fetchUserInfo() {
        try {
        const response = await fetch('http://localhost:8080/UserInformation', {
            method: 'GET',
            credentials: 'include', // Use 'include' to send cookies with the request
            headers: {
            "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            const data = await response.json();
            this.Username = data.username;
            console.log('Received UserInfo:', data);
            this.userInfoReceived = true;
        } else {
            console.error('Failed to fetch user info');
        }
        } catch (error) {
        console.error('Error fetching user info:', error);
        }
    },
        async loadCustomerInfo() {
            try {
                const response = await axios.get('http://localhost:8080/customerData/AccountInfo/', {
                    withCredentials: true // Include credentials for authentication if needed
                });

                if (response.status === 200) {
                    const data = response.data.customer;
                    this.City = data.CITY.City;
                    this.State = data.STATE.State;
                    this.Zipcode = data.ZipCode;
                    this.Address = data.CustomerAddress;
                    console.log('Received Customer:', data);
                } else {
                    console.error('Failed to fetch user info');
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        },

        async submitOrder() {
            try {
                const formattedDate = moment(this.DateScheduled).format('MM/DD/YYYY');

                const response = await axios.post('http://localhost:8080/customerData/CustomOrders', {
                    Username: this.Username,
                    StatusID: 1,
                    Address: this.Address,
                    City: this.City,
                    State: this.State,
                    ZipCode: this.Zipcode,
                    DateScheduled: formattedDate,
                    withCredentials: true // Include credentials for authentication if needed
                });
                const OrderID = response.data.customOrder.CustomOrderID;
                console.log(response.data)
                // Check if the request was successful

                // Redirect to the order history page or perform any other actions
                this.$router.push({ name: 'CustomOrderDetails', params: { id: OrderID } });

            } catch (error) {
                console.error('Error submitting order:', error);
            }
        },
        goToCatalog() {
            this.$router.push('/catalog');
        }
    },
};
</script>
  
<style scoped>
.order-page {
  display: flex;
  justify-content: space-between;
  max-width: 900px;
  margin: 0 auto;
}

.form-section {
  flex: 1;
  margin-right: 20px; /* Adjust the margin as needed */
}

.order-form-container {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.order-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 16px;
}

.label {
  font-weight: bold;
  margin-bottom: 8px;
}

input[type="text"],
input[type="number"],
input[type="date"] {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.submit-button {
  background-color: #ff6b81;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  margin-top: 10px; 
}

.submit-button:hover {
  background-color: #e74c3c;
}

.load-address-button {
  background-color: #ff6b81;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  margin-top: 10px;
}

.load-address-button:hover {
  background-color: #e74c3c;
}

.details-section {
  flex: 1;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
  