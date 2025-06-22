<script setup>
import {ref} from "vue";
import systemStatus from "@/composables/systemStatus.js";
import LatestMovielists from "./components/latestMovielists/LatestMovielists.vue";
import LatestMovies from "./components/latestMovies/LatestMovies.vue";
import useUserStore from "@/stores/userStore.js";


const exampleItems = ref([
	{
		label: "Create Movielists",
		screenshotUrl: "/mymovielist/screenshots/movielists.png",
	},
	{
		label: "Rate & Review",
		screenshotUrl: "/mymovielist/screenshots/ratemovie.png",
	},
	{
		label: "Discover Movies",
		screenshotUrl: "/mymovielist/screenshots/discover.png",
	},
]);


const {user} = useUserStore();


</script>


<template>    
	<div class="layout">
		<div class="not-signed-in" v-if="!user.isSignedIn">
			<section class="welcome">
				<h1 class="welcome__header">
					Welcome to <span class="welcome__header-logo">myMovielist</span>
				</h1>
				
				<div class="welcome__introduction">
					 <h2 class="welcome__introduction-header">
					 	🎬 Your personal movie hub
					 </h2>

					 <p class="welcome__introduction-text-first">
					 	Discover. Rate. Organize. All in one place.
					 </p>
				</div>
			</section>

			<section class="examples">
				<div 
					class="example-card"
					v-for="(item, index) in exampleItems"
				>
					<div class="example-card__head">
						<div class="example-card__head-screenshot-container">
							<img class="example-card__head-screenshot-img" :src="item.screenshotUrl" alt="">
						</div>
						<h2 class="example-card__head-header">
							<div>
								{{item.label}}
							</div>
						</h2>
					</div>

					<div class="example-card__main">
						<p>
							Add your favourit movies.
						</p>
						<p>Make movielists private or public.</p>
					</div>
				</div>
			</section>

			<section class="auth">
				<div class="auth__introduction">
					Sign up to start building your own lists.
				</div>

				<div class="auth__sign-buttons">
					<Button
						as="router-link"
						to="/auth/sign-in"
						variant="text"
					>
						Sign in
					</Button>
					
					<Button
						as="router-link"
						to="/auth/sign-up"
						variant="outlined"
						severity="info"
					>
						Sign up
					</Button>
				</div>
			</section>
		</div>
		
		<div class="signed-in" v-if="user.isSignedIn">
			<h1>Dashboard</h1>

			<section class="latest-movielists">
				<h2>Latest Movielists</h2>
			
				<div class="movielists-container">
					<LatestMovielists />
				</div>
			</section>
			
			<section class="latest-movies">
				<h2>Latest Movies</h2>
			
				<div class="movies-container">
					<LatestMovies />
				</div>
			</section>
		</div>
	</div>
</template>   


<style scoped>
section {
	width: 90%;
	min-width: 300px;
}

.signed-in, .not-signed-in {
	width: 100%;
	max-width: 1400px;
	display: flex;
	flex-direction: column;
	align-items: center;

}

.welcome {
	width: 90%;
	min-width: 300px;
	display: flex;
	flex-direction: column;
	align-items: center;

}

.welcome__header {
	text-align: center;
}

.welcome__header-logo {
	color: var(--contrast-color);
}

.welcome__introduction-header {
	margin-top: 3rem;
}

.welcome__introduction-text-first {
	margin-top: 1rem;
	text-align: center;
}

.examples {
	width: 100%;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	gap: 4rem;
}

.example-card {
	width: 90%;
	min-width: 280px;
	max-width: 500px;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 1rem;
	border-radius: 8px;
	background-color: var(--card-bg-glass);
}

.example-card__head {
	width: 100%;
}

.example-card__head-screenshot-container {
	width: 100%;
	height: auto;
	border-radius: 8px;
	overflow: hidden;
}

.example-card__head-screenshot-img {
	width: 100%;
	height: 100%;
}

.example-card__head-header {
	text-align: center;
	margin-top: 1.5rem;
}

.example-card__main {
	text-align: center;
	margin-top: 0.5rem;
}

.auth {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.auth__sign-buttons {
	display: flex;
	gap: 1rem;
	margin-top: 2rem;

	.p-button {
		text-decoration: none;
	}
}

.latest-movielists{
	border: 1px solid var(--card-border-color-ultralight);
	background-color: var(--surface-purple);
	border-radius: 8px;
	padding: 2rem 0;

	h2 {
		text-align: center;
	}

	.movielists-container {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 280px));
		justify-content: center;
		column-gap: 1rem;
		row-gap: 1rem;
		margin-top: 2rem;
	}
}

.latest-movies {
	display: flex;
	flex-direction: column;
	align-items: center;
	border: 1px solid var(--card-border-color-ultralight);
	background-color: var(--surface-purple);
	border-radius: 8px;
	padding: 2rem 0;

	h2 {
		text-align: center;
	}

	.movies-container {
		width: 90%;
		max-width: 1200px;
		margin-top: 2rem;
	}
}


@media(min-width: 768px) {
	.welcome {
		h1 {
			font-size: 4rem;
		}

		.introduction {
			font-size: 1.2rem;
		}
	}
}
</style>	
