<script setup>
import RatingSummarized from "@/components/rating/RatingSummarized.vue";
import Chip from "primevue/chip";


const props = defineProps({
	movie: Object,
});

</script>


<template>    
	<div class="movie-card__container">
		<div class="movie-card__content">
			<div class="movie-card__head">
				<h2>
					{{movie.title}}
				</h2>
			</div>

			<div class="movie-card__main">
				<div class="movie-card__image-container">
					<img :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`" alt="">
				</div>
			</div>

			<div class="movie-card__footer">
				<div class="movie-card__footer-top">
					<div class="movie-card__footer-rating">
						<RatingSummarized :ratings="movie.ratings" />
					</div>

					<div class="movie-card__footer-fsk">FSK: {{movie.fsk}}</div>
				</div>
				
				<span
					class="movie-card__footer-watchlist"
					v-if="movie.isInWatchlist"
				>
					In Watchlist
				</span>

				<div class="movie-card__footer-release-date">
					<span>Release: </span>
					<span>{{movie.release_date}}</span>
				</div>
			</div>
		</div>
	</div>
</template>   


<style scoped>
.movie-card__container {
	min-width: 100px;
	height: 400px;
}

.movie-card__content {
	width: 100%;
	height: 100%;
	position: relative;
	border-radius: 8px;
	overflow: hidden;
	background-color: var(--card-bg-glass);
}

.movie-card__head {
	padding: 1rem;
	background-color: var(--movie-card-head-bg);
	backdrop-filter: blur(8px);

	h2 {
		color: var(--p-primary-color);
	}
}

.movie-card__main {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	z-index: -1;
}

.movie-card__image-container {
	width: 100%;
	height: 100%;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
}

.movie-card__footer {
	width: 100%;
	height: 30%;
	position: absolute;
	bottom: 0;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 0.5rem 1rem;
	background-color: var(--movie-card-footer-bg);
	backdrop-filter: blur(8px);
}

.movie-card__footer-top {
	display: flex;
	justify-content: space-between;
}

.movie-card__footer-watchlist {
	color: var(--contrast-color);
}
</style>
