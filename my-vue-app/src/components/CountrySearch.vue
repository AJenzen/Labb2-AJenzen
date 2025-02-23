<template>
  <div class="container">
    <h1>🗺️ Search for a country</h1>
    <input
      v-model="searchQuery"
      @keyup.enter="fetchCountry"
      placeholder="Enter a country name..."
    />
    <button @click="fetchCountry">Search</button>

    <p>or</p>

    <button @click="fetchRandomCountry">Randomize</button>

    <p v-if="loading">Loading...</p>
    <p v-if="error" class="error">{{ error }}</p>

    <!-- Om country finns, skicka det till CountryInfo -->
    <CountryInfo v-if="country" :country="country" />
  </div>
</template>

<script>
import axios from "axios";
import CountryInfo from "./CountryInfo.vue";

export default {
  components: {
    CountryInfo,
  },
  data() {
    return {
      searchQuery: "", // Håller sökfrågan
      country: null, // Lagrar landet som kommer tillbaka från API:et
      loading: false, // Visar laddningsindikator
      error: null, // Visar eventuella fel
    };
  },
  methods: {
    async fetchCountry() {
      if (!this.searchQuery) return;

      this.loading = true;
      this.error = null;
      this.country = null;

      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${this.searchQuery}`
        );

        // Logga hela API-svaret:
        console.log("API Response:", response);

        // Logga bara den data vi vill ha:
        console.log("API Data:", response.data);

        if (response.data && response.data.length > 0) {
          // Sök genom alla alternativ (common + altSpellings)
          const searchQueryLower = this.searchQuery.toLowerCase();

          this.country = response.data.find(
            ({ name, altSpellings = [] }) =>
              name.common.toLowerCase() === searchQueryLower ||
              altSpellings.some(
                (spelling) => spelling.toLowerCase() === searchQueryLower
              )
          );

          // Om inget land hittades, sätt error
          if (!this.country) {
            this.error = "The country was not found.";
          }
        } else {
          this.error = "The country was not found.";
        }
      } catch (err) {
        console.error("API error:", err); // Logga exakt fel från API:n
        this.error = "Something went wrong with the API call.";
      } finally {
        this.loading = false;
      }
    },

    // Metod för att hämta ett slumpmässigt land
    async fetchRandomCountry() {
      this.loading = true;
      this.error = null;
      this.country = null;

      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countries = response.data;
        this.country = countries[Math.floor(Math.random() * countries.length)];
      } catch (err) {
        this.error = "Something went wrong with the API call.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 20px auto;
  text-align: center;
}
input {
  width: auto;
  padding: 8px;
  margin: 10px;
}
button {
  padding: 8px 15px;
  cursor: pointer;
  display: block;
  margin: 10px auto;
}
.error {
  color: red;
}
</style>
