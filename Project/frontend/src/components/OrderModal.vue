<template>
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="bg-white p-5 rounded-lg shadow-lg">
        <h2 class="text-xl font-bold mb-4">Order Details</h2>
        <p><strong>Order ID:</strong> {{ order.OrderID }}</p>
        <p><strong>Customer Name:</strong> {{ order.CustomerFirstName }} {{ order.CustomerLastName }}</p>
        <!-- ... Add other fields similarly ... -->
        <button @click="closeModal" class="mt-4 bg-red-500 text-white px-4 py-2 rounded">Close</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isOpen: Boolean,
      order: Object,
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
    },
  };
  </script>
  
  <style>
  /* You can add any additional styles or use Tailwind classes */
  </style>
  