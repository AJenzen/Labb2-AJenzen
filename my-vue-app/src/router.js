import { createRouter, createWebHistory } from "vue-router";

import Home from "./views/Home.vue"; // Fill in with page names
import About from "./views/About.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      component: Home, // Fill in with page name
      path: "/", // Fill in with page path
    },
    {
      component: About,
      path: "/about",
    },
  ],
});
