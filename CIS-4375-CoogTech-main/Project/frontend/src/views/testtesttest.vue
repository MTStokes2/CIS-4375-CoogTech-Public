<template>
  <div class="container">
      <div class="dashboard">
      </div>

      <div class="content">
              <div class="calendar">
                  <div v-for="day in 30" :key="day" class="day">
                      Day {{ day }}
                      <div v-for="order in orders[day]" :key="order.id" class="order">
                          Order ID: {{ order.id }}
                      </div>
                  </div>
              </div>
          </div>
      </div>
</template>


<script>
import Sidebar from '@/components/Sidebar.vue';

export default {
  data() {
      return {
          activeTab: 'mainDashboard',
          orders: {
              '1': [{ id: '001' }, { id: '002' }],
              '2': [],
              '3': [{ id: '003' }],
              // ... Continue for each day ...
          }
      };
  },
  components: {
      Sidebar
  }
}
</script>

<style scoped>
.container {
    display: flex; 
}

.dashboard {
    width: 20%;  /* Adjust the width as required */
    border-right: 1px solid #eee;  /* Optional divider */
}

.content {
    width: 80%;  /* Adjust the width as required */
    padding-left: 20px;  /* Optional spacing */
}
</style>
