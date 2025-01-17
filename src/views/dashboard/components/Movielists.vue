<script setup>
const props = defineProps({
	movielists: Array
});
</script>


<template>    
	<div class="movielist" v-for="(movielist, index) in movielists">
		<div class="name">
			<span>Name: </span>
			<span>{{movielist.name}}</span>
		</div>

		<div class="movie-count">
			<span>Movies: </span>
			<span>{{movielist.movies.length}} movies</span>
		</div>
	</div>
</template>   


<style scoped>
.movielist {
	display: flex;
	flex-wrap: wrap;
	gap: 2rem;
	padding: 1rem;
	border-radius: var(--border-radius-hard);
	border: 1px solid var(--border-color);
}

.name, .movie-count {
	flex: 1;
	display: flex;
	align-items: center;
	gap: 1rem;

	:last-child {
		min-width: 100px;
	}
}


.name :first-child, .movie-count :first-child {
	font-size: 1.2rem;
	color: var(--p-primary-color);
}
</style>
