<template>
    <div class="product-update-form">
      <h2>Update Product</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="productName">Product Name:</label>
          <input type="text" id="productName" v-model="product.ProductName" required>
        </div>
  
        <div class="form-group">
          <label for="productType">Product Type:</label>
          <input type="text" id="productType" v-model="product.ProductType" required>
        </div>
  
        <div class="form-group">
          <label for="productColor">Product Color:</label>
          <input type="text" id="productColor" v-model="product.ProductColor" required>
        </div>
  
        <div class="form-group">
          <label for="productSize">Product Size:</label>
          <input type="text" id="productSize" v-model="product.ProductSize" required>
        </div>
  
        <div class="form-group">
          <label for="productPrice">Product Price:</label>
          <input type="number" id="productPrice" v-model.number="product.ProductPrice" required>
        </div>
  
        <div class="form-group">
          <label for="productStock">Product Stock:</label>
          <input type="number" id="productStock" v-model.number="product.ProductStock" required>
        </div>
  
        <div class="form-group">
          <label for="productImage">Product Image:</label>
          <input type="file" id="productImage" @change="handleImageUpload">
          <img :src="imageUrl" alt="Product Image" v-if="imageUrl">
        </div>
  
        <button type="submit">Update Product</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  export default {
    props: {
      productId: {
        type: String,
        required: true
      }
    },
    setup(props) {
      const product = ref({
        ProductName: '',
        ProductType: '',
        ProductColor: '',
        ProductSize: '',
        ProductPrice: 0,
        ProductStock: 0,
        ProductImage: ''
      });
      const imageUrl = ref('');
  
      onMounted(async () => {
        try {
          const response = await axios.get(`http://localhost:8080/adminData/Products/${props.productId}`);
          product.value = { ...response.data };
          // If the product has an image URL, set it for preview
          if (product.value.ProductImage) {
            imageUrl.value = product.value.ProductImage;
          }
        } catch (error) {
          console.error('There was an error fetching the product details', error);
        }
      });
  
      const submitForm = async () => {
        try {
          let formData = new FormData();
          formData.append('ProductName', product.value.ProductName);
          formData.append('ProductType', product.value.ProductType);
          formData.append('ProductColor', product.value.ProductColor);
          formData.append('ProductSize', product.value.ProductSize);
          formData.append('ProductPrice', product.value.ProductPrice);
          formData.append('ProductStock', product.value.ProductStock);
          if (typeof product.value.ProductImage === 'object') {
            // Only append the image if it's a file, meaning it's been updated
            formData.append('ProductImage', product.value.ProductImage);
          }
  
          await axios.put(`http://localhost:8080/adminData/Products/${props.productId}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
  
          alert('Product updated successfully');
        } catch (error) {
          console.error('There was an error submitting the form', error);
        }
      };
  
      const handleImageUpload = event => {
        const file = event.target.files[0];
        product.value.ProductImage = file;
        imageUrl.value = URL.createObjectURL(file);
      };
  
      return {
        product,
        imageUrl,
        submitForm,
        handleImageUpload
      };
    }
  };
  </script>
  

  <style scoped>
  .product-update-form {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  
  .product-update-form h2 {
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
  }
  
  .form-group input[type="text"],
  .form-group input[type="number"],
  .form-group input[type="file"] {
    width: 100%;
    padding: 0.375rem 0.75rem;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
  }
  
  .form-group img {
    max-width: 100%;
    height: auto;
    margin-top: 1rem;
  }
  
  button {
    width: 100%;
    padding: 0.375rem 0.75rem;
    border: none;
    border-radius: 0.25rem;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    transition: background-color 0.15s ease-in-out;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  