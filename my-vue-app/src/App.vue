<template>
  <div id="app">
  <Navbar />
  <main>
    <router-view />
  </main>
  <Footer />
  </div>
</template>

<script>
import Navbar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";

export default {
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style scoped></style>
