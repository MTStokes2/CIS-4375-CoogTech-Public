<template>
    <div class="reset-form">
        <form @submit.prevent="resetUsername" class="p-5 rounded shadow-md center">
            <h2 class="text-3xl text-green-900 font-bold mb-6">Reset Username</h2>
            <div class="mb-4">
                <label class="block text-green-900 text-sm font-bold mb-2" for="newUsername">New Username</label>
                <input class="py-2 px-3 border border-green-300 rounded focus:outline-none focus:border-green-500"
                    type="text" id="newUsername" v-model="newUsername" required placeholder="Enter your new username" />
                <label class="block text-green-900 text-sm font-bold mb-2" for="newUsername">Confirm Username</label>
                <input class="py-2 px-3 border border-green-300 rounded focus:outline-none focus:border-green-500"
                    type="text" id="newUsername" v-model="newUsername" required placeholder="Enter your new username" />
            </div>

            <div v-if="error" class="text-red-600 font-bold mb-4">
                {{ error }}
            </div>

            <div class="flex items-center justify-between">
                <button type="submit" class="custom-button">Reset Username</button>
            </div>
        </form>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            newUsername: '',
            error: ''
        };
    },
    methods: {
        resetUsername() {
            // Ensure that the new username is not blank
            if (!this.newUsername) {
                this.error = 'New username is required';
                return;
            }

            // Make a PUT request to the /ChangeUsername endpoint on the backend server
            axios.put('http://localhost:8080/ChangeUsername', {
                CustomerID: 1,
                Username: this.newUsername
            })
                .then(response => {
                    console.log('Username changed successfully');
                    // You can redirect the user to another page or display a success message
                })
                .catch(error => {
                    console.error('Username change failed:', error);
                    // Handle errors here, display an error message, or redirect as needed
                });
        }
    }
};
</script>
<style></style>