<script setup>
const props = defineProps({
	movieId: Number,
	movielists: Array,
});


const emit = defineEmits(["movielistButtons:action"]);


function emitAddMovie(movielistId){
	emit("movielistButtons:action", {
		action: "addMovie",
		target: "AddToMovielistDialog",
		data: {
			movielistId,
			movieId: props.movieId,
		},
	});
}

</script>


<template>    
	<div class="movielists">
		<Button class="movielist"
			v-if="movielists.length > 0"
			v-for="(movielist, index) in movielists"
			:key="index"
			@click="emitAddMovie(movielist.movielistId)"
		>
			{{movielist.movielistName}}
		</Button>

		<div v-else class="no-movielists">
			No movielists yet.
		</div>
	</div>
</template>   


<style scoped>
.movielists {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}
</style>
