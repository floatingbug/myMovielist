<script setup>
import {ref, onMounted} from "vue";
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


</script>


<template>    
	<div class="rating-summarized">
		<Rating
			v-model="summarizedRating"
			readonly
		/>
	</div>
</template>   


<style scoped>
.rating-summarized :deep(.p-rating-on-icon) {
	color: var(--contrast-color);
}
</style>
