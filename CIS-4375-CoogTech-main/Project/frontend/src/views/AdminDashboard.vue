<template>
    <div class="dashboard">
      <div class="sidebar">
        <div class="tab" @click="activeTab = 'mainDashboard'">
          <i class="icon">🏠</i> Dashboard
        </div>
        <div class="tab" @click="activeTab = 'chats'">
          <i class="icon">💬</i> Chats
        </div>
        <router-link to="/customers" class="tab">
          <i class="icon">👥</i> Customers
        </router-link>
        <div class="tab" @click="activeTab = 'orderManagement'">
          <i class="icon">🛒</i> Order Management
        </div>
        <div class="tab" @click="activeTab = 'inventory'">
          <i class="icon">📦</i> Inventory
        </div>
        <div class="tab" @click="activeTab = 'reports'">
          <i class="icon">📊</i> Reports
        </div>
      </div>
  
      <div class="content">
        <div v-if="activeTab === 'mainDashboard'">
          <div class="calendar">
            <div v-for="day in 30" :key="day" class="day">
              Day {{ day }}
              <div v-for="order in orders[day]" :key="order.id" class="order">
                Order ID: {{ order.id }}
              </div>
            </div>
          </div>
        </div>
        <div v-if="activeTab === 'chats'">Chats Content...</div>
        <div v-if="activeTab === 'orderManagement'">Order Management Content...</div>
        <div v-if="activeTab === 'inventory'">Inventory Content...</div>
        <div v-if="activeTab === 'reports'">Reports Content...</div>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import { RouterLink } from 'vue-router';
  import axios from 'axios';

  export default {
    data() {
      return {
        activeTab: 'mainDashboard',
        orders: {
          // Sample orders for each day of the month (simplified for illustration)
          '1': [{ id: '001' }, { id: '002' }],
          '2': [],
          '3': [{ id: '003' }],
          // ... Continue for each day ...
        }
      };
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
  