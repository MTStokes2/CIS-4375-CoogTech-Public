<template>
  <div id="landing-page" class="flex flex-col min-h-screen bg-f8ebe6">
    <header class="py-4 px-6 shadow-sm bg-fafafa">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl text-gray-700 font-semibold">The Craft Shack</h1>
        
        <div class="flex space-x-4">
          <a href="/#about-us" class="text-gray-600 hover:text-gray-500">
            <span class="material-icons">search</span>
          </a>
          <router-link to="/contact" class="text-gray-600 hover:text-gray-500">
            <span class="material-icons">phone</span>
          </router-link>
          <router-link to="/login" class="text-gray-600 hover:text-gray-500">
            <span class="material-icons">person</span>
          </router-link>
        </div>
      </div>
    </header>
    
    <main class="flex-grow container mx-auto py-8">
      <router-view></router-view>
    </main>
    
    <footer class="py-4 bg-fafafa">
      <div class="text-center text-gray-600">
        <p class="text-sm">&copy; 2023 CraftShack. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
const apiURL = import.meta.env.VITE_ROOT_API;
</script>

<style scoped>
.bg-f8ebe6 {
  background-color: #F8EBE6;
}

.bg-fafafa {
  background-color: #FAFAFA;
}
</style>
