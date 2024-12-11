import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/RegisterView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../views/DashboardView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicRoutes = ["login", "home", "register"];
  const unaunthorizedRoutes = ["login", "register"];
  const token = localStorage.getItem("token");

  if (!publicRoutes.includes(to.name as string) && !token) {
    return next({ name: "login" });
  }

  if (unaunthorizedRoutes.includes(to.name as string) && token) {
    return next({ name: "dashboard" });
  }

  next();
});

export default router;
