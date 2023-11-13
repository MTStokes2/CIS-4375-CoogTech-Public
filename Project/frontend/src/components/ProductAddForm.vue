<template>
    <div class="product-add-form">
      <h2 class="center text-3xl text-green-900 font-bold mb-6">Add a Product</h2>
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
          <input type="file" id="productImage" @change="handleImageUpload" required>
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const product = ref({
      ProductName: '',
      ProductType: '',
      ProductColor: '',
      ProductSize: '',
      ProductPrice: 0,
      ProductStock: 0,
      ProductImage: null
    });

    const imageUrl = ref('');

    const submitForm = async () => {
      try {
        const formData = new FormData();
        Object.keys(product.value).forEach(key => {
          formData.append(key, product.value[key]);
        });

        console.log(formData)

        const response = await axios.post('http://localhost:8080/adminData/Products', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        // Reset form after submission
        Object.keys(product.value).forEach(key => {
          product.value[key] = key === 'ProductPrice' || key === 'ProductStock' ? 0 : '';
        });
        imageUrl.value = '';
        
        // Provide feedback to the user
        alert('Product added successfully');
      } catch (error) {
        console.error('There was an error submitting the form', error);
      }
    };

    const handleImageUpload = event => {
      const file = event.target.files[0];
      product.value.ProductImage = file;
      imageUrl.value = URL.createObjectURL(file);
    };

    const closeForm = () => {
      // Emit the custom event when the form is closed
      this.$emit('formClosed');
    };

    return {
      product,
      imageUrl,
      submitForm,
      handleImageUpload,
      closeForm
    };
  }
};
</script>

<style scoped>

label {
  font-weight: bold;
  margin-bottom: 8px;
}
.product-add-form {
  width: 500px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #ffffff;
}

input[type="text"],
input[type="number"] {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 1rem;
}
label {
  display: block;
  margin-bottom: 0.5rem;
}

button {
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

button:hover {
  background-color: #e74c3c;
}
</style>