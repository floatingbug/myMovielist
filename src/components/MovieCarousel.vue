<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import Carousel from "primevue/carousel";
import MovieCard from "./MovieCard.vue";


const props = defineProps({
	movies: Array,
});


const router = useRouter();
const items = ref([]);
items.value = props.movies.map(movie => {
	return {
		title: movie.original_title,
		poster_path: movie.poster_path,
		movieId: movie.id,
	};
});

const responsiveOptions = ref([
    {
        breakpoint: '1400px',
        numVisible: 6,
        numScroll: 6
    },
    {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 3
    },
    {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
    },
    {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1
    }
]);


function openMovieView(movieId){
	router.push(`/movie-view?movieId=${movieId}`);
}


</script>


<template>    
	<Carousel 
		:value="items" 
		:numVisible="6" 
		:numScrollK="6" 
		:responsiveOptions="responsiveOptions"
		class="custom-carousel"
	>
		<template #item="slotProps">
			<div class="movie-card-wrapper">
				<MovieCard class="movie-card" @click="openMovieView(slotProps.data.movieId)">
					<template #movie-poster>
						<img 
							:src="`https://image.tmdb.org/t/p/w500/${slotProps.data.poster_path}`" 
							alt=""
						>
					</template>
				</MovieCard>
			</div>
		</template>
	</Carousel>
</template>   


<style scoped>
img {
	width: 100%;
}

.movie-card-wrapper {
	display: flex;
	justify-content: center;
}

.movie-card {
	cursor: pointer;
	transition: transform 250ms;
}

.movie-card:hover {
	transform: scale(1.1);
}

@media(min-width: 575px){
	.movie-card-wrapper {
		padding: 0 1rem;
	}
}

</style>
