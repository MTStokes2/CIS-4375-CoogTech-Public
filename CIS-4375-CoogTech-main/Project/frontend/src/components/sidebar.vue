<template>
    <div class="sidebar">
      <div class="tab" @click="$emit('change-tab', 'mainDashboard')">
        <i class="icon">🏠</i> Dashboard
      </div>
      <div class="tab" @click="$emit('change-tab', 'chats')">
        <i class="icon">💬</i> Chats
      </div>
      <router-link to="/customers" class="tab">
        <i class="icon">👥</i> Customers
      </router-link>
      <div class="tab" @click="$emit('change-tab', 'orderManagement')">
        <i class="icon">🛒</i> Order Management
      </div>
      <div class="tab" @click="$emit('change-tab', 'inventory')">
        <i class="icon">📦</i> Inventory
      </div>
      <div class="tab" @click="$emit('change-tab', 'reports')">
        <i class="icon">📊</i> Reports
      </div>
    </div>
  </template>
  
  <script>
  import { useTabStore } from '@/store/tabStore';
  
  export default {
    methods: {
      selectTab(tabName) {
        const tabStore = useTabStore();
        tabStore.setActiveTab(tabName);
      }
    }
  }
  </script>
  
  <style>
  .dashboard {
    display: flex;
  }
  
  .sidebar {
    width: 250px;
    background-color: #f4f5f7;
    padding: 20px;
    box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.1);
  }
  
  .tab {
    padding: 15px;
    margin-bottom: 10px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  
  .tab:hover {
    background-color: #e9ecef;
  }
  
  .icon {
    margin-right: 10px;
  }
  
  .content {
    flex: 1;
    padding: 20px;
    background-color: #ffffff;
  }
  
  .calendar {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 10px;
  }
  
  .day {
    border: 1px solid #e9ecef;
    padding: 10px;
  }
  
  .order {
    background-color: #e9ecef;
    margin-top: 5px;
    padding: 5px;
    border-radius: 3px;
  }
  </style>
  