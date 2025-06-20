<script setup>
import {ref, onMounted} from "vue";
import getMoviesByIdsAPI from "../api/getMoviesByIdsAPI.js";
import removeMovieAPI from "../api/removeMovie.js";
import RatingSummarized from "@/components/rating/RatingSummarized.vue";
import useDevice from "@/composables/useDevice.js";
import systemStatus from "@/composables/systemStatus.js";


const props = defineProps({
	movieIds: Array,
	movielistId: String,
	isOwnMovielist: Boolean,
});


const {device} = useDevice();
const movies = ref([]);


onMounted(async () => {
	systemStatus.value.isLoading = true;

	const result = await getMoviesByIdsAPI({
		movieIds: props.movieIds,
		movielistId: props.movielistId,
	});

	if(!result.success){
		systemStatus.value.isLoading = false;
		return;
	}

	movies.value = result.data.movies;

	systemStatus.value.isLoading = false;
});

async function removeMovie(movieId){
	const result = await removeMovieAPI({
		movielistId: props.movielistId,
		movieId,
		isInOwnMovielist: props.isInOwnMovielist,
	});

	movies.value = movies.value.filter(movie => movie.id !== movieId);
}
</script>


<template>    
	<div class="movies">
		<div 
			class="movies__movie"
			v-for="(movie, index) in movies"
		>

			<div class="movies__movie-head">
				<div class="movies__movie-head-img-wrapper">
					<img :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`" alt="">
				</div>

			</div>

			<div class="movies__movie-main">
				<div class="movies__movie-main-description">
					<div class="movies__movie-main-description-rating">
						<RatingSummarized :ratings="movie.ratings" />
					</div>

					<div class="movies__movie-main-description-date">
						{{movie.release_date}}
					</div>
				</div>
				
				<div class="movies__movie-main-details">
					<div class="movies__movie-main-details-fsk">
						<span>FSK: </span>{{movie.fsk}}
					</div>
				</div>
			</div>

			<div class="movies__movie-footer">
				<div class="moives__movie-footer-buttons">
					<Button
						v-if="isOwnMovielist"
						severity="warn"
						@click="removeMovie(movie.id)"
					>
						Remove
					</Button>
				</div>
			</div>
		</div>
	</div>
</template>   


<style scoped>
.movies {
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2rem;
	padding: 2rem;
	border-radius: 0 0 8px 8px;
	background-color: var(--table-content-bg-glass);
}

.movies__movie {
	width: 100%;
	height: auto;
	display: flex;
	flex-direction: column;
	border-radius: 8px;
	overflow: hidden;
	background-color: var(--card-bg-glass);
}

.movies__movie-head {
	width: 100%;
	height: 150px;
}

.movies__movie-head-img-wrapper {
	width: 100%;
	height: 100%;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
}

.movies__movie-main {
	padding: 0.8rem;
}

.movies__movie-main-description {
	display: flex;
	justify-content: space-between;
}

.movies__movie-main-details {
	margin-top: 1rem;
}

.movies__movie-footer {
	padding: 0.8rem;
}

.movies__moive-footer-buttons {
	display: flex;
	gap: 1rem;
}
</style>
