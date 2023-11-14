<template>
  <div class="custom-product-add-form">
    <h2>Create New Product</h2>
    <form @submit.prevent="submitCustomProductForm">
      <div class="form-group">
        <label for="customChatID">Order ID:</label>
        <input type="text" id="customChatID" v-model="customProduct.ChatID" required :readonly="!!customProduct.ChatID">
      </div>
      <div class="form-group">
        <label for="customProductName">Product Name:</label>
        <input type="text" id="customProductName" v-model="customProduct.CustomProductName" required>
      </div>
      <div class="form-group">
        <label for="customProductType">Product Type:</label>
        <input type="text" id="customProductType" v-model="customProduct.CustomProductType" required>
      </div>
      <div class="form-group">
        <label for="customProductColor">Product Color:</label>
        <input type="text" id="customProductColor" v-model="customProduct.CustomProductColor" required>
      </div>
      <div class="form-group">
        <label for="customProductSize">Product Size:</label>
        <input type="text" id="customProductSize" v-model="customProduct.CustomProductSize" required>
      </div>
      <div class="form-group">
        <label for="customProductPrice">Product Price:</label>
        <input type="number" id="customProductPrice" v-model.number="customProduct.CustomProductPrice" required>
      </div>
      <div class="form-group">
        <label for="customProductQuantity">Quantity:</label>
        <input type="number" id="customProductQuantity" v-model.number="customProduct.Quantity" required>
      </div>
      <div class="form-group">
        <label for="customProductDesignImage">Custom Design:</label>
        <input type="file" id="customProductDesignImage" @change="handleCustomImageUpload" accept="image/*">
      </div>
      <button class="submit-button" type="submit">Add to Order</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  props: {
    customOrderID: String,
  },
  setup(props) {
    const customProduct = ref({
      ChatID: props.customOrderID || '', // Set ChatID to customOrderID prop if provided
      CustomProductName: '',
      CustomProductType: '',
      CustomProductColor: '',
      CustomProductSize: '',
      CustomProductPrice: 0,
      CustomProductStock: 0,
      Quantity: 0,
      DesignImage: null,
    });

    const submitCustomProductForm = async () => {
      try {
        // Update CustomProductStock based on Quantity
        customProduct.value.CustomProductStock = customProduct.value.Quantity;

        let formData = new FormData();
        formData.append('ChatID', customProduct.value.ChatID);
        formData.append('CustomProductName', customProduct.value.CustomProductName);
        formData.append('CustomProductType', customProduct.value.CustomProductType);
        formData.append('CustomProductColor', customProduct.value.CustomProductColor);
        formData.append('CustomProductSize', customProduct.value.CustomProductSize);
        formData.append('CustomProductPrice', customProduct.value.CustomProductPrice);
        formData.append('CustomProductStock', customProduct.value.CustomProductStock);
        formData.append('Quantity', customProduct.value.Quantity);
        formData.append('DesignImage', customProduct.value.DesignImage);

        const response = await axios.post('http://localhost:8080/adminData/CustomProducts', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const CustomProductID = response.data.customProduct.CustomProductID;
        console.log(CustomProductID)
        console.log(props.customOrderID)

        await axios.post(`http://localhost:8080/adminData/CustomOrders/${props.customOrderID}/products`, {
          CustomProductID: CustomProductID,
          Quantity: customProduct.value.Quantity,

        });


          console.log('Custom product added to order');
        } catch (error) {
          console.error('Error adding custom product to order', error);
        }

        // Reset form after submission
        Object.keys(customProduct.value).forEach((key) => {
          customProduct.value[key] = key === 'CustomProductPrice' || key === 'Quantity' ? 0 : '';
        });
        alert('Custom Product added successfully');
    };

    const handleCustomImageUpload = (event) => {
      const file = event.target.files[0];
      customProduct.value.DesignImage = file;
    };

    return {
      customProduct,
      submitCustomProductForm,
      handleCustomImageUpload,
    };
  },
};
</script>


<style scoped>
.custom-product-add-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 1rem;
  background-color: #ffffff; /* White background */
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem; /* Increased spacing between form groups */
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input[type="text"],
input[type="number"],
input[type="file"] {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.submit-button {
  padding: 0.5rem 1rem;
  background-color: #007bff; /* Professional blue color */
  color: #fff; /* White text */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
}

.submit-button:hover {
  background-color: #0056b3; /* Slightly darker blue on hover */
}
</style>


<style scoped>
.custom-product-add-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 1rem;
  background-color: #f6dddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input[type="text"],
input[type="number"],
input[type="file"] {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.submit-button {
  padding: 0.5rem 1rem;
  background-color: #ff6b81; /* Lively background color */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
}

.submit-button:hover {
  background-color: #e74c3c; /* Darker color on hover */
}
</style>
