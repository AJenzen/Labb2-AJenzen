<template>
  <div class="country-info" v-if="country">
    <h3>{{ country.name.common }}</h3>
    <p>
      <strong>Capital:</strong>
      {{ country.capital ? country.capital[0] : "Ingen info" }}
    </p>
    <p>
      <strong>Population:</strong> {{ country.population.toLocaleString() }}
    </p>
    <p>
      <strong>Language:</strong>
      {{ Object.values(country.languages || {}).join(", ") }}
    </p>
    <p>
      <strong>Currency:</strong>
      {{
        Object.values(country.currencies || {})
          .map((c) => c.name)
          .join(", ")
      }}
    </p>
    <img :src="country.flags.svg" :alt="country.name.common" />
  </div>
</template>

<script>
export default {
  props: ["country"],
};
</script>

<style scoped>
.country-info {
  margin-top: 20px;
  text-align: center;
}
img {
  width: 180px;
  border-radius: 5px;
  margin-top: 10px;
}
</style>
