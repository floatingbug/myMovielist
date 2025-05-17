<script setup>
import {ref, onMounted} from "vue";
import useMovieStore from "./stores/movieStore.js";
import MoviesPresentation from "./components/moviesPresentation/MoviesPresentation.vue";
import fetchMovies from "./api/fetchMovies.js";


const {movieStoreMovies, movieStoreMetaData} = useMovieStore();


onMounted(async () => {
	// get Movies
	const fetchedMovies = await fetchMovies();

	console.log("--->", fetchedMovies);

	movieStoreMovies.value = fetchedMovies.results;
	const {results, ...metaData} = fetchedMovies;
	movieStoreMetaData.value = metaData;
});

</script>


<template>    
	<div class="layout">
		<h1>Discover</h1>

		<MoviesPresentation class="movies-presentation" />
	</div>
</template>   


<style scoped>
.movies-presentation {
	margin-top: 4rem;
}
</style>
