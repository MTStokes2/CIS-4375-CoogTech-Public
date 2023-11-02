import { defineStore } from '@pinia/store';

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
