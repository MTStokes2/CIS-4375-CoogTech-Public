<template>
  <div class="admin-reports-page">
    <button @click="goToDashboard" class="back-button">Back to Dashboard</button>
    <div class="tabs">
    <div class="tab-container">
      <button @click="showPastAndFutureReports">Quarterly Reports</button>
      <button @click="showFinancialReports">Financials</button>
      <button @click="showCustomersReports">Customers</button>
      <button @click="showProductsReports">Products</button>
    </div>

    <div class="report-section" v-show="showQuarterlyOrders">
      <QuarterlyReports />
    </div>

    <div class="report-section" v-show="showFinancialOrders">
      <FinancialReports />
    </div>

    <div class="report-section" v-show="showCustomers">
      <CustomersReports />
    </div>

    <div class="report-section" v-show="showProducts">
      <ProductReports />
    </div>
  </div>
</div>
</template>
  
<script>
import QuarterlyReports from '../components/quarterlyreports.vue'

import FinancialReports from '../components/FinancialReports.vue'

import CustomersReports from '../components/CustomersReports.vue'

import ProductReports from '../components/ProductReports.vue'

export default {
  components: {
    QuarterlyReports,
    FinancialReports,
    CustomersReports,
    ProductReports

  },
  data() {
    return {
      showQuarterlyOrders: false,
      showFinancialOrders: false,
      showCustomers: false,
      showProducts: false
    };
  },
  methods: {
    showPastAndFutureReports() {
      this.showQuarterlyOrders = true;
      this.showFinancialOrders = false;
      this.showCustomers = false;
      this.showProducts = false;
    },
    showFinancialReports() {
      this.showFinancialOrders = true;
      this.showQuarterlyOrders = false;
      this.showCustomers = false;
      this.showProducts = false;
    },
    showCustomersReports() {
      this.showCustomers = true;
      this.showQuarterlyOrders = false;
      this.showFinancialOrders = false;
      this.showProducts = false;
    },
    showProductsReports() {
      this.showProducts = true;
      this.showQuarterlyOrders = false;
      this.showFinancialOrders = false;
      this.showCustomers = false;
    },
    goToDashboard() {
            this.$router.push('/AdminDashboard');
        }
  },
};
</script>
  
<style scoped>

.admin-reports-page {
  background-color: #ffffff; /* White background color */
  border-radius: 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1); /* Subtle box shadow for embossed effect */
}

.tab-container {
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
}

.tabs {
  border-radius: 20px;
  background-color: #f2f2f2;
}

button {
    margin: 5px;
  background-color: #ff6b81;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  margin-top: 10px; 
}

button:hover {
  background-color: #e74c3c;
}

button:last-child {
  margin-right: 0;
}

.report-section {
  margin-top: 20px;
}

</style>