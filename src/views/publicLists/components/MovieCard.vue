<script setup>
import ScrollPanel from "primevue/scrollpanel";


const props = defineProps({
	movie: Object
});

</script>


<template>
	<div class="movie-card">
		<header>
			<h3>{{movie.title}}</h3>
		</header>

		<main>
			<img :src="movie.cover" alt="">

			<ScrollPanel style="width: 100%; height: 100px;">
				<p>
					{{movie.description}}
				</p>
			</ScrollPanel>
		</main>

		<footer>
		</footer>
	</div>
</template>


<style scoped>
.movie-card {
	max-width: 300px;
	border-radius: 8px;
	padding: 1rem;
	background-color: var(--card-bg);
}

img {
	width: 100%;
}
</style>
