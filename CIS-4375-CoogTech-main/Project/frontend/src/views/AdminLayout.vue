<template>
  <div class="admin-layout">
    <aside>
      <ul>
        <li @click="setActiveTab('admin')">Admin</li>
        <li @click="setActiveTab('orders')">Orders Management</li>
        <li @click="setActiveTab('customers')">Customers</li>
      </ul>
    </aside>
    <section>
      <Admin v-if="activeTab === 'admin'" />
      <Orders v-if="activeTab === 'orders'" />
      <CustomerList v-if="activeTab === 'customers'" />
    </section>
  </div>
</template>

<script>
import { ref } from 'vue';
import Admin from '@/components/Admin.vue'; 
import Orders from '@/components/Orders.vue';
import CustomerList from '@/components/CustomerList.vue';

export default {
  components: {
    Admin,
    Orders,
    CustomerList
  },
  setup() {
    const activeTab = ref('admin'); 

    const setActiveTab = (tabName) => {
      activeTab.value = tabName;
    };

    return {
      activeTab,
      setActiveTab
    };
  }
};
</script>

<style scoped>
/* Styling for your admin layout can be added here */
</style>
