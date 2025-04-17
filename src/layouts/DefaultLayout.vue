<template>
    <div class="d-flex">
      <Sidebar /> 
      <main class="flex-grow-1 p-4">
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