<script setup>
import {ref, onMounted} from "vue";
import useMovieStore from "./stores/movieStore.js";
import MoviesPresentation from "./components/moviesPresentation/MoviesPresentation.vue";
import fetchMovies from "./api/fetchMovies.js";
import Paginator from "@/components/Paginator.vue";
import handlers from "./handlers";
import Filter from "./components/filter/Filter.vue";
import systemStatus from "@/composables/systemStatus.js";


const {movieStoreMovies, movieStoreMetaData} = useMovieStore();
const isInitialized = ref(false);


onMounted(async () => {
	systemStatus.value.isLoading = true;

	// get Movies
	if(movieStoreMovies.value.length === 0){
		const fetchedMovies = await fetchMovies();
		movieStoreMovies.value = fetchedMovies.results;
		const {results, ...metaData} = fetchedMovies;
		movieStoreMetaData.value = metaData;
	}
	
	systemStatus.value.isLoading = false;
	isInitialized.value = true;
});


async function changePage(event){
	const result = await handlers.handlePaginator(event);
	movieStoreMovies.value = result;
}

</script>


<template>    
	<div class="layout">
		<h1>Discover</h1>

		<Filter class="filter" />

		<MoviesPresentation class="movies-presentation" />

		<Paginator 
			class="paginator" 
			v-if="isInitialized"
			:movieMetaData="movieStoreMetaData" 
			@paginator:action="changePage"
		/>
	</div>
</template>   


<style scoped>
.filter {
	margin-top: 2rem;
}

.movies-presentation {
	margin-top: 3rem;
}

.paginator {
	margin-top: 4rem;
}
</style>
