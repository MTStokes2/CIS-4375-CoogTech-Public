<template>
    <div>
    <button @click="goToOrderHistory" class="back-button">Back to Order History</button>
      <div class="order-summary">
        <h2>Order Details</h2>
        <div v-if="orderDetails && orderDetails.CITY && orderDetails.STATE">
          <p><strong>Order Number:</strong> {{ orderDetails.CustomOrderID }}</p>
          <p><strong>Order Date:</strong> {{ formatDate(orderDetails.DateOrdered) }}</p>
          <p><strong>Address:</strong> {{ orderDetails.Address }}</p>
          <p><strong>City:</strong> {{ orderDetails.CITY.City }}</p>
          <p><strong>State:</strong> {{ orderDetails.STATE.State }}</p>
          <p><strong>Zip Code:</strong> {{ orderDetails.ZipCode }}</p>
          <p><strong>Total Price:</strong> ${{ orderDetails.Total }}</p>
          <p><strong>Status:</strong> {{ orderDetails.STATUS.Status }}</p> 
          <p><strong>Scheduled Delivery Date:</strong> {{ formatDate(orderDetails.DateScheduled) }}</p>
          <p><strong>Date Delivered:</strong> {{ formatDate(orderDetails.DateDelivered) }}</p>
        </div>
        <div v-else>
        <p>No order details available.</p>
        </div>
        <div class="product-container">
            <Products :OrderID="CustomOrderID"></Products>
        </div>
        <div class="notice">
          <p>Please provide details about the custom item you wish to have, and an admin will help work out the details.</p>
            <p>Use the chat for additional notes/questions.</p>
            <p>An admin will review and finalize details.</p>
            <p>Prices based on materials and design complexity.</p>
        </div>
        <div class="chat-container">
            <ChatComponent :customOrderID="orderDetails.CustomOrderID" :username="this.username" :role="this.role"></ChatComponent>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import ChatComponent from '../components/CustomerChat.vue';
  import Products from '../components/OrderedCustomProducts.vue';
  
  export default {
    components: {
    ChatComponent,
    Products
    },
    data() {
      return {
        orderDetails: [],
        CustomOrderID: this.$route.params.id,
        username: '',
        role: ''
      };
    },
    async created() {

      await Promise.all([this.fetchOrderDetails(), this.fetchUserInfo()])
      
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
                this.username = data.username;
                this.role = data.role;
                console.log('Received UserInfo:', data);
                } else {
                console.error('Failed to fetch user info');
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
        }
      },
          async fetchOrderDetails() {
              try {
                  const response = await axios.get(`http://localhost:8080/customerData/CustomOrders/${this.$route.params.id}`);
                  if (response.status === 200) {
                      this.orderDetails = response.data.OrderDetails;
                  } else {
                      console.error('Failed to fetch order details');
                  }
              } catch (error) {
                  console.error('Error fetching order details:', error);
              }
          },
      formatDate(date) {
        if (!date) {
            return "Not Delivered yet";
          }

        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
      },
      goToOrderHistory() {
      // Navigate back to the order history page
      this.$router.push('/orderhistory'); // Update this with the correct route path
    }
    }
  };
  </script>
  
  <style scoped>
.order-summary {
  margin: 20px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.order-summary h2 {
  font-size: 24px;
  margin-bottom: 15px;
}

.order-summary p {
  margin: 10px 0;
  font-size: 16px;
}

.order-summary strong {
  font-weight: bold;
  margin-right: 10px;
}

.order-summary div {
  margin-top: 20px;
}
  
.back-button {
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

.chat-container {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.notice {
  margin: 20px 0;
  padding: 15px;
  background-color: #ffeaa7; /* Update to your preferred color */
  border: 1px solid #e17055; /* Update to your preferred color */
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add a subtle box shadow */
  color: #d35400; /* Update to your preferred text color */
  font-weight: bold;
}

.notice p {
  margin: 0;
  font-size: 14px;
  color: #333;
}

  </style>
  