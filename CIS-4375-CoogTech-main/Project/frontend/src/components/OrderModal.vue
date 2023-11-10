<template>
  <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50">
    <div class="bg-white p-5 rounded-lg shadow-lg modal-container">
      <!-- Order Details -->
      <div class="order-details">
        <h2 class="text-xl font-bold mb-4">Order Details</h2>
        <p><strong>Order ID:</strong> {{ order.OrderID }}</p>
        <p><strong>Status:</strong> {{ order.STATUS.Status }}</p>
        <p><strong>Date Scheduled:</strong> {{ order.DateScheduled }}</p>
        <p><strong>Date Delivered:</strong> {{ order.DateDelivered }}</p>
        <p><strong>Address:</strong> {{ order.Address }}</p>
        <p><strong>City:</strong> {{ order.CITY.City }}</p>
        <p><strong>State:</strong> {{ order.STATE.State }}</p>
        <p><strong>ZipCode:</strong> {{ order.ZipCode }}</p>
        <p><strong>Total:</strong> {{ order.Total }}</p>
      </div>

      <!-- Customer Information -->
      <div class="customer-details">
        <h3 class="text-lg font-bold mt-4">Customer Information</h3>
        <p><strong>Name:</strong> {{ order.CustomerFirstName }} {{ order.CustomerLastName }}</p>
        <p><strong>Phone:</strong> {{ order.CustomerPhone }}</p>
        <p><strong>Email:</strong> {{ order.CustomerEmail }}</p>
      </div>

      <!-- Product Information -->
      <div class="product-details">
        <h3 class="text-lg font-bold">Products</h3>
        <ul>
          <li v-for="product in order.Products" :key="product.ProductID">
            <p><strong>Product Name:</strong> {{ product.ProductName }}</p>
            <p><strong>Type:</strong> {{ product.ProductType }}</p>
            <p><strong>Color:</strong> {{ product.ProductColor }}</p>
            <p><strong>Size:</strong> {{ product.ProductSize }}</p>
            <p><strong>Quantity:</strong> {{ product.Quantity }}</p>
          </li>
        </ul>
      </div>

      <!-- Update Form -->
      <div v-if="isUpdateMode" class="update-form">
        <h3 class="text-lg font-bold">Update Order</h3>
        <label>Status ID: <input type="number" v-model="editableOrder.StatusID"></label>
        <label>City ID: <input type="number" v-model="editableOrder.CityID"></label>
        <label>State ID: <input type="number" v-model="editableOrder.StateID"></label>
        <label>Zip Code: <input type="text" v-model="editableOrder.ZipCode"></label>
        <label>Address: <input type="text" v-model="editableOrder.Address"></label>
        <label>Total: <input type="number" v-model="editableOrder.Total"></label>
        <label>Date Delivered: <input type="date" v-model="editableOrder.DateDelivered"></label>
        <button @click="updateOrder" class="bg-blue-500 text-white px-4 py-2 rounded">Save Changes</button>
      </div>

      <!-- Modal Actions -->
      <div class="modal-actions">
        <button @click="toggleUpdateMode" class="bg-green-500 text-white px-4 py-2 rounded">Edit Order</button>
        <button @click="deleteOrder" class="bg-red-500 text-white px-4 py-2 rounded">Delete Order</button>
        <button @click="closeModal" class="bg-gray-500 text-white px-4 py-2 rounded">Close</button>
      </div>
    </div>
  </div>
</template>

  
<script>

export default {
  props: {
    isOpen: Boolean,
    order: Object,
  },
  data() {
    return {
      isUpdateMode: false,
      editableOrder: {},
    };
  },
  methods: {
    toggleUpdateMode() {
      this.isUpdateMode = !this.isUpdateMode;
      this.editableOrder = { ...this.order }; // Clone the order for editing
    },
    updateOrder() {
      const updatedOrder = {
        StatusID: this.editableOrder.StatusID,
        CityID: this.editableOrder.CityID,
        StateID: this.editableOrder.StateID,
        ZipCode: this.editableOrder.ZipCode,
        Address: this.editableOrder.Address,
        Total: this.editableOrder.Total,
        DateDelivered: this.editableOrder.DateDelivered,
      };
      fetch(`http://localhost:8080/adminData/Orders/${this.order.OrderID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedOrder),
      })
      .then(response => {
        if (response.ok) {
          this.$emit('orderUpdated', this.order.OrderID, updatedOrder);
          this.closeModal();
        } else {
          console.error('Error updating order');
        }
      })
      .catch(error => console.error("Error:", error));
    },
    deleteOrder() {
      fetch(`http://localhost:8080/adminData/Orders/${this.order.OrderID}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (response.ok) {
          this.$emit('orderDeleted', this.order.OrderID);
          this.closeModal();
        } else {
          console.error('Error deleting order');
        }
      })
      .catch(error => console.error("Error:", error));
    },
    closeModal() {
      this.$emit('close');
    },
  },
};
</script>

<style>
.modal-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  max-width: 1200px; /* Adjust as needed */
}

.order-details, .customer-details, .product-details {
  background: #f9f9f9;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}

.update-form {
  grid-column: 1 / -1; /* Span across all columns */
}

.modal-actions {
  grid-column: 1 / -1; /* Span across all columns */
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}

/* Additional styles */
</style>


  