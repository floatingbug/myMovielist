<script setup>
const props = defineProps({
	movie: Object
});
</script>


<template>    
	<div class="card-container">
		<div class="top">
			<div class="name">
				{{movie.title}}
			</div>
		</div>

		<div class="mid">
			<div class="cover">
				<img :src="movie.cover" alt="">
			</div>
		</div>

		<div class="bottom">
			<div class="description">
				{{movie.description}}
			</div>
		</div>
	</div>
</template>   


<style scoped>
.card-container {
	width: 90%;
	max-width: 350px;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
	padding: 1rem;
	border-radius: var(--border-radius-soft);
	background-color: var(--card-bg);
}

.mid {
	width: 80%;

	img {
		width: 100%;
	}
}

.bottom {
	.description {
		max-height: 100px;
		overflow: auto;
	}
}
</style>
