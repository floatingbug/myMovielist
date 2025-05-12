import { createRouter, createWebHistory } from 'vue-router'
import homeRoutes from "../modules/home/router/index.js";
import authRoutes from "../modules/auth/router/index.js";
import movieViewRoutes from "../modules/movieView/router/index.js";
import dashboardRoutes from "../modules/dashboard/router/index.js";
import discoverRoutes from "../modules/discover/router/index.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
	  ...homeRoutes,
	  ...authRoutes,
	  ...movieViewRoutes,
	  ...dashboardRoutes,
	  ...discoverRoutes,
  ],
})

export default router
