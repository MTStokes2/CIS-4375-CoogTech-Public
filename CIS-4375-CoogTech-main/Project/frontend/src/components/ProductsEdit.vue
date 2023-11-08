<template>
    <div class="products-edit">
      <button class="add-product-btn" @click="showAddForm">Add Product</button>
      
      <table class="product-table">
        <thead>
          <tr>
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
        <tbody>
          <tr v-for="product in products" :key="product.ProductID">
            <td>
              <img :src="product.ProductImage" class="product-thumbnail" alt="Product Image" />
            </td>
            <td>{{ product.ProductName }}</td>
            <td>{{ product.ProductType }}</td>
            <td>{{ product.ProductColor }}</td>
            <td>{{ product.ProductSize }}</td>
            <td>{{ product.ProductPrice }}</td>
            <td>{{ product.ProductStock }}</td>
            <td>
              <button class="edit-btn" @click="showEditForm(product)">Edit</button>
              <button class="delete-btn" @click="deleteProduct(product.ProductID)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      
      <!-- Add Form Component -->
      <product-add-form v-if="currentForm === 'add'" @formClosed="currentForm = null" />
      
      <!-- Edit Form Component -->
      <product-update-form v-if="currentForm === 'edit'" :product="selectedProduct" @formClosed="currentForm = null" />
    </div>
</template>
  
  <script>
  import axios from 'axios';
  import ProductAddForm from './ProductAddForm.vue';
  import ProductUpdateForm from './ProductUpdateForm.vue';
  
  export default {
    components: {
      ProductAddForm,
      ProductUpdateForm
    },
    data() {
      return {
        products: [], // This will be filled with product data
        currentForm: null,
        selectedProduct: null,
      };
    },
    mounted() {
      this.fetchProducts();
    },
    methods: {
      fetchProducts() {
        // Replace with your actual API endpoint
        axios.get('http://localhost:8080/adminData/Products')
          .then(response => {
            this.products = response.data;
            console.log(response.data)
          })
          .catch(error => {
            // Handle error
            console.error("There was an error fetching the products:", error);
          });
      },
      showAddForm() {
        this.currentForm = 'add';
      },
      showEditForm(product) {
        this.selectedProduct = product;
        this.currentForm = 'edit';
      },
      deleteProduct(productId) {
        // Replace with your actual API endpoint
        axios.delete(`http://localhost:8080/adminData/Products/${productId}`)
          .then(() => {
            // Refresh the list of products
            this.fetchProducts();
          })
          .catch(error => {
            // Handle error
            console.error("There was an error deleting the product:", error);
          });
      }
    },
  };
  </script>

<style scoped>
.products-edit {
  padding: 1rem;
}

.add-product-btn {
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

.product-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}

.product-table th,
.product-table td {
  border: 1px solid #ccc;
  padding: 0.5rem;
  text-align: left;
}

.product-table th {
  background-color: #f0f0f0;
}

.edit-btn, .delete-btn {
  padding: 0.25rem 0.5rem;
  border: none;
  cursor: pointer;
}

.edit-btn {
  background-color: #FFC107;
  color: white;
}

.delete-btn {
  background-color: #F44336;
  color: white;
}

.product-thumbnail {
  width: 50px; /* or any size you prefer */
  height: auto;
}
</style>