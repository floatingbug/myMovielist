<script setup>
import {ref, onMounted} from "vue";
import {useRoute} from "vue-router";
import getMoviesAPI from "@/api/getMoviesAPI.js";
import Ratings from "@/components/Ratings.vue";
import {displaySize} from "@/utils/device.js";
import AddToMovielistDialog from "./components/AddToMovielistDialog.vue";
import AddRating from "./components/AddRating.vue";
import useUser from "@/stores/userStore.js";
import useAddToWatchlist from "./composables/useAddToWatchlist.js";
import useMovieViewHandler from "./handlers/useMovieViewHandler.js";
import {useToast} from "primevue/usetoast"; 


const movie = ref(null);
const triggerAddToMovielist = ref(1);
const triggerAddRating = ref(1);
const showSignDialog = ref(false);
const toast = useToast();
const {user} = useUser();
const route = useRoute();
const addToWatchlist = useAddToWatchlist({toast});
const movieViewHandler = useMovieViewHandler({toast, movie}); 


onMounted(async () => {
	const movieId = route.query.movieId;

	movie.value = await getMoviesAPI({
		query: `movieId=${movieId}`,
	});

	movie.value.data.credits.cast.length = 3;

	console.log(movie.value);
});


function addToMovielist(){
	if(!user.isSignedIn){
		showSignDialog.value = true;
	}
	else{
		triggerAddToMovielist.value = triggerAddToMovielist.value * -1;
	}
}

</script>


<template>    
	<div v-if="movie" class="layout">
		<AddToMovielistDialog 
			:triggerAddToMovielist="triggerAddToMovielist" 
			:movieId="movie.data.id"
		/>

		<Dialog v-model:visible="showSignDialog" modal>
			<div class="title">
				You need to be signed in.
			</div>
		</Dialog>

		<div class="layout-aside-left">
			<h2>Ratings</h2>

			<div v-if="movie.data.ratings.length === 0" class="no-ratings">
				<span>No ratings yet.</span>
			</div>
			
			<Ratings v-else class="ratings" :ratings="movie.data.ratings"></Ratings>

			<AddRating
				class="add-rating"
				:movieId="movie.data.id"
				@addRating:action="movieViewHandler.ratingHandler"
			/>
		</div>

		<div class="layout-center">
			<h1>{{movie.data.original_title}}</h1>
			<div class="backdrop-img-container">
				<img :src="`https://image.tmdb.org/t/p/w500/${movie.data.backdrop_path}`" alt="">
			</div>
			
			<div class="buttons-container">
				<Button
					@click="addToWatchlist({movieId: movie.data.id})"
				>
					Add to watchlist
				</Button>
				
				<Button
					@click="addToMovielist"
				>
					Add to movielist
				</Button>
			</div>
			
			<Divider v-if="displaySize < 1024"></Divider>

			<div class="overview">
				<h2>Overview</h2>
				{{movie.data.overview}}
			</div>

			<div class="genres-countries-cast">
				<div class="genres">
					<h2>Genres</h2>
				
					<ul>
						<li
							v-for="(genre, index) in movie.data.genres"
							:key="index"
						>
							{{genre.name}}
						</li>
					</ul>
				</div>
				
				<div class="origin-country">
					<h2>Origin Country</h2>
				
					<ul>
						<li
							v-for="(country, index) in movie.data.origin_country"
							:key="index"
						>
							{{country}}
						</li>
					</ul>
				</div>

				<div class="cast">
					<h2>Cast</h2>

					<ul>
						<li
							v-for="(cast, index) in movie.data.credits.cast"
							:key="index"
						>
							{{cast.name}}
						</li>
					</ul>
				</div>
			</div>
	
			<Divider></Divider>
		</div>
	</div>
</template>   


<style scoped>
.layout {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 5rem;
	margin-bottom: 12rem;
}

.layout-center {
	max-width: 800px;
	order: 1;
	display: flex;
	flex-direction: column;
	padding: 0 1rem;

	.overview {
		margin-top: 1rem;
	}
	
	.backdrop-img-container {
		width: 100%;
		position: relative;
		margin-top: 2rem;
		
		img {
			width: 100%;
		}
	}
	
	.buttons-container {
		position: relative;
		display: flex;
		gap: 1rem;
		margin-top: 0.5rem;

		.p-button {
			padding: 0.2rem 0.5rem;
		}
	}

	.genres-countries-cast {
		width: 100%;
		display: flex;
		align-items: flex-start;
		flex-wrap: wrap;
		gap: 3rem;
		margin-top: 1rem;

		ul {
			padding-left: 1rem;
		}
		
		.genres, .origin-country, .cast {
			display: flex;
			flex-direction: column;
		}
	}

}

.layout-aside-left {
	width: 100%;
	max-width: 800px;
	order: 2;
	padding: 0 1rem;
	margin-top: 5rem;

	.no-ratings {
		width: auto;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.ratings {
		margin-top: 1rem;
	}
	
	.add-rating {
		margin-top: 5rem;
	}
}
</style>
