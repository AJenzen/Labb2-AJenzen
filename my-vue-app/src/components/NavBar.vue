<template>
  <nav class="navbar">
    <ul class="nav-links">
      <li><RouterLink to="/">Home</RouterLink></li>
      <li><RouterLink to="/about">About</RouterLink></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
/* Navbar-styling */
.navbar {
  background-color: #333;
  padding: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Lista med länkar */
.nav-links {
  list-style: none;
  display: flex;
  gap: 20px;
  padding: 0;
  margin: 0;
}

/* Länkar */
.nav-links li {
  display: inline;
}

.nav-links a {
  text-decoration: none;
  color: white;
  font-weight: bold;
  padding: 8px 12px;
  border-radius: 5px;
  transition: background 0.3s ease;
}

.nav-links a:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>
