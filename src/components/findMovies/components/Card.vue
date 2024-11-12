<script setup>
</script>


<template>
	<header>
		<slot name="header">
			<img :src="`${IMG_URL_PREFIX}${movie.poster_path}`" alt="">
			
			<div class="card-menu">
				<CardMenu></CardMenu>
			</div>
		</slot>
	</header>

	<main>
		<slot name="main">
			<div v-if="movie.customizedData && movie.customizedData.rating" class="rating">
				<CircleRating></CircleRating>
			</div>
		</slot>
	</main>

	<footer>
		<slot "footer">
			<div class="movie-name">
				{{movie.title}}
			</div>
		</slot>
	</footer>
</template>


<style scoped>
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
