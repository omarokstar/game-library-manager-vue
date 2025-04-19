<template>
  <div class="login-container d-flex justify-content-center align-items-center vh-100">
    <div class="login-card p-4 rounded shadow">
      <div class="text-center mb-4">
        <img src="@/assets/image.png" alt="Logo" class="logo-img img-fluid rounded-circle" />
      </div>

      <h2 class="text-center mb-4">Login</h2>

      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          type="email"
          id="email"
          class="form-control login-input"
          placeholder="Enter your email"
          v-model="email"
        />
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input
          type="password"
          id="password"
          class="form-control login-input"
          placeholder="Enter your password"
          v-model="password"
        />
      </div>

      <button class="btn login-btn w-100 mb-3" @click="handleLogin">Login</button>

      <p class="text-center">
        Don't have an account? <router-link to="/signup" class="text-light">Sign Up</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    handleLogin() {
      console.log("Logging in with:", this.email, this.password);
      this.$router.push("/all-games");
    },
  },
};
</script>

<style scoped>
.login-container {
  background-color: rgb(36, 36, 36);
}

.login-card {
  background-color: #23232e;
  border: 1px solid #32323e;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
}

.logo-img {
  width: 80px;
  height: 80px;
}

h2 {
  color: #d2d2d2;
  font-size: 24px;
}

.form-label {
  color: #d2d2d2;
  font-size: 14px;
}

.login-input {
  background-color: #2a2a36;
  border: 1px solid #32323e;
  color: #d2d2d2;
  padding: 10px;
  border-radius: 5px;
  transition: border-color 0.3s ease;
}

.login-input:focus {
  border-color: #0857b1;
  box-shadow: 0 0 5px rgba(8, 87, 177, 0.3);
  outline: none;
}

.login-input::placeholder {
  color: #666;
  opacity: 0.7;
}

.login-btn {
  background-color: #0857b1;
  border: none;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.login-btn:hover {
  background-color: #1768fd;
}

p {
  color: #d2d2d2;
  font-size: 14px;
}

.text-light {
  color: #fff;
  text-decoration: none;
}

.text-light:hover {
  color: #999;
}
</style>