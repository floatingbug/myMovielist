<script setup>
import {ref, onMounted} from "vue";
import {findMovies} from "./helpers/findMovies.js";
import MovieCard from "@/components/MovieCard.vue";
import Filter from "./components/Filter.vue";
import Paginator from "@/components/Paginator.vue";
import {useProgress} from "@/composables/useProgress.js";
import {getMovielists} from "@/utils/getMovielists.js";
import {addToMovielist} from "@/utils/addToMovielist.js";
import {useToast} from "primevue/usetoast";
import RatingForm from "@/components/RatingForm.vue";
import {addRating} from "@/utils/addRating.js";
import {useUser} from "@/store/useUser.js";
import {determineAverageRating} from "@/utils/determineAverageRating.js";
import {addMovieToWatchlist} from "@/utils/addMovieToWatchlist.js";


const {getUser} = useUser();
const user = getUser();
const movies = ref([]);
const movielists = ref([]);
const genreList = ref([]);
const isInitialized = ref(false);
const totalRecords = ref(0);
const query = ref("");
const rows = ref(20);
const isProgress = useProgress();
const toast = useToast();
const ratingMovieId = ref(0);


onMounted(async () => {
	isProgress.value = true;

	//get movies, genreList (genreIds for filter), and totalRecords (for paginator)
	const {data: movieData, errors: movieErrors} = await findMovies({page: 1});

	movies.value = movieData.value.movies;
	genreList.value = movieData.value.genreList.genres;
	totalRecords.value = movieData.value.metaData.totalResults;

	//add ratings to movies
	determineAverageRating(movies);

	//get movielists
	const {data: movielistsData, errors: movielistsErrors} = await getMovielists();
	
	movielists.value = movielistsData.value.movielists;

	isInitialized.value = true;
	isProgress.value = false;
});


async function handleFilterActions(event){
	if(event.target.type !== "findMovies") return;

	if(event.action === "filter"){
		query.value = event.data.query;

		isProgress.value = true;
		const {data, errors} = await findMovies({page: 1, query: query.value});
		isProgress.value = false;

		movies.value = data.value.movies;
		totalRecords.value = data.value.metaData.totalResults;
	
		//add ratings to movies
		determineAverageRating(movies);
	}
}

async function handlePaginatorActions(event){
	if(event.target.type !== "findMovies") return;

	if(event.action === "page"){
		isProgress.value = true;
		const {data, errors} = await findMovies({page: event.data.page, query: query.value});
		isProgress.value = false;

		movies.value = data.value.movies;
		totalRecords.value = data.value.metaData.totalResults;
	
		//add ratings to movies
		determineAverageRating(movies);
	}
}

async function handleCardMenuActions(event){
	if(event.action === "addMovieToMovielist"){
		const {data, errors} = await addToMovielist({movie: event.data.movie, movielist: event.data.movielist});

		if(!data.value.success){
		    toast.add({ severity: 'warn', summary: 'Not added', detail: data.value.msg, life: 3000 });
			return;
		}
		    
		toast.add({ severity: 'info', summary: 'Added', detail: data.value.msg, life: 3000 });
	}

	else if(event.action === "addRating"){
		ratingMovieId.value = event.data.movieId;
	}

	else if(event.action === "addMovieToWatchlist"){
		const {data, errors} = await addMovieToWatchlist({movie: event.data.movie});
		
		if(!data.value.success){
		    toast.add({ severity: 'warn', summary: 'Not added', detail: data.value.msg, life: 3000 });
			return;
		}
		    
		toast.add({ severity: 'info', summary: 'Added', detail: data.value.msg, life: 3000 });
	}
}

async function handleRatingActions(event){
	if(event.action === "close") ratingMovieId.value = 0;

	if(event.action === "submitRating"){
		const {data, errors} = await addRating({
			token: user.token,
			movieId: event.data.movieId, 
			dataType: "rating", 
			rating: event.data.rating,
			comment: event.data.comment
		});

		if(!data.value.success){
			ratingMovieId.value = 0;
			return toast.add({ severity: 'warn', summary: 'not added', detail: data.value.msg, life: 3000 });
		}
		toast.add({ severity: 'info', summary: 'Added', detail: data.value.msg, life: 3000 });

		//update movie rating localy
		const changedMovie = movies.value.find(movie => movie.id === event.data.movieId);

		if(!changedMovie.customizedData) {
			changedMovie.averageRating = event.data.rating;
			ratingMovieId.value = 0;
			return;
		}

		let ratingCount = 0;
		let ratingSum = 0;

		for(let i = 0; i < changedMovie.customizedData.length; i++){
			ratingCount++;
			ratingSum += changedMovie.customizedData[i].rating;
		}


		changedMovie.averageRating = (ratingSum + event.data.rating) / (ratingCount + 1);

		ratingMovieId.value = 0;
	}
}
</script>


<template>
	<header>
	</header>

	<main v-if="isInitialized">
		<div class="main-filter">
			<Filter :genreList="genreList" @filter:action="handleFilterActions"></Filter>
		</div>

		<div class="main-movies">
			<MovieCard v-for="(movie, index) in movies" :movie="movie" :movielists="movielists" @cardMenu:action="handleCardMenuActions">
				<template #rating>
					<RatingForm v-if="movie.id === ratingMovieId" @rating:action="handleRatingActions" :movie="movie"></RatingForm>
				</template>
			</MovieCard>
		</div>
	</main>

	<footer>
		<Paginator :rows="rows" :totalRecords="totalRecords" @paginator:action="handlePaginatorActions"></Paginator>
	</footer>
</template>


<style scoped>
main {
	width: 100%;
	display: flex;
	justify-content: center;
	gap: 2rem;
	padding: 4rem;
}

.main-filter {
	width: 20%;
	min-width: 280px;
}

.main-movies{
	width: 80%;
	display: flex;
	justify-content: space-evenly;
	flex-wrap: wrap;
	gap: 1rem;
}

@media(max-width: 1335px) {
	main {
		flex-wrap: wrap;
		padding: 0;
	}

	.main-movies {
		width: 100%;
	}

	.main-filter {
		width: 80%;
		margin-top: 4rem;
	}
}
</style>
