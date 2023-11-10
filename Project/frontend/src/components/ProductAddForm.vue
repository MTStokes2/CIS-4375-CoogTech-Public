<template>
    <div class="product-add-form">
      <h2>Add New Product</h2>
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
      ProductImage: ''
    });
    const imageUrl = ref('');

    const submitForm = async () => {
      try {
        let formData = new FormData();
        formData.append('ProductName', product.value.ProductName);
        formData.append('ProductType', product.value.ProductType);
        formData.append('ProductColor', product.value.ProductColor);
        formData.append('ProductSize', product.value.ProductSize);
        formData.append('ProductPrice', product.value.ProductPrice);
        formData.append('ProductStock', product.value.ProductStock);
        formData.append('ProductImage', product.value.ProductImage);

        await axios.post('http://localhost:8080/adminData/Products', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        // Reset form after submission
        Object.keys(product.value).forEach(key => {
          product.value[key] = key === 'ProductPrice' || key === 'ProductStock' ? 0 : '';
        });
        imageUrl.value = '';
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
.product-add-form {
  max-width: 500px;
  margin: auto;
}
.form-group {
  margin-bottom: 1rem;
}
label {
  display: block;
  margin-bottom: 0.5rem;
}
input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  padding: 0.5rem 1rem;
  background-color: #5cb85c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #4cae4c;
}
</style>