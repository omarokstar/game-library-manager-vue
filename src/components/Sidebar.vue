<template>
    <div class="sidebar bg-dark vh-100 text-light p-3">
      <div class="text-center mb-4">
        <router-link to="/home">
        <img  src="@/assets/image.png" alt="Logo" class="my-image img-fluid rounded-circle" />
        </router-link>

      </div>
      <div>
        <h6 class="text-uppercase">Explore</h6>
        <ul class="list-unstyled">
          <li>
            <router-link to="/all-games" class="text-decoration-none text-light">
              <i class="fas fa-gamepad me-2"></i> All Games
            </router-link>
          </li>
          <li>
            <router-link to="/genres" class="text-decoration-none text-light">
              <i class="fas fa-layer-group me-2"></i> Genres
            </router-link>
          </li>
        </ul>
      </div>
      <hr />
      <div>
        <h6 class="text-uppercase">Your Games</h6>
        <ul class="list-unstyled">
          <li>
            <router-link to="/favourites" class="text-decoration-none text-light">
              <i class="fas fa-star me-2"></i> Favourites
            </router-link>
          </li>
          <li>
            <router-link to="/list" class="text-decoration-none text-light">
              <i class="fas fa-list me-2"></i> List
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Sidebar",
  };
  </script>
  
  <style scoped>
.sidebar {
    width: 250px;
    border: 0.5px solid;
    border-color: gray;
    border-radius: 1%;
    margin: 5px;

}
.sidebar h6 {
    font-size: 0.9rem;
    margin-bottom: 1rem;
    color:#c1c1c7;
    font-weight: 700;
  }

.sidebar ul li {
    margin-bottom: 0.8rem;
}


li {
    transition:  background-color 0.3s ease; 
}
li:hover {
    border-radius: 5%;
    border-color: rgba(160, 149, 149, 0.5); 
    background-color: rgb(68, 68, 68);

}
  </style>