import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import ListView from "../views/ListView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/list",
    name: "list",
    component: ListView,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
