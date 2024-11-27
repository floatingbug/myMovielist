import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import authRoutes from "../components/Authorization/router/index.js";
import footerRoutes from "../components/footer/router/index.js";
import findMoviesRouts from "../components/findMovies/router/index.js";
import dashboardRoutes from "../components/dashboard/router/index.js";
import publicListsRoutes from "../components/publicLists/router/index.js";
import addMovieListRoutes from "../components/addMovieList/router/index.js";
import movielistsRoutes from "../components/movielists/router/index.js";


import TestView from "../views/TestView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
	  ...authRoutes,
	  ...footerRoutes,
	  ...findMoviesRouts,
	  ...dashboardRoutes,
	  ...publicListsRoutes,
	  ...addMovieListRoutes,
	  ...movielistsRoutes,

	  {
		  path: "/test",
		  name: "test",
		  component: TestView
	  }
  ]
})

export default router
