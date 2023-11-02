<template>
    <div>
    <button @click="goToCatalog" class="back-button">Back to Catalog</button>
      <div class="custom-table-container">
        <div v-if="customOrderHistory.length > 0">
          <table class="custom-table table">
            <thead>
              <tr class="text-black">
                <th>Order Number</th>
                <th>Order Date</th>
                <th>Address</th>
                <th>City</th>
                <th>State</th>
                <th>Zip Code</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Scheduled Delivery Date</th>
                <th>Date Delivered</th>
              </tr>
            </thead>
            <tbody>
                <tr v-for="order in customOrderHistory" :key="order.CustomOrderID" @click="navigateToOrderDetails(order.CustomOrderID)">
                <td>{{ order.CustomOrderID }}</td>
                <td>{{ formatDate(order.DateOrdered) }}</td>
                <td>{{ order.Address }}</td>
                <td>{{ order.CityID }}</td>
                <td>{{ order.StateID }}</td>
                <td>{{ order.ZipCode }}</td>
                <td>${{ order.Total.toFixed(2) }}</td>
                <td :class="getStatusClass(order.StatusID)">{{ getStatusClass(order.StatusID) }}</td>
                <td>{{ formatDate(order.DateScheduled) }}</td>
                <td>{{ formatDate(order.DateDelivered) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="text-center text-gray-600 text-lg mt-8">
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
            username: '',
            role: ''
        };
    },
    created() {
        this.fetchUserInfo();
        this.fetchCustomOrderHistory();
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
                const response = await fetch('http://localhost:8080/customerData/CustomOrders', {
                    method: 'GET',
                    credentials: 'include', // Use 'include' to send cookies with the request
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access-token')}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    this.customOrderHistory = data.Customer_Orders;
                    console.log('Received Custom Order History:', data);
                } else {
                    console.error('Failed to fetch custom order history');
                }
            } catch (error) {
                console.error('Error fetching custom order history:', error);
            }
        },
        formatDate(date) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(date).toLocaleDateString(undefined, options);
        },
        getStatusClass(statusID) {
            return statusID === 1 ? 'Unapproved' : 'Approved';
        },
        navigateToOrderDetails(customOrderID) {
            // Navigate to the order details page with the CustomOrderID as a route parameter
            this.$router.push({ name: 'OrderDetails', params: { id: customOrderID } });
        },
        goToCatalog() {
            this.$router.push('/catalog');
        }
    }
};
</script>
  
<style scoped>
/* Add some padding to the cells and center the text */
.custom-table-container table td,
.custom-table-container table th {
  padding: 10px;
  text-align: center;
}

/* Add a background color to alternating rows for better readability */
.custom-table-container table tbody tr:nth-child(even) {
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
.custom-table-container table tbody tr:hover {
  background-color: #ddd;
}

.custom-table-container {
  background-color: #ffffff; /* White background color */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1); /* Subtle box shadow for embossed effect */
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