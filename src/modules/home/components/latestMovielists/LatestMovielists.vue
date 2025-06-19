<script setup>
import {ref, onMounted, toRaw} from "vue";
import {useRouter} from "vue-router";
import getLatestMovielistsAPI from "./api/getLatestMovielistsAPI.js";
import getMoviesAPI from "./api/getMoviesAPI.js";
import RatingSummarized from "@/components/rating/RatingSummarized.vue";
import systemStatus from "@/composables/systemStatus.js";


const router = useRouter();
const latestMovielists = ref([]);
const isInitialized = ref(false);


onMounted(async () => {
	systemStatus.value.isLoading = true;

	const fetchedMovielists = await getLatestMovielistsAPI();
	latestMovielists.value = fetchedMovielists.data;

	console.log("----->", latestMovielists.value);

	// get movielists based on ids in movielist.movies
	const promises = fetchedMovielists.data.map(movielist => {
		const movieIds = movielist.movies;

		return getMoviesAPI({movieIds});
	});
	const responseArray = await Promise.all(promises);

	// replace movielist.movies with actual movies instead of movieIds
	latestMovielists.value.forEach((movielist, index) => {
		movielist.movies = responseArray[index].data.movies;
	});


	isInitialized.value = true;
	systemStatus.value.isLoading = false;
});


function openMovie(movieId){
	router.push(`movie-presentation?movieId=${movieId}`);
}

</script>


<template>    
	<div 
		class="movielist"
		v-if="isInitialized"
		v-for="(movielist, index) in latestMovielists"
	>
		<div class="head">
			<div class="creator">
				<span>Creator: </span>{{movielist.creatorName}}
			</div>

			<div class="title">
				<span>Title: </span>{{movielist.movielistname}}
			</div>

			<div class="open-movielist-indicator">
				<i class="pi pi-arrow-down"></i>
			</div>
		</div>

		<div class="movies-container">
			<div 
				class="movie"
				v-for="(movie, index) in movielist.movies"
				@click="openMovie(movie.id)"
			>
				<div class="movie-head">
					<div class="movie-cover">
						<img :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`" alt="">
					</div>
				</div>

				<div class="movie-main">
					<div class="movie-main__head">
						<RatingSummarized :ratings="movie.ratings" />

						<div class="fsk">
							<span>FSK: </span> {{movie.fsk}}
						</div>
					</div>
				</div>

				<div class="movie-footer">
					<span>Release: </span> {{movie.release_date}}
				</div>
			</div>
		</div>
	</div>
</template>   


<style scoped>
.movielist {
	border-radius: 8px;
	border: 1px solid var(--card-border-color);
	overflow: hidden;

	.head {
		position: relative;
		display: flex;
		gap: 4rem;
		padding: 1rem;
		border-radius: 8px 8px 0 0;
		background-color: var(--table-head-bg-glass);

		.creator, .title {
			display: flex;
			gap: 0.3rem;
		}
	}

	.movies-container {
		height: 500px;
		overflow-y: scroll;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		padding: 2rem;
		border-radius: 0 0 8px 8px;
		background-color: var(--card-bg-glass);

		.movie {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			border-radius: 8px;
			cursor: pointer;
			border: 1px solid var(--card-border-color-light);
			background-color: var(--card-bg-glass);
			transition: transform 250ms;

			.movie-head {
				width: 100%;

				.movie-cover {
					width: 100%;
					height: 200px;
					border-radius: 8px 8px 0 0;
					overflow: hidden;

					img {
						width: 100%;
						height: 100%;
						object-fit: cover;
					}
				}
			}

			.movie-main {
				width: 100%;
				height: 50px;
				padding: 0.5rem 0.8rem;

				.movie-main__head {
					width: 100%;
					display: flex;
					justify-content: space-between;
				}
			}

			.movie-footer {
				width: 100%;
				height: 50px;
				display: flex;
				align-items: center;
				gap: 0.3rem;
				padding: 0 0.8rem;

				.release-date {
				}
			}
		}
	}

	.movie:hover {
		transform: scale(1.1, 1.1);
	}

	.open-movielist-indicator {
		position: absolute;
		left: 50%;
		bottom: 0;
		transform: translate(-50%, 50%);
		padding: 0.3rem;
		border-radius: 30px;
		background-color: var(--surface-1);

		i {
			color: var(--contrast-color);
		}
	}
}
</style>
