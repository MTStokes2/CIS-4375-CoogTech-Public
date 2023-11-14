<template>
    <div>
      <div class="tables-container">
      <!-- Custom Orders Table -->
      <div v-if="customOrderHistory.length > 0" class="table-section">
        <button @click="goToDashboard" class="back-button">Back to Dashboard</button>
        <h1 class="table-header">Custom Orders</h1>
        <div class="table-container">
          <table class="custom-table table">
            <!-- Table headers -->
            <thead>
              <tr class="text-black">
                <th>Order Number</th>
                <th>Order Date</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Scheduled Delivery Date</th>
                <th>Date Delivered</th>
              </tr>
            </thead>
            <!-- Table body -->
            <tbody>
              <tr v-for="order in customOrderHistory" :key="order.CustomOrderID" @click="navigateToCustomOrderDetails(order.CustomOrderID)">
                <td>{{ order.CustomOrderID }}</td>
                <td>{{ formatDate(order.DateOrdered) }}</td>
                <td>${{ order.Total.toFixed(2) }}</td>
                <td>{{ order.STATUS.Status }}</td>
                <td>{{ formatDate(order.DateScheduled) }}</td>
                <td>{{ formatDate(order.DateDelivered) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <!-- Regular Orders Table -->
      <div v-if="OrderHistory.length > 0" class="table-section">
        <h1 class="table-header">Regular Orders</h1>
        <div class="table-container">
          <table class="custom-table table">
            <!-- Table headers -->
            <thead>
              <tr class="text-black">
                <th>Order Number</th>
                <th>Order Date</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Scheduled Delivery Date</th>
                <th>Date Delivered</th>
              </tr>
            </thead>
            <!-- Table body -->
            <tbody>
              <tr v-for="order in OrderHistory" :key="order.OrderID" @click="navigateToOrderDetails(order.OrderID)">
                <td>{{ order.OrderID }}</td>
                <td>{{ formatDate(order.DateOrdered) }}</td>
                <td>${{ order.Total.toFixed(2) }}</td>
                <td>{{ order.STATUS.Status }}</td>
                <td>{{ formatDate(order.DateScheduled) }}</td>
                <td>{{ formatDate(order.DateDelivered) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <!-- Message for Empty Tables -->
      <div v-if="customOrderHistory.length === 0 && OrderHistory.length === 0" class="text-center text-gray-600 text-lg mt-8">
        No orders available.
      </div>
    </div>
    </div>
  </template>

<script>

export default {
    data() {
        return {
            customOrderHistory: [],
            OrderHistory: [],
            username: '',
            role: ''
        };
    },
    created() {
        this.fetchUserInfo();
        this.fetchCustomOrderHistory();
        this.fetchOrderHistory();
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
        async fetchCustomOrderHistory() {
            try {
                const response = await fetch('http://localhost:8080/adminData/CustomOrders', {
                    method: 'GET',
                    credentials: 'include', // Use 'include' to send cookies with the request
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access-token')}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    this.customOrderHistory = data.CustomOrders;
                    console.log('Received Custom Order History:', data);
                } else {
                    console.error('Failed to fetch custom order history');
                }
            } catch (error) {
                console.error('Error fetching custom order history:', error);
            }
        },
        async fetchOrderHistory() {
            try {
                const response = await fetch('http://localhost:8080/adminData/Orders', {
                    method: 'GET',
                    credentials: 'include', // Use 'include' to send cookies with the request
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access-token')}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    this.OrderHistory = data.Orders;
                    console.log('Received Order History:', data);
                } else {
                    console.error('Failed to fetch order history');
                }
            } catch (error) {
                console.error('Error fetching order history:', error);
            }
        },
        formatDate(date) {
          if (!date) {
            return "Not Delivered yet";
          }

          const options = { year: 'numeric', month: 'long', day: 'numeric' };
          return new Date(date).toLocaleDateString(undefined, options);
        },
        navigateToCustomOrderDetails(customOrderID) {
            // Navigate to the order details page with the CustomOrderID as a route parameter
            this.$router.push({ name: 'AdminCustomOrderDetails', params: { id: customOrderID } });
        },
        navigateToOrderDetails(OrderID) {
            // Navigate to the order details page with the CustomOrderID as a route parameter
            this.$router.push({ name: 'AdminOrderDetails', params: { id: OrderID } });
        },
        goToDashboard() {
            this.$router.push('/AdminDashboard');
        }
    }
};
</script>
  
<style scoped>

.tables-container {
  display: flex;
  flex-direction: column;
  gap: 20px; /* Add gap between the tables */
}

.table-section {
  background-color: #ffffff; /* White background color */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1); /* Subtle box shadow for embossed effect */
}

.table-header {
  text-align: center;
  font-size: 24px;
  color: #333; /* Dark color for the headers */
  margin-bottom: 10px; /* Add space between header and table */
}

.table-container table td,
.table-container table th {
  padding: 10px;
  text-align: center;
}

/* Add a background color to alternating rows for better readability */
.table-container table tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

/* Style for status cells */
.Unapproved {
  color: #e74c3c; /* Red color for unapproved status */
}

.Approved {
  color: #27ae60; /* Green color for approved status */
}

/* Hover effect on table rows */
.table-container table tbody tr:hover {
  background-color: #ddd;
}

.table-container {
  background-color: #ffffff; /* White background color */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1); /* Subtle box shadow for embossed effect */
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