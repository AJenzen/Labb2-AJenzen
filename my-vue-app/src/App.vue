<template>
  <Navbar />
  <main>
    <router-view />
  </main>
</template>

<script>
import Navbar from "./components/NavBar.vue";

export default {
  components: {
    Navbar,
  },
};
</script>

<style scoped></style>
