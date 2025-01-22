<script setup>
import {ref, onMounted} from "vue";
import {useRoute} from "vue-router";
import {getMovie} from "@/utils/getMovie.js";
import {getAverageRating} from "./helper/getAverageRating.js";
import {countRatingsByStars} from "./helper/countRatingsByStars.js";
import ChartRating from "./components/ChartRating.vue";
import {getRatingsByPercent} from "./helper/getRatingsByPercent.js";
import UserRating from "./components/UserRating.vue";


const route = useRoute();
const movie = ref(null);
const ratings = ref(null);
const averageRating = ref(null);
const ratingsByStars = ref(null);
const ratingsPercent = ref(null);
const customizedData = ref(null);
const IMG_URL_PREFIX = "https://image.tmdb.org/t/p/w600_and_h900_bestv2"


onMounted(async () => {
	const movieId = route.query.movieId;

	const {data, errors} = await getMovie(movieId);
	movie.value = data.value.movie;

	ratings.value = movie.value.customizedData.map(data => data.rating);
	averageRating.value = getAverageRating(ratings);
	ratingsByStars.value = countRatingsByStars(ratings);
	ratingsPercent.value = getRatingsByPercent(ratingsByStars);
	customizedData.value = data.value.movie.customizedData;
});
</script>


<template>    
	<div v-if="movie" class="movie-view-container">
		<div class="top-container">
			<div class="left">
				<div class="title">
					<h1>{{movie.title}}</h1>
				</div>

				<div class="cover">
					<img :src="`${IMG_URL_PREFIX}${movie.cover}`" alt="">
				</div>
		
				<div class="overview">
					<h3>Overview</h3>
		
					<span>
						{{movie.description}}
					</span>
				</div>
			</div>
		
			<div class="right">
				<div class="description-container">

					<h3>Description</h3>

					<div class="description">
						<span>Budget: </span>
						<span>{{movie.budget}}</span>
					</div>

					<div class="description">
						<span>Homepage: </span>
						<span>{{movie.homepage}}</span>
					</div>

					<div class="description">
						<span>Runtime: </span>
						<span>{{movie.runtime}}</span>
					</div>
				</div>
			</div>
		</div>

		<Divider style="width: 90%;"></Divider>

		<div v-if="ratings" class="bottom-container">
			<div class="left">
				<div class="top">
					<h3>Ratings</h3>
					
					<div class="rating-average">
						<Rating v-model="averageRating" readonly></Rating>
						<span>{{averageRating}} of 5</span>
					</div>
					
					<div class="ratings-sum">
						<span>Altogether: {{movie.customizedData.length}} Ratings</span>
					</div>
				</div>

				<div class="chart-rating-container">
					<ChartRating v-for="(percent, index) in ratingsPercent" :percent="percent" :stars="index+1"></ChartRating>
				</div>
			</div>

			<div class="right">
				<div class="user-ratings">
					<UserRating v-for="(userRating, index) in customizedData" :userRating="userRating" :stars="userRating.rating"></UserRating>
				</div>
			</div>
		</div>
	</div>
</template>   


<style scoped>
.movie-view-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4rem;
}

.top-container {
	width: 90%;
	min-width: 280px;
	max-width: 1200px;
	display: flex;
	gap: 2rem;
	margin-top: 10dvh;

	h1 {
		font-size: 3rem;
		color: var(--p-primary-color);
	}

	.left, .right {
		flex: 1 1 280px;
		display: flex;
		flex-direction: column;
		gap: 2rem;

		h3 {
			font-size: 2rem;
		}
	}

	.left .cover {
		max-width: 400px;
	}

	.left img {
		width: 100%;
	}

	.left .overview {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		:last-child {
			font-size: 1.2rem;
		}
	}

	.right {
		position: relative;
		align-items: center;
	}

	.right .description-container {
		position: absolute;
		top: 10%;
		display: flex;
		flex-direction: column;
		gap: .5rem;

		h3 {
			padding: 1rem 0;
		}

		.description {
			:first-child {
				font-size: 1.2rem;
				color: var(--p-primary-color);
			}
		}
	}
}

.bottom-container {
	width: 90%;
	display: flex;

	.left, .right {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.left .top {
		display: flex;
		flex-direction: column;
		gap: .4rem;
	}

	.rating-average {
		display: flex;
		gap: 1rem;
	}
}

.chart-rating-container {
	display: flex;
	flex-direction: column-reverse;
	gap: 1rem;
}


@media(max-width: 1000px){
	.top {
		flex-direction: column;

		.right {
			align-items: flex-start;
		}
	}
}
</style>
