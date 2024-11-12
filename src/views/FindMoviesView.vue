<script setup>
import {ref, onMounted} from "vue";
import {useFetch} from "@/composables/useFetch.js";
import CircleRating from "@/components/findMovies/components/CircleRating.vue";
import CardMenu from "@/components/findMovies/components/CardMenu.vue";


let token = "";
const IMG_URL_PREFIX = "https://image.tmdb.org/t/p/w600_and_h900_bestv2"
const movies = ref([]);


onMounted(async () => {
	const token = localStorage.getItem("token");

	const path = "/find-movies";
	const options = {
		method: "GET",
		headers: {
			"Authorization": token
		}
	};

	const {data, errors} = await useFetch(path, options);
	movies.value = data.value;

	console.log(movies.value);
});
</script>


<template>
	<header>
	</header>

	<main>
		<div class="movies-container">
			<div class="movie card" v-for="movie in movies">
				<header>
					<img :src="`${IMG_URL_PREFIX}${movie.poster_path}`" alt="">
		
					<div class="card-menu">
						<CardMenu></CardMenu>
					</div>
				</header>
		
				<main>
					<div v-if="movie.customizedData && movie.customizedData.rating" class="rating">
						<CircleRating></CircleRating>
					</div>
				</main>
		
				<footer>
					<div class="movie-name">
						{{movie.title}}
					</div>
				</footer>
			</div>
		</div>
	</main>

	<footer>
	</footer>
</template>


<style scoped>
.movies-container {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	gap: 5rem;
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

img {
	width: 100%;
}
</style>
