import { createRouter, createWebHistory } from 'vue-router'
import authRoutes from "../views/authorization/router/index.js";
import footerRoutes from "../components/footer/router/index.js";
import findMoviesRouts from "../views/findMovies/router/index.js";
import dashboardRoutes from "../views/dashboard/router/index.js";
import publicListsRoutes from "../views/publicLists/router/index.js";
import addMovieListRoutes from "../views/addMovieList/router/index.js";
import movielistsRoutes from "../views/movielists/router/index.js";


import TestView from "../views/TestView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
	  ...authRoutes,
	  ...footerRoutes,
	  ...findMoviesRouts,
	  ...dashboardRoutes,
	  ...publicListsRoutes,
	  ...addMovieListRoutes,
	  ...movielistsRoutes,
  ]
})

export default router
