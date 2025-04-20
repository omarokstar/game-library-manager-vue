<template>
    <div class="login-container d-flex justify-content-center align-items-center vh-100">
      <div class="login-card p-4 rounded shadow">
        <div class="text-center mb-4">
          <img src="@/assets/image.png" alt="Logo" class="logo-img img-fluid rounded-circle" />
        </div>
  
        <h2 class="text-center mb-4">Login</h2>
  
        
        <div v-if="message" :class="['alert', messageType === 'success' ? 'alert-success' : 'alert-danger']" role="alert">
          {{ message }}
        </div>
  
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
          Don't have an account? <router-link to="/sign-up" class="text-light">Sign Up</router-link>
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
        message: "",
        messageType: "", 
      };
    },
    methods: {
      handleLogin() {
       
        this.message = "";
        this.messageType = "";
  
        if (!this.email || !this.password) {
          this.message = "Please fill in all fields.";
          this.messageType = "error";
          return;
        }
  
        const users = JSON.parse(localStorage.getItem("users")) || [];
  
        const user = users.find(
          (user) => user.email === this.email && user.password === this.password
        );
  
        if (!user) {
          this.message = "Invalid email or password.";
          this.messageType = "error";
          return;
        }
  
        localStorage.setItem("loggedInUser", JSON.stringify(user));
  
        this.message = "Login successful! Redirecting...";
        this.messageType = "success";
  
        this.email = "";
        this.password = "";
        setTimeout(() => {
          this.$router.push("/all-games");
        }, 2000);
      },
    },
  };
  </script>
  
  <style scoped>
  .login-container {
    background-color: rgb(36, 36, 36);
    padding: 20px;
  }
  
  .login-card {
    background-color: #23232e;
    border: 1px solid #32323e;
    border-radius: 10px;
    width: 100%;
    max-width: 400px;
    padding: 20px;
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
  
  .alert {
    margin-bottom: 15px;
    padding: 10px;
    border-radius: 5px;
    font-size: 14px;
  }
  
  .alert-success {
    background-color: #28a745;
    color: #fff;
  }
  
  .alert-danger {
    background-color: #dc3545;
    color: #fff;
  }
  
  
  @media (max-width: 768px) {
    .login-container {
      padding: 10px;
    }
  
    .login-card {
      max-width: 90%;
      padding: 15px;
    }
  
    .logo-img {
      width: 60px;
      height: 60px;
    }
  
    h2 {
      font-size: 20px;
    }
  
    .form-label {
      font-size: 12px;
    }
  
    .login-input {
      padding: 8px;
      font-size: 14px;
    }
  
    .login-btn {
      padding: 8px;
      font-size: 14px;
    }
  
    p {
      font-size: 12px;
    }
  
    .alert {
      font-size: 12px;
      padding: 8px;
    }
  }
  
 
  @media (min-width: 769px) and (max-width: 1024px) {
    .login-container {
      padding: 15px;
    }
  
    .login-card {
      max-width: 350px;
      padding: 18px;
    }
  
    .logo-img {
      width: 70px;
      height: 70px;
    }
  
    h2 {
      font-size: 22px;
    }
  
    .form-label {
      font-size: 13px;
    }
  
    .login-input {
      padding: 9px;
      font-size: 15px;
    }
  
    .login-btn {
      padding: 9px;
      font-size: 15px;
    }
  
    p {
      font-size: 13px;
    }
  
    .alert {
      font-size: 13px;
    }
  }
  </style>