<script setup>
const props = defineProps({
	watchlist: Object
});

</script>


<template>    
	<div class="movies">
		<div class="movie" v-for="(movie, index) in watchlist.movies">
			<div class="name">
				<span>Movie: </span>
				<span>{{movie.title}}</span>
			</div>
		</div>
	</div>
</template>   


<style scoped>
.movies {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	padding: 1rem;
	overflow: auto;
	border-radius: var(--border-radius-hard);
	border: 1px solid var(--card-border-color-light);
}

.movie {
	padding: 1rem;
	border-radius: var(--border-radius-hard);
	border: 1px solid var(--border-color);
}

.name {
	:first-child {
		font-size: 1.2rem;
		color: var(--p-primary-color);
	}
}
</style>
