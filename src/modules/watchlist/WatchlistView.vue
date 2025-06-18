<script setup>
import {ref, onMounted} from "vue";
import movieStore from "./stores/movieStore.js";
import getWatchlistAPI from "./api/getWatchlistAPI.js";
import MovieItem from "./components/MovieItem.vue";
import systemStatus from "@/composables/systemStatus.js";
import removeMovieAPI from "./api/removeMovieAPI.js";


const isInitialized = ref(false);


onMounted(async () => {
	systemStatus.value.isLoading = true;

	const result = await getWatchlistAPI();

	if(!result.success){
		systemStatus.value.isLoading = false;
		return;
	}

	movieStore.movies.value = result.data.movies;
	
	isInitialized.value = true;
	systemStatus.value.isLoading = false;
});


const actions = {
	async movieItem(event){
		if(event.action === "remove"){
			const result = await removeMovieAPI({
				movieId: event.movieId,
			});

			movieStore.movies.value = movieStore.movies.value.filter(movie => {
				return movie.id !== event.movieId;
			});
		}
	}
};

</script>


<template>    
	<div class="layout">
		<h1>Watchlist</h1>

		<div class="watchlist" v-if="isInitialized">
			<div
				class="watchlist__movie-item"
				v-for="(movie, index) in movieStore.movies.value"
				:key="index"
			>
				<MovieItem :movie="movie" @movieItem:action="actions.movieItem" />
			</div>
		</div>
	</div>
</template>   


<style scoped>
.watchlist {
	width: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(100px, 200px));
	justify-content: center;
	column-gap: 1rem;
	row-gap: 1rem;
	margin-top: 2rem;
}
</style>
