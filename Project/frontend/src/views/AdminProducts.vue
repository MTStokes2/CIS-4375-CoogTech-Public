<template>
    <div>
      <div class="tables-container">
      <!-- Custom Orders Table -->
      <div v-if="customProducts.length > 0" class="table-section">
        <button @click="goToDashboard" class="back-button">Back to Dashboard</button>
        <h1 class="table-header">Custom Products</h1>
        <div class="table-container">
          <input v-model="searchCustom" @input="performSearchCustomProducts" class="search-input" placeholder="Search products..." />
          <table class="custom-table table">
            <!-- Table headers -->
            <thead>
              <tr class="text-black">
                <th>Image</th>
                <th>Name</th>
                <th>Type</th>
                <th>Color</th>
                <th>Size</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <!-- Table body -->
            <tbody>
              <tr v-for="product in customProducts" :key="product.CustomProductID">
                <td><v-img :src="product.DesignImage" cover /></td>
                <td>{{ product.CustomProductName  }}</td>
                <td>{{ product.CustomProductType }}</td>
                <td>{{ product.CustomProductColor }}</td>
                <td>{{ product.CustomProductSize  }}</td>
                <td>{{ product.CustomProductPrice }}</td>
                <td>{{ product.CustomProductStock }}</td>
                <td>
                <button class="back-button" @click="deleteCustomProduct(product.ProductID)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <!-- Regular Orders Table -->
      <div v-if="Products.length > 0" class="table-section">
        <h1 class="table-header">Regular Products</h1>

        <button class="back-button" @click="showAddForm">Add Product</button>

        <div v-if="currentForm !== null" class="form-overlay">
        <product-add-form v-if="currentForm === 'add'" @formClosed="currentForm = null" />
        <!-- Edit Form Component -->
        <product-update-form v-if="currentForm === 'edit'" :product="selectedProduct" @formClosed="currentForm = null" :productId="this.selectedProduct.ProductID" />
        <button v-if="currentForm != null" class="close-button" @click="cancelForm">Close Form</button>
        </div>

        <div class="table-container">
          <input v-model="search" @input="performSearchProducts" class="search-input" placeholder="Search products..." />
          <table class="custom-table table">
            <!-- Table headers -->
            <thead>
              <tr class="text-black">
                <th>Image</th>
                <th>Name</th>
                <th>Type</th>
                <th>Color</th>
                <th>Size</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <!-- Table body -->
            <tbody>
              <tr v-for="product in Products" :key="product.ProductID">
                <td><v-img :src="product.ProductImage" cover /></td>
                <td>{{ product.ProductName  }}</td>
                <td>{{ product.ProductType }}</td>
                <td>{{ product.ProductColor }}</td>
                <td>{{ product.ProductSize  }}</td>
                <td>${{ product.ProductPrice }}</td>
                <td>{{ product.ProductStock }}</td>
                <td>
                  <button class="back-button" @click="showEditForm(product)">Edit</button>
                  <button class="back-button" @click="deleteProduct(product.ProductID)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>

            </div>
      </div>
  
      <!-- Message for Empty Tables -->
      <div v-if="customProducts.length === 0 && Products.length === 0" class="text-center text-gray-600 text-lg mt-8">
        No Products available.
      </div>
    </div>
    </div>
  </template>

<script>
  import ProductAddForm from '../components/ProductAddForm.vue';
  import ProductUpdateForm from '../components/ProductUpdateForm.vue';
  import axios from 'axios';

export default {
  components: {
      ProductAddForm,
      ProductUpdateForm
    },
    data() {
        return {
          customProducts: [],
          Products: [],
          username: '',
          role: '',
          currentForm: null,
          selectedProduct: null,
          searchCustom: '',
          search: ''
        };
    },
    created() {
        this.fetchCustomProducts();
        this.fetchProductsFromAPI();
    },
    methods: {
        async fetchCustomProducts() {
            try {
                const response = await fetch('http://localhost:8080/adminData/CustomProducts');

                if (response.ok) {
                    const data = await response.json();
                    this.customProducts = data.filter(Product => 
                      Product.CustomProductName.toLowerCase().includes(this.searchCustom.toLowerCase())
                  );
                } else {
                    console.error('Failed to fetch custom products');
                }
            } catch (error) {
                console.error('Error fetching custom product:', error);
            }
        },
        async fetchProductsFromAPI() {
          try {
              const response = await fetch("http://localhost:8080/adminData/Products");
              if (response.ok) {
                  const data = await response.json();
                this.Products = data.filter(product => 
                      product.ProductName.toLowerCase().includes(this.search.toLowerCase())
                  );
              } else {
                  console.error("Failed to fetch products from the API");
              }
          } catch (error) {
              console.error("Error fetching products:", error);
          }
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
        },
        showAddForm() {
        this.currentForm = 'add'
    
      },
      showEditForm(product) {
        this.selectedProduct = product;
        this.currentForm = 'edit';
      },
      cancelForm(){
        this.currentForm = null;
        this.fetchCustomProducts();
        this.fetchProductsFromAPI();
      },
      deleteProduct(productId) {
        // Replace with your actual API endpoint
        axios.delete(`http://localhost:8080/adminData/Products/${productId}`)
          .then(() => {
            // Refresh the list of products
            this.fetchProductsFromAPI();
          })
          .catch(error => {
            // Handle error
            console.error("There was an error deleting the product:", error);
          });
      },
      deleteCustomProduct(productId) {
        // Replace with your actual API endpoint
        axios.delete(`http://localhost:8080/adminData/CustomProducts/${productId}`)
          .then(() => {
            // Refresh the list of products
            this.fetchCustomProducts();
          })
          .catch(error => {
            // Handle error
            console.error("There was an error deleting the product:", error);
          });
      },
      performSearchProducts() {
      this.fetchProductsFromAPI();
    },
      performSearchCustomProducts() {
      this.fetchCustomProducts();
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
  margin-left: 5px;
}

.back-button:hover {
  background-color: #e74c3c;
}

.search-bar {
  margin-bottom: 10px;
}

.search-bar label {
  margin-right: 5px;
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
  right: 0px;
  bottom: 360px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
}

.close-button:hover {
  background-color: #e74c3c;
}

</style>