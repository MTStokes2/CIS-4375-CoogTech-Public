<template>
    <h1 class=" center text-3xl text-green-900 font-bold mb-6">Custom Order</h1>
    <form @submit="submitOrder">
        <div class="form-row mb-4">
            <label for="quantity">Quantity </label>
            <input type="number" id="quantity" v-model="order.quantity" required class="rounded-input">
        </div>

        <div class="form-row">
            <label for="groupOrder">Group Order? </label>
            <select id="groupOrder" v-model="order.groupOrder" class="rounded-input">
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>
        </div>

        <div class="form-row">
            <label for="eventType">Event Type </label>
            <input type="text" id="eventType" v-model="order.eventType" required class="rounded-input">
        </div>

        <div class="form-row">
            <label for="size">Size</label>
            <select id="size" v-model="order.size" class="rounded-input">
                <optgroup label="Toddler">
                    <option value="6-12 months">6-12 months</option>
                    <option value="12-18 months">12-18 months</option>
                    <!-- Add more toddler sizes -->
                    <option value="larger size">Larger size: specify</option>
                </optgroup>
                <!-- Add other size groups similarly -->
            </select>
        </div>

        <div class="form-row">
            <label for="color">Color</label>
            <select id="color" v-model="order.color" class="rounded-input">
                <option value="black">Black</option>
                <option value="white">White</option>
                <option value="green">Green</option>
                <option value="white">Health grey</option>
                <option value="grey">Grey</option>
                <option value="blue">Blue</option>
                <option value="red">Red</option>
                <option value="pink">Pink</option>
                <option value="orange">Orange</option>
                <option value="yellow">yellow</option>
                <!-- Add more colors -->
                <option value="other">Other color: specify</option>
            </select>
        </div>

        <div class="form-row">
            <label for="tieDye">Tie Dye (extra cost)</label>
            <input type="checkbox" id="tieDye" v-model="order.tieDye">
        </div>

        <div class="form-row">
            <label for="designImages">Design Information/ Images</label>
            <input type="file" id="designImages" @change="uploadImages" class="rounded-input">
        </div>



        <div class="form-row">
            <label for="dateNeeded">Date Needed </label>
            <input type="date" id="dateNeeded" v-model="order.dateNeeded" required class="rounded-input">
        </div>

        <div class="form-row">
            <label for="deliveryMethod">Pick Up/ Delivery</label>
            <select id="deliveryMethod" v-model="order.deliveryMethod" class="rounded-input">
                <option value="pickup">Picking up</option>
                <option value="delivery">Delivery</option>
            </select>
        </div>

        <div class="form-row">
            <label for="paymentMethod">Payment Method</label>
            <div>
                <input type="radio" id="paypal" value="PayPal" v-model="order.paymentMethod">
                <label for="paypal">PayPal</label>
            </div>
            <div>
                <input type="radio" id="venmo" value="Venmo" v-model="order.paymentMethod">
                <label for="venmo">Venmo</label>
            </div>
            <div>
                <input type="radio" id="cash" value="Cash (only pick up)" v-model="order.paymentMethod">
                <label for="cash">Cash (only pick up)</label>
            </div>
            <div>
                <input type="radio" id="zelle" value="Zelle" v-model="order.paymentMethod">
                <label for="zelle">Zelle</label>
            </div>
            <div>
                <input type="radio" id="cashapp" value="CashApp" v-model="order.paymentMethod">
                <label for="cashapp">CashApp</label>
            </div>
        </div>

        <div class="form-row">
            <button type="submit" class="rounded-button">Submit Order</button>
        </div>
    </form>
</template>
  
<script>
export default {
    data() {
        return {
            order: {
                quantity: 0,
                groupOrder: 'no',
                eventType: '',
                size: '',
                color: 'black',
                tieDye: false,
                designImages: [], // Store uploaded images here
                contactName: '',
                contactEmail: '',
                contactPhone: '',
                contactAddress: '',
                dateNeeded: '',
                deliveryMethod: 'pickup',
                paymentMethod: '',
            },
        };
    },
    methods: {
        submitOrder() {
            // Handle form submission, e.g., send data to a server
            console.log(this.order);
        },
        uploadImages(event) {
            // Handle file uploads and store them in this.order.designImages
            this.order.designImages = event.target.files;
        },
    },
};
</script>
  
<style scoped>
.form-row {
    margin-bottom: 20px;
}

label {
    width: 180px;
    clear: left;
    text-align: right;
    padding-right: 10px;
}


.rounded-input {
    border-radius: 10px;
    padding: 10px;
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
}

.rounded-button:hover {
    background-color: #F5F5DC;
}

.center-radio-group {
    display: flex;
    justify-content: center;
    align-items: center;
}

.center-radio-group div {
    margin: 0 10px;
    /* Adjust the margin as needed */
}
</style>
  