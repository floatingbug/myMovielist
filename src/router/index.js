import { createRouter, createWebHistory } from 'vue-router'
import homeRoutes from "../modules/home/router/index.js";
import discoverRoutes from "../modules/discover/router/index.js";
import watchlistRoutes from "../modules/watchlist/router/index.js";
import moviePresentationRoutes from "../modules/moviePresentation/router/index.js";
import movielistsRoutes from "../modules/movielists/router/index.js";
import movielistsUserRoutes from "../modules/movielistsUser/router/index.js";
import authRoutes from "../modules/auth/router/index.js";
import legalRoutes from "../modules/legal/router/index.js";


const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		...homeRoutes,
		...discoverRoutes,
		...watchlistRoutes,
		...moviePresentationRoutes,
		...movielistsRoutes,
		...authRoutes,
		...legalRoutes,
	],
})

export default router
