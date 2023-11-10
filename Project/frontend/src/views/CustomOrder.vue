
<template>
    <div>
        <h1 class="center text-3xl text-green-900 font-bold mb-6">Custom Order</h1>
        <form @submit.prevent="submitOrder">
            <div class="form-row mb-4">
                <label for="address">Address</label>
                <input type="text" id="address" v-model="order.address" required class="rounded-input">
            </div>

            <div class="form-row mb-4">
                <label for="city">City</label>
                <input type="text" id="city" v-model="order.city" required class="rounded-input">
            </div>

            <div class="form-row mb-4">
                <label for="state">State</label>
                <input type="text" id="state" v-model="order.state" required class="rounded-input">
            </div>

            <div class="form-row mb-4">
                <label for="zipcode">Zip Code</label>
                <input type="text" id="zipcode" v-model="order.zipcode" required class="rounded-input">
            </div>

            <div class="form-row mb-4">
                <label for="deliveryDay">Delivery Day</label>
                <input type="date" id="deliveryDay" v-model="order.deliveryDay" required class="rounded-input">
            </div>

            <div class="form-row">
                <!-- Use a router-link to navigate to the order history page -->
                <router-link to="/orderhistory" tag="button" type="submit" class="rounded-button">
                    Submit Order
                </router-link>
            </div>
        </form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            order: {
                address: '',
                city: '',
                state: '',
                zipcode: '',
                deliveryDay: '',
            },
        };
    },
};
</script>
  
<style scoped>
.form-row {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
}

label {
    width: 180px;
    text-align: right;
    padding-right: 10px;
}

input {
    margin-left: 10px;
    /* Adjust the margin as needed to add space between text and input */
    padding: 10px;
    border-radius: 10px;
}

.rounded-button {
    background-color: #F5F5DC;
    color: rgb(16, 82, 25);
    padding: 10px 20px;
    text-decoration: none;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
    margin-left: 190px;
    /* Adjust the margin to align the button with the input fields */
}

.rounded-button:hover {
    background-color: #F5F5DC;
}
</style>
  