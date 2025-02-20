import { createRouter, createWebHistory } from "vue-router";

import Home from "./views/Home.vue"; 
import Quiz from "./views/Quiz.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      component: Home,
      path: "/",
    },
    {
      component: Quiz,
      path: "/quiz",
    },
  ],
});
