<template>
  <div id="app">
    <header>
      <h1>My Vue App</h1>
      <nav>
        <router-link to="/cal" class="nav-link">Calculator</router-link>
        <router-link to="/calendar" class="nav-link">Calendar</router-link>
        <router-link to="/todo" class="nav-link">To Do</router-link>
      </nav>
    </header>
    <main>
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
/* Styling for a more modern look */
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Roboto', sans-serif;
  background-color: #f4f4f9;
  color: #333;
  line-height: 1.6;
}

/* Container styling */
#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Header styling */
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #6200ea;
  padding: 15px 30px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

header h1 {
  color: white;
  font-size: 1.8rem;
  font-weight: 500;
}

nav {
  display: flex;
  gap: 20px;
}

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

/* Main content styling */
main {
  margin-top: 20px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  header {
    flex-direction: column;
    text-align: center;
  }

  nav {
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
  }

  .nav-link {
    padding: 10px 20px;
  }
}
</style>
