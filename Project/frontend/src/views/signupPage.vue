<template>
  <div class="signup-form ma-3 pa-4">
    <form class="signup-form-container shadow-md bg-white" @submit.prevent="signup">
      <h2 class="text-3xl text-green-900 font-bold mb-6 text-center">Sign Up</h2>

            <!-- First Name -->
            <div class="mb-4">
                <label class="block text-green-900 text-sm font-bold mb-2" for="firstName">First Name</label>
                <input v-model="userData.CustomerFirstName"
                    class="w-full py-2 px-3 border border-green-300 rounded focus:outline-none focus:border-green-500"
                    type="text" id="firstName" placeholder="First Name" required />
            </div>

            <!-- Last Name -->
            <div class="mb-4">
                <label class="block text-green-900 text-sm font-bold mb-2" for="lastName">Last Name</label>
                <input v-model="userData.CustomerLastName"
                    class="w-full py-2 px-3 border border-green-300 rounded focus:outline-none focus:border-green-500"
                    type="text" id="lastName" placeholder="Last Name" required />
            </div>

            <!-- Email -->
            <div class="mb-4">
                <label class="block text-green-900 text-sm font-bold mb-2" for="email">Email Address</label>
                <input v-model="userData.CustomerEmail"
                    class="w-full py-2 px-3 border border-green-300 rounded focus:outline-none focus:border-green-500"
                    type="email" id="email" placeholder="Email Address" required />
            </div>

            <!-- Phone Number -->
            <div class="mb-4">
                <label class="block text-green-900 text-sm font-bold mb-2" for="phoneNumber">Phone Number</label>
                <input v-model="userData.CustomerPhone"
                    class="w-full py-2 px-3 border border-green-300 rounded focus:outline-none focus:border-green-500"
                    type="tel" id="phoneNumber" placeholder="Phone Number" required />
            </div>

            <!-- City -->
            <div class="mb-4">
                <label class="block text-green-900 text-sm font-bold mb-2" for="city">City</label>
                <input v-model="userData.City"
                    class="w-full py-2 px-3 border border-green-300 rounded focus:outline-none focus:border-green-500"
                    type="text" id="city" placeholder="City" required />
            </div>

            <!-- State -->
            <div class="mb-4">
                <label class="block text-green-900 text-sm font-bold mb-2" for="state">State</label>
                <input v-model="userData.State"
                    class="w-full py-2 px-3 border border-green-300 rounded focus:outline-none focus:border-green-500"
                    type="text" id="state" placeholder="State" required />
            </div>

            <!-- Address -->
            <div class="mb-4">
            <label class="block text-green-900 text-sm font-bold mb-2" for="address">Street Address</label>
            <input v-model="userData.CustomerAddress"
                class="w-full py-2 px-3 border border-green-300 rounded focus:outline-none focus:border-green-500"
                type="text" id="address" placeholder="Address" required />
            </div>

            <!-- Zipcode -->
            <div class="mb-4">
                <label class="block text-green-900 text-sm font-bold mb-2" for="zipcode">Zipcode</label>
                <input v-model="userData.ZipCode"
                    class="w-full py-2 px-3 border border-green-300 rounded focus:outline-none focus:border-green-500"
                    type="text" id="zipcode" placeholder="Zipcode" required />
            </div>

            <div class="border">
            <!-- Username -->
            <div class="mb-6">
                <label class="block text-green-900 text-sm font-bold mb-2" for="username">Username</label>
                <input v-model="userData.Username"
                    class="w-full py-2 px-3 border border-green-300 rounded focus:outline-none focus:border-green-500"
                    type="text" id="Username" placeholder="Enter your Username" required />
            </div>

            <!-- Password -->
            <div class="mb-6">
                <label class="block text-green-900 text-sm font-bold mb-2" for="password">Password</label>
                <input v-model="userData.Password"
                    class="w-full py-2 px-3 border border-green-300 rounded focus:outline-none focus:border-green-500"
                    type="password" id="Password" placeholder="Enter your password" required />
            </div>
            <button class="suggest-button text-sm " @click.prevent="suggestUsername">Suggest Username</button>
            </div>

            <!-- Display error message -->
            <div v-if="error" class="text-red-600 font-bold mb-4">
                {{ error }}
            </div>

            <div class="flex items-center justify-between">
                <button
                    class="button"
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
        suggestUsername() {
            const { CustomerFirstName, CustomerLastName, ZipCode } = this.userData;
            const firstNameInitial = CustomerFirstName.charAt(0).toUpperCase();
            const lastNameInitial = CustomerLastName.charAt(0).toUpperCase();
            const suggestedUsername = `${firstNameInitial}${lastNameInitial}${ZipCode}`;

            // Set the suggested username
            this.userData.Username = suggestedUsername;
        },
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
  
<style scoped>


.signup-form {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #f2f2f2;;
}

.border {
    border-radius: 4px;
    padding: 20px;
}

.signup-form-container {
  width: 600px;
  background-color: #fff;
  padding: 20px;
}

.button {
  background-color: #ff6b81;
  width: 200px;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  margin-top: 20px; 
  margin-left: 160px;
}

.button:hover {
  background-color: #e74c3c;
}

.suggest-button {
  background-color: #ff6b81;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.suggest-button:hover {
  background-color: #e74c3c;
}

</style>