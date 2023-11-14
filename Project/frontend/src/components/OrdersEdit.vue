<template>
    <div class="modal-content">
      <h2>Edit Order</h2>

      <!-- Status update form -->
      <form @submit.prevent="updateStatus">
        <label for="status">Status:</label>
        <select v-model="selectedStatus">
          <option v-for="status in orderStatuses" :key="status.StatusID" :value="status.StatusID">{{ status.Status }}</option>
        </select>
        <button type="submit">Update Status</button>
      </form>

      <!-- Date delivered update form -->
      <form @submit.prevent="updateDateDelivered">
        <label for="dateDelivered">Date Delivered:</label>
        <input type="date" v-model="selectedDateDelivered">
        <button type="submit">Update Date Delivered</button>
      </form>

      <!-- Delete order button -->
      <button @click="deleteOrder">Delete Order</button>

      <!-- Success/Error messages -->
      <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </div>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    orderID: Number, // Pass the OrderID as a prop

  },
  data() {
    return {
      selectedStatus: null, // Selected status
      selectedDateDelivered: null, // Selected date delivered
      orderStatuses: [], // List of available statuses
      successMessage: '', // Success message
      errorMessage: '', // Error message
    };
  },
  methods: {
    async updateStatus() {
      // Send a request to your backend API to update the status
      try {
        const response = await fetch(`http://localhost:8080/adminData/Orders/${this.orderID}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ StatusID: this.selectedStatus }),
        });

        if (response.ok) {
          // Status updated successfully
          this.successMessage = 'Status updated';
          this.$router.push('/AdminOrders');
        } else {
          // Handle error
          this.errorMessage = 'Error updating status';
        }
      } catch (error) {
        this.errorMessage = 'An error occurred';
        console.error('Error updating status:', error);
      }
    },
    async updateDateDelivered() {
      // Send a request to your backend API to update the date delivered
      const formattedDate = moment(this.selectedDateDelivered ).format('MM/DD/YYYY');
      try {
        const response = await fetch(`http://localhost:8080/adminData/Orders/${this.orderID}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ DateDelivered: formattedDate }),
        });

        if (response.ok) {
          // Date delivered updated successfully
          this.successMessage = 'Date delivered updated';
          this.$router.push('/AdminOrders');
        } else {
          // Handle error
          this.errorMessage = 'Error updating date delivered';
        }
      } catch (error) {
        this.errorMessage = 'An error occurred';
        console.error('Error updating date delivered:', error);
      }
    },
    async deleteOrder() {
      // Send a request to your backend API to delete the order
      try {
        const response = await fetch(`http://localhost:8080/adminData/Orders/${this.orderID}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // Order deleted successfully
          this.successMessage = 'Order deleted';
          // Emit an event to close the modal and navigate to the order history
          this.$emit('closeModalAndNavigate');
          this.$router.push('/AdminOrders');
        } else {
          // Handle error
          this.errorMessage = 'Error deleting order';
        }
      } catch (error) {
        this.errorMessage = 'An error occurred';
        console.error('Error deleting order:', error);
      }
    },
  },
  async mounted() {
    // Fetch available statuses from your backend API
    try {
      const response = await fetch('http://localhost:8080/adminData/Status');
      if (response.ok) {
        this.orderStatuses = await response.json();
      } else {
        // Handle error
        this.errorMessage = 'Error fetching statuses';
        console.error('Error fetching statuses');
      }
    } catch (error) {
      this.errorMessage = 'An error occurred';
      console.error('Error fetching statuses:', error);
    }
  },
};
</script>

<style scoped>
/* Modal styles */
.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  overflow: auto;
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 600px;
  border-radius: 5px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>
