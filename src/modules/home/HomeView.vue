<script setup>
import systemStatus from "@/composables/systemStatus.js";
import LatestMovielists from "./components/latestMovielists/LatestMovielists.vue";
import LatestMovies from "./components/latestMovies/LatestMovies.vue";
import useUserStore from "@/stores/userStore.js";


const {user} = useUserStore();


</script>


<template>    
	<div class="layout">
		<div class="not-signed-in" v-if="!user.isSignedIn">
			<section class="welcome">
				<h1>Welcome.</h1>
				
				<div class="introduction">
					<p>Discover movies and save them to your created movie lists, choosing whether they are private or public.</p>
				</div>
			</section>
		</div>
		
		<div class="signed-in" v-if="user.isSignedIn">
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
}

.welcome {
	width: 90%;
	min-width: 300px;
	display: flex;
	flex-direction: column;
	align-items: center;

	.introduction {
		width: 90%;
		text-align: center;
		margin-top: 1rem;
	}
}

.latest-movielists{

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

	h2 {
		text-align: center;
	}

	.movies-container {
		width: 90%;
		max-width: 1200px;
		margin-top: 2rem;
	}
}

@media(min-width: 768px){
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
