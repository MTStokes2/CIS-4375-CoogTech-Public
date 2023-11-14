<template>
  <div>
  <button @click="goToAdminOrders" class="back-button">Back to Order History</button>
    <div class="order-summary">
      <h2>Order Details</h2>
      <div v-if="orderDetails">
        <p><strong>Order Number:</strong> {{ orderDetails.OrderID }}</p>
        <p><strong>Order Date:</strong> {{ formatDate(orderDetails.DateOrdered) }}</p>
        <p><strong>Address:</strong> {{ orderDetails.Address }}</p>
        <p><strong>City:</strong> {{ orderDetails.CITY.City }}</p>
        <p><strong>State:</strong> {{ orderDetails.STATE.State }}</p>
        <p><strong>Zip Code:</strong> {{ orderDetails.ZipCode }}</p>
        <p><strong>Total Price:</strong> ${{ orderDetails.Total }}</p>
        <p><strong>Status:</strong> {{ orderDetails.STATUS.Status }}</p>
        <p><strong>Scheduled Delivery Date:</strong> {{ formatDate(orderDetails.DateScheduled) }}</p>
        <p><strong>Date Delivered:</strong> {{ formatDate(orderDetails.DateDelivered) }}</p>
        <p></p>
        <button @click="showEditForm(orderDetails)">Edit Order</button>

        <div v-if="currentForm != null" class="form-overlay">
          <OrdersEdit v-if="currentForm === 'edit'" :order="selectedOrder" @formClosed="currentForm = null" :orderID="this.selectedOrder.OrderID" />
          <button v-if="currentForm != null" class="close-button" @click="cancelForm">X</button>     
        </div>

      </div>
      <div class="product-container">
          <Products :OrderID="this.$route.params.id"></Products>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Products from '../components/OrderedProducts.vue';
import OrdersEdit from '../components/OrdersEdit.vue';

export default {
  components: {
  Products,
  OrdersEdit,
  },
  data() {
    return {
      orderDetails: [],
      OrderID: this.$route.params.id,
      selectedOrder: null,
      currentForm: null,
    };
  },
  created() {
    this.fetchOrderDetails();
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
              const response = await axios.get(`http://localhost:8080/customerData/Orders/${this.$route.params.id}`);
              if (response.status === 200) {
                  this.orderDetails = response.data.OrderDetails;
              } else {
                  console.error('Failed to fetch order details');
              }
          } catch (error) {
              console.error('Error fetching order details:', error);
      }
    },
    showEditForm(order) {
      this.selectedOrder = order;
      this.currentForm = 'edit';
    },
    cancelForm() {
      this.currentForm = null;
      this.fetchOrderDetails;
    },
    formatDate(date) {
      if (!date) {
        return "Not Delivered yet";
      }

      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString(undefined, options);
  },
    goToAdminOrders() {
    // Navigate back to the order history page
    this.$router.push('/AdminOrders'); // Update this with the correct route path
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
.form-overlay {
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, 0.5);
display: flex;
justify-content: center;
align-items: center;
z-index: 999; /* Adjust the z-index to make sure it's on top */
}
.close-button {
background-color: #ff6b81;
color: white;
border: none;
border-radius: 4px;
padding: 10px 20px;
font-size: 14px;
cursor: pointer;
position: relative;
right: 690px;
bottom: 200px;
box-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
}

.close-button:hover {
background-color: #e74c3c;
}
</style>
