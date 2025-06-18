<script setup>
import {ref, watch, onMounted} from "vue";
import Rating from "primevue/rating";


const summarizedRating = ref();


const props = defineProps({
	ratings: Array,
});


onMounted(() => {
	if(props.ratings && props.ratings.length > 0){
		const sum = props.ratings.reduce((acc, rating) => {
			return acc + rating.value;
		}, 0);

		summarizedRating.value = sum / props.ratings.length;
	}
});


watch(() => props.ratings, () => {
	if(props.ratings && props.ratings.length > 0){
		const sum = props.ratings.reduce((acc, rating) => {
			return acc + rating.value;
		}, 0);

		summarizedRating.value = sum / props.ratings.length;
	}
	else{
		summarizedRating.value = 0;
	}
});

</script>


<template>    
	<div class="rating-summarized" v-if="ratings">
		<Rating
			v-model="summarizedRating"
			readonly
		/>
		<span v-if="ratings.length === 0">No ratings yet.</span>
	</div>
</template>   


<style scoped>
.rating-summarized {
	display: flex;
	flex-direction: column;
	gap: 0.2rem;
}

.rating-summarized :deep(.p-rating-on-icon) {
	color: var(--contrast-color);
}
</style>
