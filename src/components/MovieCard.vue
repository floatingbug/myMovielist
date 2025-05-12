<script setup>
const props = defineProps({
	movie: Object,
});

</script>


<template>    
	<div class="movie-card">
		<div class="movie-card-content">
			<div class="movie-poster-container">
				<slot name="movie-poster"></slot>
			</div>
		</div>
	</div>
</template>   


<style scoped>
.movie-card {
	max-width: 400px;
	height: auto;
}
</style>
