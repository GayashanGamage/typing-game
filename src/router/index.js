import TypeEveluation from "@/views/typeEveluation.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/eveluation",
      component: TypeEveluation,
      name: "typeEveluation",
    },
  ],
});

export default router;
