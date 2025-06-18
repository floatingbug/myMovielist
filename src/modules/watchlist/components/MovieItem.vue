<script setup>
import {useRouter} from "vue-router";
import RatingSummarized from "@/components/rating/RatingSummarized.vue";


const props = defineProps({
	movie: Object,
});


const emit = defineEmits(["movieItem:action"]);


const router = useRouter();


function emitRemoveMovie(){
	emit("movieItem:action", {
		action: "remove",
		movieId: props.movie.id,
	});
}

</script>


<template>    
	<div class="movie-item">
		<div class="movie-item__img-container">
			<img 
				:src="`https://image.tmdb.org/t/p/original${movie.poster_path}`" 
				alt="movie picture"
				@click="router.push(`/movie-presentation?movieId=${movie.id}`)"
			>
		</div>

		<div class="movie-item__infos">
			<div class="movie-item__infos-head">
				<RatingSummarized :ratings="movie.ratings" />

				<div class="movie-item__infos-head-fsk">
					<span>FSK: </span>{{movie.fsk}}
				</div>
			</div>

			<div class="movie-item__date">
				<span>Release: </span>{{movie.release_date}}
			</div>

			<div class="movie-item__buttons">
				<Button
					severity="warn"
					@click="emitRemoveMovie"
				>
					Remove
				</Button>
			</div>
		</div>
	</div>
</template>   


<style scoped>
.movie-item {
	width: 100%;
	height: 400px;
	display: flex;
	flex-direction: column;
	border-radius: 8px;
	overflow: hidden;
	background-color: var(--card-bg-glass);
}

.movie-item__img-container {
	width: 100%;
	height: 60%;
	
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
}

.movie-item__infos {
	height: 40%;
	display: flex;
	flex-direction: column;
	padding: 1rem;
}

.movie-item__infos-head {
	display: flex;
	gap: 1rem;
}

.movie-item__date {
	margin-top: auto;
}

.movie-item__buttons {
	margin-top: 1rem;
}
</style>
