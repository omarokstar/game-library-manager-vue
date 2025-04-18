<template>
    <div class=" mainmain  d-flex  with-100 vh-100">
      
    <div class="slidebar ">
      <Sidebar /> 
    </div>
  
      <main class="main flex-grow-1 p-4">
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