<script setup>
import {ref} from "vue";
import Rating from 'primevue/rating';


const props = defineProps({
	rating: Object,
});


</script>


<template>    
	<div class="rating">
		<div class="rating__stars">
			<Rating 
				v-model="rating.value"
				readonly
			/>

			<div class="rating__meta-info">
				<div>created by: {{rating.rater}},</div>
				<div>on: {{rating.dateString}}</div>
			</div>
		</div>

		<div class="rating__title">
			{{rating.title}}
		</div>

		<div class="rating__comment">
			{{rating.comment}}
		</div>

		<Divider></Divider>
	</div>
</template>   


<style scoped>
.rating {
}

.rating__stars :deep(.p-rating-on-icon) {
	color: var(--contrast-color);
}

.rating__meta-info {
	margin-top: 0.4rem;

	:last-child {
		margin-top: 0.2rem;
	}
}

.rating__title {
	font-size: 1.2rem;
	font-weight: 800;

	margin-top: 1rem;
}

.rating__comment {
	margin-top: 0.5rem;
}
</style>
