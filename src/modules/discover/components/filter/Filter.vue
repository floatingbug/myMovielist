<script setup>
import {ref} from "vue";
import Drawer from "primevue/drawer";
import FilterGenres from "./components/FilterGenres.vue";
import Filter from "./helpers/Filter.js";
import getMoviesAPI from "./api/getMoviesAPI.js";
import createQuery from "./helpers/createQuery.js";
import useMovieStore from "../../stores/movieStore.js";
import systemStatus from "@/composables/systemStatus.js";


const {movieStoreMovies, movieStoreMetaData} = useMovieStore();
const isDrawerVisible = ref(false);
const filterObj = {
	genreList: [],
};


function handleFilterEvents(event){
	if(event.action === "selectedGenres"){
		filterObj.genreList = event.data.selectedGenres;
	}
}


async function applyFilter(){
	systemStatus.value.isLoading = true;

	const query = createQuery({filterObj});

	movieStoreMovies.value = [];
	movieStoreMetaData.value = [];
	
	isDrawerVisible.value = false;

	const result = await getMoviesAPI({query});
	movieStoreMovies.value = result.data.results;
	const {results, ...metaData} = result.data;
	movieStoreMetaData.value = metaData;

	systemStatus.value.isLoading = false;
}

</script>


<template>    
	<div class="filter">
		<Drawer 
			v-model:visible="isDrawerVisible" 
			header="Filter"
		>
			<Divider></Divider>

			<div class="filter__genres">
				<h2>Filter by Genres</h2>
				<FilterGenres @filterGenres:action="handleFilterEvents" />
			</div>

			<Button 
				class="filter__apply-filter-button"
				@click="applyFilter"
			>
				Apply Filter
			</Button>
		</Drawer>
		<Button 
			@click="isDrawerVisible = true"
		>
			<i class="pi pi-filter"></i>
			Filter
		</Button>
	</div>
</template>   


<style scoped>
.filter {
	.p-button {
		background-color: var(--contrast-color);
	}
}

.filter__genres {
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
	margin-top: 2.5rem;
}

.filter__apply-filter-button {
	margin-top: 3rem;
}
</style>
