<script setup>
import {ref} from "vue";
import CardMenu from "./CardMenu.vue";
import CardRating from "./CardRating.vue";
import MovieRating from "./CardRating.vue";
import RatingForm from "./RatingForm.vue";
import {useFetch} from "../composables/useFetch.js";
import {useUser} from "../store/useUser.js";
import {addRating} from "@/utils/addRating.js";


const props = defineProps({
	movie: Object,
	movielists: Array,
});


const emit = defineEmits(["cardMenu:action"]);


const IMG_URL_PREFIX = "https://image.tmdb.org/t/p/w600_and_h900_bestv2"
const {getUser} = useUser();
const user = getUser();
const showRatingForm = ref(true);


function handleMenuActions(event){
	return emit("cardMenu:action", event);
}
</script>


<template>
	<div class="card-container">
		<slot name="rating"></slot>

		<header>
			<img :src="`${IMG_URL_PREFIX}${movie.poster_path}`" alt="">
			
			<div class="card-menu">
				<CardMenu :movie="movie" :movielists="movielists" @cardMenu:action="handleMenuActions"></CardMenu>
			</div>
		</header>
		
		<main>
			<div v-if="props.movie.averageRating" class="rating">
				<span>User Rating:&nbsp;</span>
				<CardRating :rating="movie.averageRating"></CardRating>
			</div>
		
			<div v-else class="no-rating-yet">
				<span>
					No rating yet.
				</span>
			</div>
		</main>
		
		<footer>
			<div class="movie-name">
				{{movie.title}}
			</div>
		</footer>
	</div>
</template>


<style scoped>
.card-container {
	width: 10%;
	min-width: 280px;
	position: relative;
	display: flex;
	flex-direction: column;
	border-radius: 8px;
	background-color: var(--card-bg);
}



header {
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 1rem;
}

footer {
	padding: 1rem;
}

.card-menu {
	position: absolute;
	top: 24px;
	right: 24px;
}

.rating, .no-rating-yet {
	display: flex;
	justify-content: flex-end;
	padding: 0 1rem;
}

.movie-name {
	color: var(--p-primary-color);
}

img {
	width: 100%;
}
</style>
