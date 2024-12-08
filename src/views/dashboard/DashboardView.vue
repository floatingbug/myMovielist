<script setup>
import {ref, onMounted} from "vue";
import SearchInput from "./components/SearchInput.vue";
import {handleSearchInput} from "./helpers/handleSearchInput.js";
import MovieCard from "@/components/MovieCard.vue";
import Paginator from "@/components/Paginator.vue";
import {getMovielists} from "@/utils/getMovielists.js";
import {addToMovielist} from "@/utils/addToMovielist.js";
import {useProgress} from "@/composables/useProgress.js";
import {useToast} from "primevue/usetoast";


const input = ref("");
const movies = ref([]);
const movielists = ref([]);
const rows = ref(40);
const totalRecords = ref(0);
const page = ref(1);
const isProgress = useProgress();
const toast = useToast();


onMounted(async () => {
	isProgress.value = true;
	const {data, errors} = await getMovielists();
	isProgress.value = false;

	movielists.value = data.value.movielists;
});


async function handleSearchInputAction(event){
	if(event.action === "search" && event.data !== ""){
		input.value = event.data;

		isProgress.value = true;
		const {data, errors} = await handleSearchInput({
			input: input.value,
			page: page.value
		});
		isProgress.value = false;

		movies.value = data.value.data.movies;
		totalRecords.value = data.value.data.totalResults;
	}
}

async function handlePaginatorActions(event){
	if(event.action === "page"){
		isProgress.value = true;
		const {data, errors} = await handleSearchInput({
			input: input.value,
			page: event.data.page
		});
		isProgress.value = false;


		movies.value = data.value.data.movies;
	}
}

async function handleCardMenuActions(event){
	isProgress.value = true;
	const {data, errors} = await addToMovielist({
		movie: event.data.movie,
		movielist: event.data.movielist
	});
	isProgress.value = false;

	if(!data.value.success){
	    toast.add({ severity: 'warn', summary: 'Not added', detail: data.value.msg, life: 3000 });
		return;
	}
	    
	toast.add({ severity: 'info', summary: 'Movie added', detail: data.value.msg, life: 3000 });
}
</script>


<template>
	<div class="dashboard-container">
		<header>
			<SearchInput @searchInput:action="handleSearchInputAction"></SearchInput>
		</header>
		
		<main>
			<div class="movies-container">
				<MovieCard v-for="(movie, index) in movies" :movie="movie" :movielists="movielists" @cardMenu:action="handleCardMenuActions">
				</MovieCard>
			</div>
		</main>
		
		<footer>
			<Paginator v-if="totalRecords" :rows="rows" :totalRecords="totalRecords" @paginator:action="handlePaginatorActions"></Paginator>
		</footer>
	</div>
</template>


<style scoped>
.dashboard-container {
	display: flex;
	flex-direction: column;
	gap: 4rem;
}

header {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-top: 4rem;
}

.movies-container {
	display: flex;
	justify-content: center;
	gap: 4rem;
	flex-wrap: wrap;
}
</style>
