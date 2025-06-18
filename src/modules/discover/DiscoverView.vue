<script setup>
import {ref, onMounted} from "vue";
import useDiscoverMovieStore from "@/stores/useDiscoverMovieStore.js";
import MoviesPresentation from "./components/moviesPresentation/MoviesPresentation.vue";
import fetchMovies from "./api/fetchMovies.js";
import Paginator from "@/components/paginator/Paginator.vue";
import handlers from "./handlers";
import Filter from "./components/filter/Filter.vue";
import systemStatus from "@/composables/systemStatus.js";
import SearchInput from "./components/searchInput/SearchInput.vue";


const {movieStoreMovies, movieStoreCurrMovies,  movieStoreMetaData} = useDiscoverMovieStore();
const isInitialized = ref(false);


onMounted(async () => {
	systemStatus.value.isLoading = true;

	// get Movies
	if(movieStoreMovies.value.length === 0){
		const fetchedMovies = await fetchMovies();
		movieStoreMovies.value = fetchedMovies.results;
		movieStoreCurrMovies.value = fetchedMovies.results.slice(0, 20);

		const {results, ...metaData} = fetchedMovies;
		movieStoreMetaData.value = metaData;
	}

	systemStatus.value.isLoading = false;
	isInitialized.value = true;
});


async function changePage(event){
	systemStatus.value.isLoading = true;

	if(movieStoreMovies.value.length > 20){
		const start = (event.data.page - 1) * 20;
		const end = start + 20;
		movieStoreCurrMovies.value = movieStoreMovies.value.slice(start, end);
		systemStatus.value.isLoading = false;
		return;
	}

	const result = await handlers.handlePaginator(event);
	movieStoreMovies.value = result;
	movieStoreCurrMovies.value = movieStoreMovies.value.slice(0, 20);
	
	systemStatus.value.isLoading = false;
}

</script>


<template>    
	<div class="layout">
		<h1>Discover</h1>

		<div class="discover__search">
			<Filter class="filter" />

			<SearchInput class="search-input" />
		</div>

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
.discover__search {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;;
	gap: 1rem;
	margin-top: 2rem;
	padding: 0 0.5rem;

	.search-input {
		min-width: 280px;
		max-width: 600px;
	}
}

.movies-presentation {
	margin-top: 3rem;
}

.paginator {
	margin-top: 4rem;
}

@media(min-width: 440px) {
	.discover__search {
		flex-direction: row;
		padding: 0 2rem;
	}
}

@media(min-width: 1024px) {
	.discover__search {
		padding: 0 2rem;
	}

	.movies-presentation {
		padding: 0 2rem;
	}
}
</style>
