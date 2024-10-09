<template>
  <div id="app" class="flex flex-col min-h-screen bg-gray-100">
    <header class="flex justify-between items-center bg-purple-600 p-4 rounded-lg shadow-lg">
      <h1 class="text-white text-2xl font-medium">My Vue App</h1>
      <nav class="flex flex-wrap gap-4">
        <router-link to="/cal" class="nav-link">Calculator</router-link>
        <router-link to="/calendar" class="nav-link">Calendar</router-link>
        <router-link to="/todo" class="nav-link">To Do</router-link>
      </nav>
    </header>
    <main class="flex-grow mt-4 p-4 bg-white rounded-lg shadow-md">
      <router-view></router-view> <!-- Renders the current route's component -->
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
/* Importing Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Roboto', sans-serif;
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
  header {
    flex-direction: column;
    text-align: center;
  }

  nav {
    flex-direction: row;
    justify-content: center;
    margin-top: 10px;
  }

  .nav-link {
    padding: 10px 20px;
  }

  h1 {
    font-size: 1.5rem;
  }
}
</style>
