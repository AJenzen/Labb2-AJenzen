<script setup></script>

<template>
  <nav>
    <ul>
      <li><RouterLink to="/">Home Page</RouterLink></li>
      <li><RouterLink to="/about">About</RouterLink></li>
    </ul>
  </nav>

  <main>
    <routerView />
    <!--This is where the content of the current route will be
    rendered-->
  </main>
</template>

<style scoped></style>
