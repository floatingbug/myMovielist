<script setup>
import {reactive, toRaw} from "vue";
import Rating from "primevue/rating"


const emit = defineEmits(["createRating:action"]);


const userRating = reactive({
	rating: 1,
	title: "",
	comment: "",
});


function emitRating(){
	emit("createRating:action", {
		action: "newRating",
		newRating: toRaw(userRating),
	});
}

</script>


<template>    
	<div class="create-rating">
		<Rating
			v-model="userRating.rating"
		/>

		<InputGroup>
			<InputGroupAddon>
				<i class="pi pi-pencil" />
			</InputGroupAddon>

			<FloatLabel variant="on">
				<InputText v-model="userRating.title" />
				<label for="comment-title">Title</label>
			</FloatLabel>
		</InputGroup>

		<Textarea v-model="userRating.comment" />

		<Button
			@click="emitRating"
		>
			Add Raring
		</Button>
	</div>
</template>   


<style scoped>
.create-rating {
	display: flex;
	flex-direction: column;
	gap: 1rem;
}

.p-textarea {
	min-height: 300px;
}
</style>
