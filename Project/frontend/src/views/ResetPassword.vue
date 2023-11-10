<template>
    <div class="reset-form">
        <form @submit.prevent="resetPassword" class="p-5 rounded shadow-md center">
            <h2 class="text-3xl text-green-900 font-bold mb-6">Reset Password</h2>
            <div class="mb-4">
                <label class="block text-2xl text-green-900 font-bold mb-2" for="newPassword">New Password</label>
                <div class="relative">
                    <input
                        class="py-2 px-3 text-xl border border-green-300 rounded focus:outline-none focus:border-green-500"
                        type="password" id="newPassword" v-model="newPassword" required>
                    <input type="checkbox" @click="togglePasswordVisibility('newPassword')"
                        class="absolute top-2 right-2 cursor-pointer">
                </div>
            </div>

            <div class="mb-4">
                <label class="block text-2xl text-green-900 font-bold mb-2" for="confirmpassword">Confirm Password</label>
                <div class="relative">
                    <input
                        class="py-2 px-3 text-xl border border-green-300 rounded focus:outline-none focus:border-green-500"
                        type="password" id="confirmpassword" v-model="confirmpassword" required>
                    <input type="checkbox" @click="togglePasswordVisibility('confirmpassword')"
                        class="absolute top-2 right-2 cursor-pointer">
                </div>

            </div>

            <!-- Display error message -->
            <div v-if="error" class="text-red-600 font-bold mb-4 text-2xl">
                {{ error }}
            </div>

            <div class="flex items-center justify-between">
                <button type="submit" class="custom-button text-2xl">Reset Password</button>
            </div>
        </form>
    </div>
</template>
  
<script>
import axios from 'axios';

export default {
    data() {
        return {
            newPassword: '',
            confirmpassword: '',
            error: '',
        };
    },
    methods: {
        resetPassword() {
            // Ensure that the new password is at least 8 characters long
            if (this.newPassword.length < 8) {
                this.error = 'Password must be at least 8 characters long';
                return;
            }

            // Your code for resetting the password
        },
        togglePasswordVisibility(field) {
            // Toggle the visibility of the password for the specified field
            const input = document.getElementById(field);
            input.type = input.type === 'password' ? 'text' : 'password';
        }
    }
};
</script>
<style>
.custom-button {
    background-color: #F5F5DC;
    color: rgb(210, 113, 137);
    padding: 10px 20px;
    text-decoration: none;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
}

.custom-button:hover {
    background-color: #F5F5DC;
}
</style>
