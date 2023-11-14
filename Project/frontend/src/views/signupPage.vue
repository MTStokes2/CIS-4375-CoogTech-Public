<template>
    <div class="min-h-screen flex justify-center items-center">
        <form class="p-20 rounded shadow-md" @submit.prevent="signup">
            <h2 class="text-3xl text-green-700 font-bold mb-6">Sign Up</h2>

            <!-- First Name -->
            <div class="mb-4">
                <label class="block text-green-700 text-sm font-bold mb-2" for="firstName">First Name</label>
                <input v-model="userData.CustomerFirstName"
                    class="w-full py-2 px-3 border border-green-300 rounded focus:outline-none focus:border-green-500"
                    type="text" id="firstName" placeholder="First Name" required />
            </div>

            <!-- Last Name -->
            <div class="mb-4">
                <label class="block text-green-700 text-sm font-bold mb-2" for="lastName">Last Name</label>
                <input v-model="userData.CustomerLastName"
                    class="w-full py-2 px-3 border border-green-300 rounded focus:outline-none focus:border-green-500"
                    type="text" id="lastName" placeholder="Last Name" required />
            </div>

            <!-- Email -->
            <div class="mb-4">
                <label class="block text-green-700 text-sm font-bold mb-2" for="email">Email Address</label>
                <input v-model="userData.CustomerEmail"
                    class="w-full py-2 px-3 border border-green-300 rounded focus:outline-none focus:border-green-500"
                    type="email" id="email" placeholder="Email Address" required />
            </div>

            <!-- Phone Number -->
            <div class="mb-4">
                <label class="block text-green-700 text-sm font-bold mb-2" for="phoneNumber">Phone Number</label>
                <input v-model="userData.CustomerPhone"
                    class="w-full py-2 px-3 border border-green-300 rounded focus:outline-none focus:border-green-500"
                    type="tel" id="phoneNumber" placeholder="Phone Number" required />
            </div>

            <!-- Address -->
            <div class="mb-4">
                <label class="block text-green-700 text-sm font-bold mb-2" for="address">Address</label>
                <input v-model="userData.CustomerAddress"
                    class="w-full py-2 px-3 border border-green-300 rounded focus:outline-none focus:border-green-500"
                    type="text" id="address" placeholder="Address" required />
            </div>

            <!-- Zipcode -->
            <div class="mb-4">
                <label class="block text-green-700 text-sm font-bold mb-2" for="zipcode">Zipcode</label>
                <input v-model="userData.ZipCode"
                    class="w-full py-2 px-3 border border-green-300 rounded focus:outline-none focus:border-green-500"
                    type="text" id="zipcode" placeholder="Zipcode" required />
            </div>

            <!-- City -->
            <div class="mb-4">
                <label class="block text-green-700 text-sm font-bold mb-2" for="city">City</label>
                <input v-model="userData.City"
                    class="w-full py-2 px-3 border border-green-300 rounded focus:outline-none focus:border-green-500"
                    type="text" id="city" placeholder="City" required />
            </div>

            <!-- State -->
            <div class="mb-4">
                <label class="block text-green-700 text-sm font-bold mb-2" for="state">State</label>
                <input v-model="userData.State"
                    class="w-full py-2 px-3 border border-green-300 rounded focus:outline-none focus:border-green-500"
                    type="text" id="state" placeholder="State" required />
            </div>
            <!-- Password -->
            <div class="mb-6">
                <label class="block text-green-700 text-sm font-bold mb-2" for="username">Username</label>
                <input v-model="userData.Username"
                    class="w-full py-2 px-3 border border-green-300 rounded focus:outline-none focus:border-green-500"
                    type="text" id="Username" placeholder="Enter your Username" required />
            </div>

            <!-- Password -->
            <div class="mb-6">
                <label class="block text-green-700 text-sm font-bold mb-2" for="password">Password</label>
                <input v-model="userData.Password"
                    class="w-full py-2 px-3 border border-green-300 rounded focus:outline-none focus:border-green-500"
                    type="password" id="Password" placeholder="Enter your password" required />
            </div>

            <!-- Display error message -->
            <div v-if="error" class="text-red-600 font-bold mb-4">
                {{ error }}
            </div>

            <div class="flex items-center justify-between">
                <button
                    class="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit">
                    Sign Up
                </button>
            </div>
        </form>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            userData: {
                CustomerFirstName: '',
                CustomerLastName: '',
                CustomerEmail: '',
                CustomerPhone: '',
                CustomerAddress: '',
                ZipCode: '',
                City: '',
                State: '',
                Password: '',
                Username: '',
            },
            error: '',
        };
    },
    methods: {
        signup() {
            // Make a POST request to the backend /SignUp endpoint
            axios.post('http://localhost:8080/SignUp', this.userData)
                .then(response => {
                    // Handle a successful response, e.g., show a success message or redirect
                    console.log('Signup successful', response.data);
                    // Redirect to a success page or perform other actions as needed.
                    this.$router.push('/Login');
                })
                .catch(error => {
                    // Handle errors, show error messages, or redirect to an error page
                    console.error('Signup failed', error);

                    if (error.response && error.response.data.message) {
                        this.error = error.response.data.message;
                    } else {
                        this.error = 'Error occurred during signup';
                    }
                });
        },
    },
};
</script>
  
<style>
/* Add any additional CSS styling for your signup page components here */
</style>