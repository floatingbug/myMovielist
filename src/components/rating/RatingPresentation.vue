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
				v-model="value"
				readonly
			/>

			<div>
				<span>created by: </span>
				<span>on: </span>
			</div>
		</div>

		<div class="rating__comment">
		</div>
	</div>
</template>   


<style scoped>
.rating {
}

.rating__stars {
}

.rating__stars :deep(.p-rating-on-icon) {
	color: var(--contrast-color);
}
</style>
