<template>
    <div>
    <button @click="goToOrderHistory" class="back-button">Back to Order History</button>
      <div class="order-summary">
        <h2>Order Details</h2>
        <div v-if="orderDetails">
          <p><strong>Order Number:</strong> {{ orderDetails.CustomOrderID }}</p>
          <p><strong>Order Date:</strong> {{ formatDate(orderDetails.DateOrdered) }}</p>
          <p><strong>Address:</strong> {{ orderDetails.Address }}</p>
          <p><strong>City:</strong> {{ orderDetails.CITY.City }}</p>
          <p><strong>State:</strong> {{ orderDetails.STATE.State }}</p>
          <p><strong>Zip Code:</strong> {{ orderDetails.ZipCode }}</p>
          <p><strong>Total Price:</strong> ${{ orderDetails.Total }}</p>
          <p><strong>Status:</strong> {{ orderDetails.StatusID }}</p> <!--  Replace this with orderDetails.STATUS.StatusID when table are remade-->
          <p><strong>Scheduled Delivery Date:</strong> {{ formatDate(orderDetails.DateScheduled) }}</p>
          <p><strong>Date Delivered:</strong> {{ formatDate(orderDetails.DateDelivered) }}</p>
        </div>
        <div class="product-container">
            <Products :OrderID="CustomOrderID"></Products>
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
    created() {
      this.fetchOrderDetails();
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
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
      },
      getStatusText(statusID) {
        return statusID === 1 ? 'Unapproved' : 'Approved';
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
  
.chat-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
.back-button {
  margin-bottom: 20px;
  background-color: #2f2f2f;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.back-button:hover {
  background-color: #1f1f1f;
}

  </style>
  