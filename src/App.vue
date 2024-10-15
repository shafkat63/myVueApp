<template>
  <div id="app" class="flex flex-col min-h-screen bg-gray-100">
    <!-- Top Navbar -->
    <header class="bg-white shadow-md flex justify-between items-center p-4">
  <h1 class="text-gray-800 font-medium">My Vue App</h1>
  
  <div class="flex items-center">
    <img
      src="/meli.jpg" 
      alt="User Avatar" 
      class="rounded-full w-10 h-10 mr-2"
    />
    <span class="text-gray-800 font-medium">Muhtasir Shafkat</span>
  </div>
</header>


    <div class="flex flex-grow">
      <aside class="w-64 bg-purple-600 p-4 rounded-lg shadow-lg">
        <h1 class="text-white text-2xl font-medium mb-4">My Vue App</h1>
        <nav class="flex flex-col gap-4">
          <router-link to="/cal" class="nav-link">Calculator</router-link>
          <router-link to="/calendar" class="nav-link">Calendar</router-link>
          <router-link to="/todo" class="nav-link">To Do</router-link>
          <router-link to="/order" class="nav-link">Order</router-link>
        </nav>
      </aside>

      <main class="flex-grow mt-4 p-4 bg-white rounded-lg shadow-md">
        <router-view></router-view>
        <!-- Renders the current route's component -->
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/* Importing Google Fonts */
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "Roboto", sans-serif;
}

/* Styling for links */
.nav-link {
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 8px 15px;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}

.nav-link:hover {
  background-color: #bb86fc;
  color: #ffffff;
}

/* Responsive styling for mobile */
@media (max-width: 768px) {
  #app {
    flex-direction: column; /* Stack sidebar and main content on mobile */
  }

  aside {
    width: 100%; /* Full width for mobile */
  }

  main {
    margin-top: 10px; /* Spacing between sidebar and main content */
  }
}
</style>
