<script setup>
const props = defineProps({
	ratings: Array
});
</script>


<template>    
	<div class="ratings-container">
		<div class="rating" v-for="(rating, index) in ratings">
			<div class="top">
				<div class="movie-name">
					<span>Movie: </span>
					<span>{{rating.movieName}}</span>
				</div>

				<div class="stars">
					<span>Rating: </span>
					<span>{{rating.rating}}</span>
				</div>
			</div>

			<div class="bottom">
				<span>Comment: </span>
				<span v-if="rating.comment">{{rating.comment}}</span>
				<span v-else>No comment</span>
			</div>
		</div>
	</div>
</template>   


<style scoped>
.ratings-container {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	overflow: auto;
}

.rating {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	padding: 1rem;
	border: 1px solid var(--card-border-color-light);
}

.top {
	display: flex;
	padding: 1rem;
	border: 1px solid var(--border-color);

	.movie-name, .stars {
		:first-child {
			font-size: 1.2rem;
			color: var(--p-primary-color);
		}
	}
}

.top * {
	flex: 1;
}

.bottom {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	padding: 1rem;
	border: 1px solid var(--border-color);

	:first-child {
		font-size: 1.2rem;
		color: var(--p-primary-color);
	}
}
</style>
