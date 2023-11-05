import { defineStore } from 'pinia';

export const useTabStore = defineStore('tab', {
  state: () => ({
    activeTab: 'dashboard', // set default tab
  }),
  actions: {
    setActiveTab(tabName) {
      this.activeTab = tabName;
    }
  }
});
