<script setup>
const props = defineProps({
	userRating: Object,
	stars: Number
});

</script>


<template>    
	<div class="user-rating-container">
		<div class="top">
			<div class="name">
				{{userRating.creatorName}}
			</div>
			
			<div class="stars">
				<Rating v-model="props.stars" readonly></Rating>
			</div>
		</div>
		
		<div class="comment">
			{{userRating.comment}}
		</div>
		
		<Divider></Divider>
	</div>

</template>   


<style scoped>
.user-rating-container {
	display: flex;
	flex-direction: column;
	gap: 2rem;
}

.top {
	display: flex;
	flex-direction: column;
	gap: 0.4rem;
}

.name {
	font-size: 1.2rem;
}
</style>
