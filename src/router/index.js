import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      alias: "/",
      beforeEnter: (to, from, next) => {
        console.log("Global beforeEnter");
        const reference = localStorage.getItem("user");
        if (reference) {
          console.log(to, from);
          next();
        } else {
          next("/register");
        }
      },
    },
    {
      path: "/register",
      name: "register",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/RegisterPage.vue"),
    },
    {
      path: "/:notFound(.*)",
      name: "errorPage",
      component: () => import("../views/ErrorPage.vue"),
    },
  ],
});

export default router;
