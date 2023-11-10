<template>
  <div class="admin-layout">
    <aside>
      <Sidebar @change-tab="setActiveTab" />
    </aside>
    <section>
      <div v-if="activeTab === 'mainDashboard'">
        <NewOrdersList />
        <CalendarView />
      </div>
      <ProductsEdit v-if="activeTab === 'products'" />
      <CustomerList v-if="activeTab === 'customers'" />
      <Orders v-if="activeTab === 'orderManagement'" />

      <!-- ... other components for the remaining tabs ... -->
    </section>

  </div>
</template>

<script>
import { computed, ref } from 'vue';  // Import `ref` as well.
import { useTabStore } from '@/stores/tabStore.js';
import Orders from '@/components/Orders.vue';
import CustomerList from '@/components/CustomerList.vue';
import Sidebar from '@/components/Sidebar.vue';
import ChatList from '@/components/ChatList.vue';
import ChatWindow from '@/components/ChatWindow.vue';
import NewOrdersList from '@/components/NewOrdersList.vue';
import CalendarView from '@/components/CalendarView.vue';
import ProductsEdit from '@/components/ProductsEdit.vue';


export default {
  components: {
    Orders,
    CustomerList,
    Sidebar,
    ChatList,
    ChatWindow,
    NewOrdersList,
    CalendarView,
    ProductsEdit
  },
  setup() {
    const tabStore = useTabStore();
    const activeTab = computed(() => tabStore.activeTab);
    const selectedChat = ref(null);  // Initialize the selectedChat reference.
    
    const setActiveTab = (tabName) => {
      console.log('Changing active tab to:', tabName); // This should log the tab name whenever a tab is clicked
      tabStore.setActiveTab(tabName);
    };  // This closing brace was missing.

    const chatSelected = (chat) => {
      selectedChat.value = chat; // Update the selected chat when a chat is selected.
    };

    return {
      activeTab,
      setActiveTab,
      selectedChat,
      chatSelected
    };
  }
};
</script>



<style scoped>
.admin-layout {
  display: flex;
  height: 100vh; /* Full height of the viewport */
}

aside {
  width: 250px; /* Fixed width for the sidebar */
  flex-shrink: 0; /* Prevents the sidebar from shrinking */
  /* Add other styles for your sidebar if necessary */
}

section {
  flex-grow: 1; /* Allows section to take up the remaining width */
  overflow-x: hidden; /* Prevents horizontal scrolling */
  /* Add other styles for your section if necessary */
}
</style>

