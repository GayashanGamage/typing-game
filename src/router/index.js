import home from "@/views/home.vue";
import result from "@/views/result.vue";
import TypeEveluation from "@/views/typeEveluation.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: home,
      name: "home",
    },
    {
      path: "/eveluation",
      component: TypeEveluation,
      name: "eveluation",
    },
    {
      path: "/result",
      component: result,
      name: "result",
    },
  ],
});

export default router;
