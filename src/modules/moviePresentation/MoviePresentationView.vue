<script setup>
import {ref, onMounted} from "vue";
import {useRoute} from "vue-router";
import getMovieById from "./api/getMovieById.js";
import getRatings from "./api/getRatings.js";
import handlers from "./handlers/index.js";
import RatingPresentation from "@/components/rating/RatingPresentation.vue";
import RatingSummarized from "@/components/rating/RatingSummarized.vue";
import CreateRating from "@/components/rating/CreateRating.vue";


const route = useRoute();
const movie = ref();
const ratings = ref([]);


onMounted(async () => {
	// get movie
	const movieId = route.query.movieId;
	movie.value = await getMovieById({movieId});

	console.log("+++++>", movie.value);

	// get ratings
	ratings.value = await getRatings({movieId});
	console.log(ratings.value);
});

</script>


<template>    
	<div class="layout">
		<div 
			class="movie-presentation"
			v-if="movie"
		>
			<div class="movie-presentation__head">
				<h1>{{movie.title}}</h1>
			</div>
			
			<div class="movie-presentation__main">
				<RatingSummarized 
					class="movie-presentation_rating-summarized"
				/>

				<div class="movie-presentation__image-container">
					<img :src="`https://image.tmdb.org/t/p/original${movie.backdrop_path}`" alt="">
				</div>
			</div>

			<div class="movie-presentation__footer">
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
						@createRating:action="handlers.handleRating"
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

.movie-presentation__footer {
	margin-top: 1rem;
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
