<script setup>
import {ref, onMounted, nextTick} from "vue";
import {useRouter} from "vue-router";
import getLatestMoviesAPI from "./api/getLatestMoviesAPI.js";
import Carousel from 'primevue/carousel';


const router = useRouter();
const movies = ref([]);
const responsiveOptions = ref([
    {
        breakpoint: '8000px',
        numVisible: 6,
        numScroll: 6
    },
    {
        breakpoint: '1199px',
        numVisible: 5,
        numScroll: 5
    },
    {
        breakpoint: '480px',
        numVisible: 2,
        numScroll: 2
    },
    {
        breakpoint: '320px',
        numVisible: 1,
        numScroll: 1
    }
]);


onMounted(async () => {
	const fetchedMovies = await getLatestMoviesAPI();
	movies.value = fetchedMovies.data.results;


	await nextTick();
	window.dispatchEvent(new Event('resize'));
});

</script>


<template>    
	<Carousel :value="movies" :numVisible="3" :numScroll="1" :responsiveOptions="responsiveOptions">
		<template #item="slotProps">
				<div class="movie-card">
					<div class="cover">
						<img :src="`https://image.tmdb.org/t/p/original/${slotProps.data.poster_path}`" alt="">
					</div>
				</div>
		</template>
	</Carousel>
</template>   


<style scoped>
.movie-card {
	width: 100%;
	height: 100%;
	padding: 1rem;
	transition: transform 250ms;

	.cover {
		width: 100%;
		height: 100%;
		border: 1px solid var(--card-border-color);

		img {
			width: 100%;
			height: 100%;
		}
	}
}
</style>
