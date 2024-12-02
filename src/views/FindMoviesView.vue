<script setup>
import {ref, onMounted} from "vue";
import {useFetch} from "@/composables/useFetch.js";
import Card from "@/components/findMovies/components/Card.vue";
import Paginator from "@/utils/Paginator.vue";
import Filter from "../components/findMovies/components/Filter.vue";
import useDeviceSize from "@/composables/useDeviceSize.js";
import MoveUpButton from "@/components/findMovies/components/MoveUpButton.vue";
import {useUser} from "@/store/useUser.js";
import {findMovies} from "@/components/findMovies/helpers/findMovies.js";
import {handlePage} from "@/components/findMovies/helpers/handlePage.js";
import {handleFilter} from "@/components/findMovies/helpers/handleFilter.js";
import {getMovielists} from "@/components/findMovies/helpers/getMovielists.js";
import ProgressSpinner from "@/utils/ProgressSpinner.vue";


let token = "";
const movies = ref([]);
const metaData = ref(null);
const genreList = ref([]);
const page = ref(1);
const {device} = useDeviceSize();
const filterQuery = ref(null);
const {getUserSettings} = useUser();
const userSettings = getUserSettings();
const isInitialized = ref(false);
const isProcessing = ref(true);
const movieCount = ref(null);


onMounted(async () => {
	token = localStorage.getItem("token");

	//find movies
	await findMovies({page, token, movies, metaData, genreList})

	//not more pages than 500 (TMDB dont allow more)
	if(metaData.value.totalResults > 500) metaData.value.totalResults = 499;

	//get movielists
	await getMovielists({token});

	isInitialized.value = true;
	isProcessing.value = false;
});


//handel pagination
async function updatePage(event){
	await handlePage({event, page, token, movies, metaData, filterQuery, isProcessing});
}

//handle filter
async function handleQueryEvent(event){
	handleFilter({event, token, page, movies, metaData, filterQuery});
}

//handle menuAction event
function handleMenuAction(event){
	if(event.action === "processing" && event.isProcessing) isProcessing.value = true;
	else isProcessing.value = false;
}

function scrollToTop(){
	window.scrollTo({
		top: 0,
		behavior: "smooth"
	});
}
</script>


<template>
	<header>
	</header>

	<main>
		<ProgressSpinner v-if="isProcessing" class="process-spinner"></ProgressSpinner>

		<MoveUpButton class="move-up-button-container" @scrollToTop="scrollToTop"></MoveUpButton>

		<div class="main-content" :class="{'main-content-sd': device === 'sd'}">
			<div class="filter-container">
				<Filter v-if="genreList.length > 0" :genreList="genreList" @query="handleQueryEvent"></Filter>
			</div>
			
			<div v-if="isInitialized" class="movies-container">
				<div class="movie card" v-for="movie in movies">
					<Card :movie="movie" @menu:action="handleMenuAction">
					</Card>
				</div>
			</div>
		</div>
	</main>

	<footer>
		<Paginator v-if="isInitialized" :rows="20" :totalRecords="metaData.totalResults" @pageChange="updatePage"></Paginator>
	</footer>
</template>


<style scoped>
/* global styles */
.move-up-button-container {
	position: fixed;
	right: 16px;
	top: 16px;
	z-index: 1000;
}

/* large device */
.main-content {
	width: 100%;
	position: relative;
	display: flex;
}

.movies-container {
	width: 80%;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(250px, 300px));
	justify-content: center;
	gap: 5rem;
	padding: 2rem;
}

.filter-container {
	width: 20%;
	min-width: 300px;
	display: flex;
	flex-direction: column;
	gap: 2rem;
	padding: 2rem;
}

header {
	position: relative;
}

.card-menu {
	position: absolute;
	top: 16px;
	right: 16px;
}

/* small device */
.main-content-sd {
	flex-direction: column;
}

.main-content-sd .filter-container {
	width: 100%;
}

.main-content-sd .movies-container {
	width: 100%;
}

img {
	width: 100%;
}
</style>
