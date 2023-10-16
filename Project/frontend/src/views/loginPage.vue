<template>
    <div id="login-page" style="background-color: rgb(245, 245, 220);"></div>
    <div class="bg-pink-200 min-h-screen flex flex-col items-center">
        <form class="bg-pink-200 p-20 rounded shadow-md">
            <h2 class="text-3xl text-green-700 font-bold mb-6">Login</h2>

            <div class="mb-4">
                <label class="block text-green-700 text-sm font-bold mb-2" for="username">Username</label>
                <input class="w-full py-2 px-3 border border-green-300 rounded focus:outline-none focus:border-green-500"
                    type="text" id="username" placeholder="Enter your username" />
            </div>

            <div class="mb-6">
                <label class="block text-green-700 text-sm font-bold mb-2" for="password">Password</label>
                <input class="w-full py-2 px-3 border border-green-300 rounded focus:outline-none focus:border-green-500"
                    type="password" id="password" placeholder="Enter your password" />
            </div>

            <div v-if="showError" class="text-red-600 font-bold mb-4">
                Invalid credentials. Please try again.
            </div>

            <div class="flex items-center justify-between">
                <router-link to="/catalog" class="custom-button">Shop Now</router-link>
            </div>
        </form>
        <p class="mt-4 text-green-700 text-sm">
            Don't have an account? <router-link to="/signup" class="text-green-700 font-bold">Sign up</router-link>
        </p>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            showError: false, // Initially, hide the error message
        };
    },
    methods: {
        handleLogin() {
            const usernameInput = document.getElementById('username').value;
            const passwordInput = document.getElementById('password').value;

            // Check if the entered credentials match the hardcoded ones
            if (usernameInput === 'e' && passwordInput === 'e') {
                // Redirect to the shop page
                this.$router.push('/shop'); // Assuming you're using Vue Router
            } else {
                // Show the error message
                this.showError = true;
            }
        },
    },
};
</script>
  
<style>
.custom-button {
    background-color: #F5F5DC;
    color: rgb(189, 12, 12);
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