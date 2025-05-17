import { createRouter, createWebHistory } from 'vue-router'
import homeRoutes from "../modules/home/router/index.js";
import discoverRoutes from "../modules/discover/router/index.js";
import watchlistRoutes from "../modules/watchlist/router/index.js";
import moviePresentationRoutes from "../modules/moviePresentation/router/index.js";

console.log(homeRoutes);

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		...homeRoutes,
		...discoverRoutes,
		...watchlistRoutes,
		...moviePresentationRoutes,
	],
})

export default router
