<template>
  <div class="container">
    <h2>Search for a country</h2>
    <input
      v-model="searchQuery"
      @keyup.enter="fetchCountry"
      placeholder="Enter a country name..."
    />
    <button @click="fetchCountry">Search</button>

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
      searchQuery: "", // För att hålla sökfrågan
      country: null, // För att lagra landet som kommer tillbaka från API:et
      loading: false, // För att visa laddningsindikator
      error: null, // För att visa eventuella fel
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
  width: 80%;
  padding: 8px;
  margin-bottom: 10px;
}
button {
  padding: 8px 15px;
  cursor: pointer;
}
.error {
  color: red;
}
</style>
