<script>
import CountrySearch from "../components/CountrySearch.vue";

export default {
  components: { CountrySearch },
};
</script>

<template>
  <div>
    <router-link to="/"></router-link>
    <CountrySearch />
  </div>
</template>

<style scoped>
nav {
  text-align: center;
  margin-bottom: 20px;
}
nav a {
  text-decoration: none;
  font-size: 18px;
  margin: 10px;
}
</style>
