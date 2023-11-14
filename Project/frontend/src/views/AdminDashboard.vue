<template>
  <div class="admin-layout">

        <CalendarView />
  </div>

</template>

<script>
import { computed, ref } from 'vue';  // Import `ref` as well.
import { useTabStore } from '@/stores/tabStore.js';
import Orders from '@/components/Orders.vue';
import CustomerList from '@/components/CustomerList.vue';
import Sidebar from '@/components/Sidebar.vue';
import ChatList from '@/components/ChatList.vue';
import CalendarView from '@/components/CalendarView.vue';
import ProductsEdit from '@/components/ProductsEdit.vue';
import CustomerChat from '@/components/CustomerChat.vue';


export default {
  components: {
    CalendarView,
  },

};
</script>



<style scoped>
.admin-layout {
  display: flex;
  height: auto;
}
</style>

