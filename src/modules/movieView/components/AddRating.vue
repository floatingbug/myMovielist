<script setup>
import {ref, reactive} from "vue";
import Rating from 'primevue/rating';


const props = defineProps({
	movieId: Number,
});


const emit = defineEmits(["addRating:action"]);


const ratingValues = reactive({
	rating: 0,
	title: "",
	comment: "",
});


function emitRatingValues(){
	emit("addRating:action", {
		action: "newRating",
		data: {
			newRating: ratingValues,
			movieId: props.movieId,
		},
	});
}

</script>


<template>    
	<div class="add-rating-content">
		<h2>Rate this movie</h2>

		<Rating v-model="ratingValues.rating" />

		<InputGroup>
			<InputGroupAddon>
				<i class="pi pi-star-fill"></i>
			</InputGroupAddon>

			<FloatLabel>
				<InputText v-model="ratingValues.title"></InputText>
				<label for="comment-title">Title</label>
			</FloatLabel>
		</InputGroup>

		<Textarea v-model="ratingValues.comment"></Textarea>

		<div class="add-rating-button-container">
			<Button
				@click="emitRatingValues"
			>
				Add rating
			</Button>
		</div>
	</div>
</template>   


<style scoped>
.add-rating-content {
	display: flex;
	flex-direction: column;
	gap: 1rem;

	.p-inputgroup {
		margin-top: 2rem;
	}

	.p-textarea {
		width: 100%;
		min-height: 200px;
	}

	.add-rating-button-container {
		display: flex;
		justify-content: flex-end;
		margin-top: 2rem;
	}
}
</style>
