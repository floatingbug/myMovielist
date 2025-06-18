<script setup>
import {ref, onMounted} from "vue";
import {useRoute} from "vue-router";
import getMovieById from "./api/getMovieById.js";
import getRatings from "./api/getRatings.js";
import handlers from "./handlers/index.js";
import RatingPresentation from "@/components/rating/RatingPresentation.vue";
import RatingSummarized from "@/components/rating/RatingSummarized.vue";
import CreateRating from "@/components/rating/CreateRating.vue";
import useMovieStore from "./stores/movieStore.js";
import { useToast } from 'primevue/usetoast';
import AddToWatchlistButton from "@/components/addToWatchlistButton/AddToWatchlistButton.vue";
import AddToMovielistMenu from "@/components/addToMovielistMenu/AddToMovielistMenu.vue";
import createMovielistAPI from "./api/createMovielistAPI.js";
import addMovieToMovielistAPI from "./api/addMovieToMovielistAPI.js";
import useDiscoverMovieStore from "@/stores/useDiscoverMovieStore.js";


const {movieStoreMovies} = useDiscoverMovieStore();
const {movie} = useMovieStore();
const route = useRoute();
const toast = useToast();
const ratings = ref();
const isInitialized = ref(false);
let movieId = 0;


onMounted(async () => {
	// get movie
	movieId = Number(route.query.movieId);
	movie.value = await getMovieById({movieId});

	// get ratings
	ratings.value = await getRatings({movieId});

	isInitialized.value = true;
});


async function handleRatingEvents(event){
	const result = await handlers.handleRating(event);

	if(!result.success){
	    toast.add({ severity: 'error', summary: 'Error', detail: result.errors[0], group: "tl", life: 5000 });
		return
	}
	   
	toast.add({ severity: 'success', summary: 'Success', detail: 'Rating has been added.', group: "tl", life: 5000 });
	ratings.value = await getRatings({movieId});
	const foundMovie = movieStoreMovies.value.find(movie => movie.id === movieId)
		.ratings = ratings.value;
}

async function handleWatchlistEvents(event){
	const result = await handlers.handleWatchlist(event);

	// update movie in movieStoreMovies
	if(result === "movieAdded"){
		movieStoreMovies.value.forEach(m => {
			if(m.id === event.data.movieId){
				m.isInWatchlist = true;
			}
		});
	}
	else if(result === "movieRemoved"){
		movieStoreMovies.value.forEach(m => {
			if(m.id === event.data.movieId){
				m.isInWatchlist = false;
			}
		});
	}

	movie.value = await getMovieById({movieId});
}

async function handleMovielistEvents(event){
	if(event.action === "create"){
		const result = await createMovielistAPI({
			movieId, 
			movielistname: event.movielistname
		});
		
		if(!result.success){
			toast.add({ severity: 'error', summary: 'Error', detail: result.errors[0], life: 5000 });
			return
		}

		toast.add({ severity: 'success', summary: 'Success', detail: 'Movielist has been created.', life: 5000 });
	}

	if(event.action === "addMovie"){
		const result = await addMovieToMovielistAPI({
			movielistId: event.movielistId,
			movieId,
		});
		
		if(!result.success){
			toast.add({ severity: 'error', summary: 'Error', detail: result.errors[0], group: "tl", life: 5000 });
			return
		}

	    toast.add({ severity: 'success', summary: 'Success', detail: "Movie has been added.", group: "tl", life: 5000 });
	}
}

</script>


<template>    
	<div class="layout">
		<div 
			class="movie-presentation"
			v-if="isInitialized"
		>
			<div class="movie-presentation__head">
				<h1>{{movie.title}}</h1>
			</div>
			
			<div class="movie-presentation__main">
				<RatingSummarized 
					class="movie-presentation_rating-summarized"
					:ratings="ratings"
				/>

				<div class="movie-presentation__image-container">
					<img :src="`https://image.tmdb.org/t/p/original${movie.backdrop_path}`" alt="">
				</div>
			</div>

			<div class="movie-presentation__footer">
				<p class="movie-presentation__overview">
					{{movie.overview}}
				</p>

				<div class="movie-presentation__add-buttons">
					<AddToWatchlistButton 
						:movie="movie" 
						@addToWatchlistButton:action="handleWatchlistEvents"
					/>
					<AddToMovielistMenu 
						@addToMovielistMenu:action="handleMovielistEvents"
					/>
				</div>

				<div class="movie-presentation__ratings">
					<h2>Ratings and comments</h2>
					<div 
						class="movie-presentation__ratings-container"
						v-if="ratings.length > 0"
					>
						<RatingPresentation 
							class="movie-presentation__rating"
							v-for="(rating, index) in ratings"
							:rating="rating"
						/>
					</div>

					<div v-else class="movie-presentation__no-ratings-msg">
						No ratings yet.
					</div>
				</div>

				<div class="movie-presentation__create-rating-container">
					<h2>Create Rating</h2>

					<CreateRating 
						class="movie-presentation__create-rating"
						@createRating:action="handleRatingEvents"
					/>
				</div>
			</div>
		</div>
	</div>
</template>   


<style scoped>
.movie-presentation {
	width: 100%;
	max-width: 1024px;
}

.movie-presentation__main {
	position: relative;

	.movie-presentation_rating-summarized {
		position: absolute;
		right: 0;
		padding: 1rem;
		border-radius: 0 0 0 15px;
		background-color: var(--surface-1);
		backdrop-filter: blur(8px);
	}
}

.movie-presentation__image-container {
	width: 100%;

	img {
		width: 100%;
	}
}

.movie-presentation__overview {
	font-size: 1.1rem;
}

.movie-presentation__add-buttons {
	display: flex;
	gap: 1rem;
	margin-top: 2rem;
}

.movie-presentation__footer {
	margin-top: 1rem;
}

.movie-presentation__ratings {
	margin-top: 3rem;
}

.movie-presentation__rating {
	margin-top: 1rem;
}

.movie-presentation__no-ratings-msg {
	margin-top: 1rem;
}

.movie-presentation__create-rating-container {
	margin-top: 2rem;
}

.movie-presentation__create-rating {
	margin-top: 1rem;
}
</style>
