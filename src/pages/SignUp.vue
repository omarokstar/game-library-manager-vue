<template>
    <div class="signup-container d-flex justify-content-center align-items-center vh-100">
      <div class="signup-card p-4 rounded shadow">
        <div class="text-center mb-4">
          <img src="@/assets/image.png" alt="Logo" class="my-image img-fluid rounded-circle" />
        </div>
  
        <h2 class="text-center mb-4">Sign Up</h2>
  
        
        <div v-if="message" :class="['alert', messageType === 'success' ? 'alert-success' : 'alert-danger']" role="alert">
          {{ message }}
        </div>
  
        <div class="mb-3">
          <label for="username" class="form-label">Username</label>
          <input
            type="text"
            id="username"
            class="form-control signup-input"
            placeholder="Choose a username"
            v-model="username"
          />
        </div>
  
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input
            type="email"
            id="email"
            class="form-control signup-input"
            placeholder="Enter your email"
            v-model="email"
          />
        </div>
  
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            id="password"
            class="form-control signup-input"
            placeholder="Create a password"
            v-model="password"
          />
        </div>
  
        <div class="mb-3">
          <label for="confirm-password" class="form-label">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            class="form-control signup-input"
            placeholder="Confirm your password"
            v-model="confirmPassword"
          />
        </div>
  
        <button class="btn signup-btn w-100 mb-3" @click="handleSignUp">Sign Up</button>
  
        <p class="text-center">
          Already have an account? <router-link to="/login" class="text-light">Login</router-link>
        </p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "SignUp",
    data() {
      return {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        message: "",
        messageType: "", 
      };
    },
    methods: {
      handleSignUp() {
        
        this.message = "";
        this.messageType = "";
  
       
        if (!this.username || !this.email || !this.password || !this.confirmPassword) {
          this.message = "Please fill in all fields.";
          this.messageType = "error";
          return;
        }
  
        
        if (this.password !== this.confirmPassword) {
          this.message = "Passwords do not match!";
          this.messageType = "error";
          return;
        }
  
        const users = JSON.parse(localStorage.getItem("users")) || [];
  
        const emailExists = users.some((user) => user.email === this.email);
        if (emailExists) {
          this.message = "This email is already registered.";
          this.messageType = "error";
          return;
        }
  
        const newUser = {
          username: this.username,
          email: this.email,
          password: this.password,
        };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
  
        this.message = "Sign Up successful! Redirecting to login...";
        this.messageType = "success";
  
        this.username = "";
        this.email = "";
        this.password = "";
        this.confirmPassword = "";
  
        setTimeout(() => {
          this.$router.push("/login");
        }, 2000);
      },
    },
  };
  </script>
  
  <style scoped>
  .signup-container {
    background-color: rgb(36, 36, 36);
    padding: 20px;
  }
  
  .signup-card {
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
  
  .signup-input {
    background-color: #2a2a36;
    border: 1px solid #32323e;
    color: #d2d2d2;
    padding: 10px;
    border-radius: 5px;
    transition: border-color 0.3s ease;
  }
  
  .signup-input:focus {
    border-color: #0857b1;
    box-shadow: 0 0 5px rgba(8, 87, 177, 0.3);
    outline: none;
  }
  
  .signup-input::placeholder {
    color: #666;
    opacity: 0.7;
  }
  
  .signup-btn {
    background-color: #0857b1;
    border: none;
    color: #fff;
    padding: 10px;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }
  
  .signup-btn:hover {
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
    .signup-container {
      padding: 就有10px;
    }
  
    .signup-card {
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
  
    .signup-input {
      padding: 8px;
      font-size: 14px;
    }
  
    .signup-btn {
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
    .signup-container {
      padding: 15px;
    }
  
    .signup-card {
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
  
    .signup-input {
      padding: 9px;
      font-size: 15px;
    }
  
    .signup-btn {
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