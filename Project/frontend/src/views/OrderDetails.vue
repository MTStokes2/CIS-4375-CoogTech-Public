<template>
    <div>
    <button @click="goToOrderHistory" class="back-button">Back to Order History</button>
      <div class="order-summary">
        <h2>Order Details</h2>
        <div v-if="orderDetails && orderDetails.CITY && orderDetails.STATE">
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
        </div>
        <div class="product-container">
            <Products :OrderID="OrderID"></Products>
        </div>
        <div v-if="orderDetails.STATUS.Status === 'Closed'">
        <div class="feedback-container">
          <h3>Feedback</h3>
          <textarea
            v-model="feedback"
            placeholder="Enter your feedback"
          ></textarea>
          <button @click="submitFeedback" class="submit-button">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
  import axios from 'axios';
  import Products from '../components/OrderedProducts.vue';
  
  export default {
    components: {
    Products,
    },
    data() {
      return {
        orderDetails: [],
        OrderID: this.$route.params.id,
        feedback: '',
        isFeedbackSubmitted: false,
        username: ''
      };
    },
    created() {
      this.fetchOrderDetails();
      this.fetchUserInfo();
    },
    methods: {

      async fetchOrderFeedback() {
      try {
        const response = await fetch(
          `http://localhost:8080/customerData/Feedback/${this.OrderID}`,
          {
            method: 'GET',
            credentials: 'include', // Use 'include' to send cookies with the request
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('response feedback: ', response);
        if (response.ok) {
          const data = await response.json();
          console.log('Feedback: ', data);
        } else {
          console.error('Failed to fetch user info');
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    },
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
                    this.fetchOrderFeedback(this.$route.params.id);
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
    },
    async submitFeedback() {
      try {
        const response = await axios.post(
          'http://localhost:8080/customerData/Feedback',
          {
            OrderID: this.orderDetails.OrderID,
            Username: this.username,
            Feedback: this.feedback,
            Rating: 5,
          }
        );

        if (response.status === 201) {
          console.log('Feedback submitted successfully');
        } else {
          console.error('Failed to submit feedback');
        }
      } catch (error) {
        console.error('Error submitting feedback:', error);
      }
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

.feedback-container {
  width: 100%;
}

.feedback-container h3 {
  font-size: 24px;
  margin-bottom: 15px;
}

.feedback-container textarea {
  width: 100%;
  resize: none;
  height: 120px;
}

.feedback-container button {
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

  </style>
  