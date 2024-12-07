<script setup>
import CardMenu from "./CardMenu.vue";
import CircleRating from "./CircleRating.vue";


const props = defineProps({
	movie: Object,
	movielists: Array
});


const emit = defineEmits(["cardMenu:action"]);


const IMG_URL_PREFIX = "https://image.tmdb.org/t/p/w600_and_h900_bestv2"


function handleMenuActions(event){
	if(event.target.type === "findMovies"){
		return emit("cardMenu:action", event);
	}
}
</script>


<template>
	<div class="card-container">
		<header>
			<img :src="`${IMG_URL_PREFIX}${movie.poster_path}`" alt="">
			
			<div class="card-menu">
				<CardMenu :movie="movie" :movielists="movielists" @cardMenu:action="handleMenuActions"></CardMenu>
			</div>
		</header>
		
		<main>
			<div v-if="movie.customizedData && movie.customizedData.rating" class="rating">
				<CircleRating></CircleRating>
			</div>
		
			<div v-else class="no-rating-yet">
				<Button severity="secondary" variant="text">No rating yet.</Button>
			</div>
		</main>
		
		<footer>
			<div class="movie-name">
				{{movie.title}}
			</div>
		</footer>
	</div>
</template>


<style scoped>
.card-container {
	width: 10%;
	min-width: 280px;
	display: flex;
	flex-direction: column;
	border-radius: 8px;
	background-color: var(--card-bg);
}

header {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 1rem;
}

footer {
	padding: 1rem;
}

.card-menu {
	position: absolute;
	top: 24px;
	right: 24px;
}

.rating, .no-rating-yet {
	display: flex;
	justify-content: flex-end;
}

.movie-name {
	color: var(--p-primary-color);
}

img {
	width: 100%;
}
</style>
