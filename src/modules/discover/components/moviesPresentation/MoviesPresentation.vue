<script setup>
import {useRouter} from "vue-router";
import useMovieStore from "../../stores/movieStore.js";
import MovieCard from "@/components/movieCard/MovieCard.vue";


const {movieStoreMovies, movieStoreMetaData} = useMovieStore();
const router = useRouter();


function openCard(movieId){
	router.push(`/movie-presentation?movieId=${movieId}`);
}

</script>


<template>    
	<div class="movies-presentation">
		<MovieCard
			v-for="(movie, index) in movieStoreMovies"
			:key="index"
			:movie="movie"
			@click="openCard(movie.id)"
		/>
	</div>
</template>   


<style scoped>
.movies-presentation {
	width: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	justify-content: center;
	column-gap: 1rem;
	row-gap: 1rem;
}
</style>
