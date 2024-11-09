import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import authRoutes from "../components/Authorization/router/index.js";
import footerRoutes from "../components/footer/router/index.js";
import findMoviesRouts from "../components/findMovies/router/index.js";

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
  ]
})

export default router
