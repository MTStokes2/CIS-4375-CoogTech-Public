
<template>
    <div>
        <h1 class="center text-3xl text-green-900 font-bold mb-6">Custom Order</h1>
        <form @submit.prevent="submitOrder()">

            <div class="form-group" v-if="userInfoReceived">
            <button @click="loadCustomerInfo" class="load-address-button">Use My Address</button>
            </div>

            <div class="form-row mb-4">
                <label for="address">Address</label>
                <input type="text" id="address" v-model="this.Address" required class="rounded-input">
            </div>

            <div class="form-row mb-4">
                <label for="city">City</label>
                <input type="text" id="city" v-model="this.City" required class="rounded-input">
            </div>

            <div class="form-row mb-4">
                <label for="state">State</label>
                <input type="text" id="state" v-model="this.State" required class="rounded-input">
            </div>

            <div class="form-row mb-4">
                <label for="zipcode">Zip Code</label>
                <input type="text" id="zipcode" v-model="this.Zipcode" required class="rounded-input">
            </div>

            <div class="form-row mb-4">
                <label for="deliveryDay">Delivery Day</label>
                <input type="date" id="deliveryDay" v-model="this.DateScheduled" required class="rounded-input">
            </div>

            <div class="form-row">
                <button type="submit" class="submit-button">Submit Order</button>
            </div>
        </form>
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
    },
};
</script>
  
<style scoped>
.form-row {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
}

label {
    width: 180px;
    text-align: right;
    padding-right: 10px;
}

input {
    margin-left: 10px;
    /* Adjust the margin as needed to add space between text and input */
    padding: 10px;
    border-radius: 10px;
}

.rounded-button {
    background-color: #F5F5DC;
    color: rgb(16, 82, 25);
    padding: 10px 20px;
    text-decoration: none;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
    margin-left: 190px;
    /* Adjust the margin to align the button with the input fields */
}

.rounded-button:hover {
    background-color: #F5F5DC;
}
</style>
  