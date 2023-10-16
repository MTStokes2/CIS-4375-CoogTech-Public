<template>
    <div class="bg-pink-200 min-h-screen flex justify-center items-center">
        <form class="bg-pink-200 p-20 rounded shadow-md">
            <h2 class="text-3xl text-green-700 font-bold mb-6">Sign Up</h2>

            <div class="mb-4">
                <label class="block text-green-700 text-sm font-bold mb-2" for="firstName">First Name</label>
                <input class="w-full py-2 px-3 border border-green-300 rounded focus:outline-none focus:border-green-500"
                    type="text" id="firstName" placeholder=" first name" />
            </div>

            <div class="mb-4">
                <label class="block text-green-700 text-sm font-bold mb-2" for="lastName">Last Name</label>
                <input class="w-full py-2 px-3 border border-green-300 rounded focus:outline-none focus:border-green-500"
                    type="text" id="lastName" placeholder="last name" />
            </div>

            <div class="mb-4">
                <label class="block text-green-700 text-sm font-bold mb-2" for="email">Email Address</label>
                <input class="w-full py-2 px-3 border border-green-300 rounded focus:outline-none focus:border-green-500"
                    type="email" id="email" placeholder="email address" />
            </div>

            <div class="mb-4">
                <label class="block text-green-700 text-sm font-bold mb-2" for="phoneNumber">Phone Number</label>
                <input class="w-full py-2 px-3 border border-green-300 rounded focus:outline-none focus:border-green-500"
                    type="tel" id="phoneNumber" placeholder="phone number" />
            </div>
            <div class="mb-6">
                <label class="block text-green-700 text-sm font-bold mb-2" for="password">Password</label>
                <input class="w-full py-2 px-3 border border-green-300 rounded focus:outline-none focus:border-green-500"
                    type="password" id="password" placeholder="Enter your password" />
            </div>



            <div class="flex items-center justify-between">
                <button
                    class="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button">
                    Sign Up
                </button>
            </div>
        </form>
    </div>
</template>
  
<script>
export default {
    // Your script logic can go here
}
</script>
  
<style>
/* Add any additional CSS styling for your signup page components here */
</style>