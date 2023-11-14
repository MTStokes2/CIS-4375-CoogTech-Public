<template>
  <div>
    <button @click="goToAdminOrders()" class="back-button">Back to Orders</button>
    <div>
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
          <p><strong>Status:</strong> {{ orderDetails.STATUS.Status }}</p>
          <p><strong>Scheduled Delivery Date:</strong> {{ formatDate(orderDetails.DateScheduled) }}</p>
          <p><strong>Date Delivered:</strong> {{ formatDate(orderDetails.DateDelivered) }}</p>
          <p></p>
          <button @click="showEditForm(orderDetails)">Edit Order</button>

          <div v-if="currentForm != null" class="form-overlay">
            <CustomOrdersEdit v-if="currentForm === 'edit'" :order="selectedOrder" @formClosed="currentForm = null" :customOrderID="this.selectedOrder.CustomOrderID" />
            <button v-if="currentForm != null" class="close-button" @click="cancelForm">X</button>     
          </div>
          <div class="product-container">
            <Products :OrderID="this.$route.params.id"></Products>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="column">
        <div class="chat-container">
          <h2 class="component-title">Order ID: {{ CustomOrderID }}</h2>
          <ChatComponent :customOrderID="this.$route.params.id" :username="username" :role="role"></ChatComponent>
        </div>
      </div>
      <div class="column">
        <div class="custom-product-container">
          <h2 class="component-title">Create New Product</h2>
          <AddCustomProduct :customOrderID="CustomOrderID" @customProductAdded="handleCustomProductAdded" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import ChatComponent from '../components/CustomerChat.vue';

import AddCustomProduct from '../components/CustomAddProduct.vue';

import CustomOrdersEdit from '../components/CustomOrdersEdit.vue';

import Products from '../components/OrderedCustomProducts.vue';

export default {
  components: {
    ChatComponent,
    AddCustomProduct,
    CustomOrdersEdit,
    Products
  },
  data() {
    return {
      orderDetails: {},
      CustomOrderID: this.$route.params.id,
      username: '',
      role: '',
      currentForm: null, // To control the visibility of the modal
    };
  },
  async created() {
    await Promise.all([this.fetchOrderDetails(), this.fetchUserInfo()]);
  },
  methods: {
    async fetchUserInfo() {
      try {
        const response = await fetch('http://localhost:8080/UserInformation', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          this.username = data.username;
          this.role = data.role;
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
    goToAdminOrders() {
      this.$router.push('/AdminOrders');
    },
    showEditForm(customorder) {
      this.selectedOrder = customorder;
      this.currentForm = 'edit';
    },
    cancelForm() {
      this.currentForm = null;
      this.fetchOrderDetails;
    },
    async handleCustomProductAdded(customProductData) {
      try {

        await axios.post(`http://localhost:8080/adminData/CustomOrders/${this.$route.params.id}/products`, {
          CustomProductID: customProductData.CustomProductID,
          Quantity: customProductData.Quantity,
        });
        console.log(customProductData.CustomProductID,customProductData.Quantity)

        console.log('Custom product added to order');
      } catch (error) {
        console.error('Error adding custom product to order', error);
      }
    },
    formatDate(date) {
        if (!date) {
          return "Not Delivered yet";
        }

        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    },
  },
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
/* Style for the container */
.container {
  display: flex;
  flex-direction: row; /* Place divs side by side */
}

/* Style for each column */
.column {
  flex: 1;
  padding: 20px;
  box-sizing: border-box;
}

/* Style for the chat container */
.chat-container {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

/* Style for the "Create Custom Product" container */
.custom-product-container {
  background-color: transparent;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

/* Style for component title */
.component-title {
  font-size: 20px;
  margin-bottom: 10px;
  font-weight: bold;
}

/* Media query for responsive layout (optional) */
@media (max-width: 768px) {
  .container {
    flex-direction: column; /* Stack columns vertically on smaller screens */
  }
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
.close-button {
  background-color: #ff6b81;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  position: relative;
  right: 60px;
  bottom: 55px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
}

.close-button:hover {
  background-color: #e74c3c;
}
</style>
