<template>
  <div class="sidebar">
    <div class="tab" @click="selectTab('mainDashboard')">
      <i class="icon">🏠</i> Main
    </div>
    <div class="tab" @click="selectTab('products')">
      <i class="icon">📦</i> Products
    </div>
    <div class="tab" @click="selectTab('chats')">
      <i class="icon">💬</i> Chats
    </div>
    <div class="tab" @click="selectTab('customers')">
      <i class="icon">👥</i> Customers
    </div>
    <div class="tab" @click="selectTab('orderManagement')">
      <i class="icon">🛒</i> Order Management
    </div>
    <div class="tab" @click="selectTab('inventory')">
      <i class="icon">📦</i> Inventory
    </div>
    <div class="tab" @click="selectTab('reports')">
      <i class="icon">📊</i> Reports
    </div>
  </div>
</template>

  
  <script>
  import { useTabStore } from '@/stores/tabStore';
  
  export default {
    methods: {
      selectTab(tabName) {
        console.log('Emitting change-tab with:', tabName); // Add this line for debugging
        const tabStore = useTabStore();
        tabStore.setActiveTab(tabName);
        this.$emit('change-tab', tabName);
      }
    }
  }
  </script>

<style scoped>
.sidebar {
  width: 200px;
  background-color: rgba(255, 255, 255, 0.75); /* Semi-transparent white background */
  backdrop-filter: blur(10px); /* Blur effect for glassmorphism */
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  border-right: 1px solid rgba(255, 255, 255, 0.2); /* Light border for depth */
  height: 60vh; /* Fixed */
  position: fixed; /* Fixed position */
  overflow-y: auto; /* Scroll for overflow */
}

.tab {
  display: flex;
  align-items: center;
  padding: 15px;
  margin-bottom: 5px; /* Reduce space between tabs */
  cursor: pointer;
  border-radius: 8px; /* Rounded corners */
  transition: background-color 0.2s, transform 0.2s; /* Smooth background and transform transitions */
  color: #333; /* Darker text for better contrast */
}

.tab:hover {
  background-color: rgba(255, 255, 255, 0.9); /* Slightly less transparent on hover */
  transform: translateX(10px); /* Move to the right on hover */
}

.icon {
  font-size: 20px; /* Larger icons */
  margin-right: 12px; /* More space between icon and text */
}

.tab-text {
  font-weight: 500; /* Medium font weight for tab text */
  font-size: 16px; /* Slightly larger text */
}

/* Optional: Highlight the active tab */
.tab.active {
  background-color: rgba(0, 123, 255, 0.75); /* Bootstrap primary color with transparency */
  color: white;
}

/* Scrollbar styles for the sidebar */
.sidebar::-webkit-scrollbar {
  width: 5px;
}

.sidebar::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}

.sidebar::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}
</style>