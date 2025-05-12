<script setup>
import {onMounted, ref} from "vue";
import getLatestMoviesAPI from "@/api/getLatestMoviesAPI.js";
import MovieCarousel from "./MovieCarousel.vue";


const fetchedMovies = ref(null);


onMounted(async () => {
	const result = await getLatestMoviesAPI();

	fetchedMovies.value = result.data.results;
});

</script>


<template>    
	<div v-if="fetchedMovies" class="latest-movies">
		<h1>Latest movies</h1>
		<div class="movie-carousel-container">
			<MovieCarousel v-if="fetchedMovies" :movies="fetchedMovies"></MovieCarousel>
		</div>
	</div>
</template>   


<style scoped>
.latest-movies {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.movie-carousel-container {
	margin-top: 2rem;
}
</style>
