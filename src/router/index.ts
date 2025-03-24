import { createRouter, createWebHistory } from "vue-router";
import FormExampleFirst from "../views/FormExampleFirst.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: FormExampleFirst,
    },
    {
      path: "/state-example",
      name: "state-example",
      component: () => import("../views/FormExampleState.vue"),
    },
    {
      path: "/slots-example",
      name: "slots-example",
      component: () => import("../views/FormExampleSlots.vue"),
    },
  ],
});

export default router;
