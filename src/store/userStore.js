// stores/userStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const isUserLogin = ref(!!localStorage.getItem("loggedInUser"));

  function login(userData) {
    localStorage.setItem("loggedInUser", JSON.stringify(userData));
    isUserLogin.value = true;
  }

  function logout() {
    localStorage.removeItem("loggedInUser");
    isUserLogin.value = false;
  }

  return {
    isUserLogin,
    login,
    logout
  };
});
