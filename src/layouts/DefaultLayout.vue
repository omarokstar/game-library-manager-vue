<template>
  <div class="layout">
      
    <div class="slidebar ">
      <Sidebar /> 
    </div>
  
      <main class="main-content">
        <router-view />
      </main>
    </div>
  </template>
  
  <script>
import Sidebar from '../components/Sidebar.vue';
  export default {
    components: {
      Sidebar,
      
    },
  };
  </script>
  <style>

.layout {
  display: flex;
}
.main-content {
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto; 
  min-height: 100vh; 
}

</style>
  