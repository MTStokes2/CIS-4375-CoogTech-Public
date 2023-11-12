<template>
    <div class="order-form-container">
      <form @submit.prevent="submitOrder" class="order-form">

        <div class="form-group" v-if="userInfoReceived">
            <button @click="loadCustomerInfo" class="load-address-button">Use My Address</button>
        </div>
  
        <div class="form-group">
        <label for="city">City:</label>
        <input v-model="orderInfo.City" type="text" id="city" required />
      </div>

      <div class="form-group">
        <label for="state">State:</label>
        <input v-model="orderInfo.State" type="text" id="state" required />
      </div>
  
        <div class="form-group">
          <label for="zipcode">Zip Code:</label>
          <input v-model="orderInfo.ZipCode" type="text" id="zipcode" required />
        </div>
  
        <div class="form-group">
          <label for="address">Street:</label>
          <input v-model="orderInfo.Address" type="text" id="address" required />
        </div>
  
        <div class="form-group">
          <label for="dateScheduled">When do you want it delivered?:</label>
          <input v-model="orderInfo.DateScheduled" type="date" id="dateScheduled" required />
        </div>
  
        <button type="submit" class="submit-button">Submit Order</button>
      </form>
  </div>
  </template>
  
<script>
import axios from 'axios';
import moment from 'moment';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
props: {
    cartData: {
        type: Array,
        required: true
    }
},
setup(props) {
    const orderInfo = ref({
        Username: '',
        StatusID: 1,
        City: '',
        State: '',
        ZipCode: '',
        Address: '',
        DateScheduled: new Date().toISOString().split('T')[0],
    });

    const userInfoReceived = ref(false);

    const router = useRouter();

    onMounted(async () => {
        await fetchUserInfo();
        console.log(props.cartData)
    });

    const fetchUserInfo = async () => {
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
            orderInfo.value.Username = data.username;
            // Set other user information properties as needed
            console.log('Received UserInfo:', data);
            userInfoReceived.value = true;
        } else {
            console.error('Failed to fetch user info');
        }
        } catch (error) {
        console.error('Error fetching user info:', error);
        }
    };

    const loadCustomerInfo = async () => {
      try {
        const response = await axios.get('http://localhost:8080/customerData/AccountInfo/', {
          withCredentials: true // Include credentials for authentication if needed
        });

        if (response.status === 200) {
          const data = response.data.customer;
          orderInfo.value.City = data.CITY.City;
          orderInfo.value.State = data.STATE.State;
          orderInfo.value.ZipCode = data.ZipCode;
          orderInfo.value.Address = data.CustomerAddress;
          console.log('Received Customer:', data);
        } else {
          console.error('Failed to fetch user info');
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    const submitOrder = async () => {
        try {
            // Create the order and obtain its ID
            
            const formattedDate = moment(orderInfo.value.DateScheduled).format('MM/DD/YYYY');

            const response = await axios.post('http://localhost:8080/customerData/Orders', {
              Username: orderInfo.value.Username,
              StatusID: orderInfo.value.StatusID,
              City: orderInfo.value.City,
              State: orderInfo.value.State,
              ZipCode: orderInfo.value.ZipCode,
              Address: orderInfo.value.Address,
              DateScheduled: formattedDate,
            });
            const OrderID = response.data.OrderID;

            // Add products to the created order
            for (const product of props.cartData) {
                await axios.post(`http://localhost:8080/customerData/Orders/${OrderID}/products`, {
                    ProductID: product.ProductID,
                    Quantity: product.Quantity
                });
            }

            // Order and products added successfully, navigate to success page or any other route
            router.push({ name: 'orderhistory' });
        } catch (error) {
            console.error('Error creating order and adding products:', error);
            router.push({ name: 'Login' });
        }
    };

    return {
        orderInfo,
        submitOrder,
        loadCustomerInfo,
        userInfoReceived
    };
}
};
</script>
  
  <style scoped>
.order-form-container {
  max-width: 400px;
  margin: 0 auto;
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

label {
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

</style>
  